'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { track } from '@/lib/analytics';
import { registerPageTurn, type TurnVia } from '@/lib/page-turn';
import { resolveSegments } from '@/i18n/routes';

type DocumentWithVT = Document & {
  startViewTransition?: (callback: () => Promise<void> | void) => { finished: Promise<void> };
};

const TIMEOUT_MS = 3000;

function comBarra(path: string): string {
  return path.endsWith('/') ? path : `${path}/`;
}

function pageIdOf(pathname: string) {
  const segments = comBarra(pathname).split('/').filter(Boolean);
  return resolveSegments(segments);
}

/**
 * Virada de página entre TODAS as rotas internas, por View Transitions (progressive enhancement).
 * Sem suporte, com prefers-reduced-motion ou sem JavaScript, a troca é imediata e os links funcionam normalmente.
 * A animação em si (rotateY de 0 a -180deg, 1 s ease-in, origem à esquerda, sombra na dobra) vive em app/globals.css.
 */
export function PageTurnRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const pending = useRef<{ href: string; resolve: () => void } | null>(null);

  // Resolve a transição quando a nova rota foi renderizada.
  useEffect(() => {
    const p = pending.current;
    if (p && comBarra(new URL(p.href, window.location.href).pathname) === comBarra(pathname)) {
      pending.current = null;
      p.resolve();
    }
  }, [pathname]);

  useEffect(() => {
    const go = (href: string, via: TurnVia) => {
      const origem = pageIdOf(window.location.pathname);
      const destino = pageIdOf(new URL(href, window.location.href).pathname);
      if (origem && destino) track('page_turn', { from: origem.id, to: destino.id, via });

      const doc = document as DocumentWithVT;
      const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      // No mobile (abaixo de 768 px) a troca é imediata: sem folha virando, as barras fixas já dão a sensação de página.
      const mobile = window.matchMedia('(max-width: 767px)').matches;
      if (!doc.startViewTransition || reduzido || mobile) {
        router.push(href);
        return;
      }
      const root = document.documentElement;
      root.classList.add('turning');
      const alvo = comBarra(new URL(href, window.location.href).pathname);
      const pronto = new Promise<void>((resolve) => {
        pending.current = { href, resolve };
        window.setTimeout(resolve, TIMEOUT_MS);
        // Enquanto a página está congelada pela transição, os efeitos passivos do React ficam presos (o `useEffect` abaixo
        // só roda no timeout). O Next já atualiza a URL no commit da nova rota: sondá-la resolve em ~1 quadro.
        const sonda = window.setInterval(() => {
          if (comBarra(window.location.pathname) !== alvo) return;
          window.clearInterval(sonda);
          window.setTimeout(() => {
            if (pending.current?.href === href) pending.current = null;
            resolve();
          }, 30);
        }, 8);
        window.setTimeout(() => window.clearInterval(sonda), TIMEOUT_MS);
      });
      const transicao = doc.startViewTransition(() => {
        router.push(href);
        return pronto;
      });
      void transicao.finished.finally(() => root.classList.remove('turning'));
      // Vigia: se a transição travar (navegador com suporte parcial), a navegação nunca fica refém dela.
      window.setTimeout(() => {
        if (pending.current?.href === href) {
          pending.current = null;
          (transicao as { skipTransition?: () => void }).skipTransition?.();
          router.push(href);
        }
      }, TIMEOUT_MS + 1000);
    };

    const unregister = registerPageTurn(go);

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>('a[href]') : null;
      if (!link || (link.target && link.target !== '_self') || link.hasAttribute('download')) return;
      if (link.dataset.noTurn !== undefined) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (/\.[a-z0-9]+$/i.test(url.pathname)) return; // arquivos (PDF etc.) não viram página
      if (comBarra(url.pathname) === comBarra(window.location.pathname)) return; // mesma página ou âncora
      if (!pageIdOf(url.pathname)) return; // rota desconhecida: navegação normal
      e.preventDefault();
      const via: TurnVia = e.detail === 0 ? 'keyboard' : link.dataset.turnVia === 'ear' ? 'ear' : 'menu';
      go(`${url.pathname}${url.search}${url.hash}`, via);
    };
    // Captura: roda antes do handler do next/link, que respeita `defaultPrevented`.
    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      unregister();
    };
  }, [router]);

  return null;
}
