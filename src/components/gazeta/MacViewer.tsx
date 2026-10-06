'use client';

import { useEffect, useRef, useState, type ComponentType, type KeyboardEvent, type PointerEvent } from 'react';
import { track } from '@/lib/analytics';
import { Button } from './Button';
import { MacCube } from './MacCube';
import type { MacViewer3DProps } from './MacViewer3D';

const INITIAL = { rx: -10, ry: 30 } as const;
const STEP = 45;
/** Giro automático lento, em graus por segundo (uma volta a cada 45 s); o quadriculado gira ao contrário. */
const SPIN_DEG_PER_S = 8;
const POSTER_URL = '/models/apple-ii-poster.webp';

/** Atribuição CC BY 4.0 do modelo (título, autor, fonte, licença e aviso de modificação). */
export const MODEL_CREDIT = {
  title: 'Apple II Computer',
  author: 'dark_igorek',
  authorUrl: 'https://sketchfab.com/dark_igorek',
  sourceUrl: 'https://sketchfab.com/3d-models/apple-ii-computer-b5d316548d634f16a72dd503db0aa01b',
  licenseName: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
} as const;

export interface MacViewerLabels {
  aria: string;
  caption: string;
  /** Legenda do mobile, onde o modelo é só o poster. */
  captionStatic?: string;
  left: string;
  reset: string;
  right: string;
  /** Texto com `{angle}`, lido por leitores de tela ao girar. */
  angle: string;
  posterAlt: string;
  credit: { model: string; by: string; modified: string };
}

const DEFAULT_LABELS: MacViewerLabels = {
  aria: 'Computador compacto em 3D: arraste, use as setas do teclado ou os botões para girar',
  caption: 'Fig. 1 — Computador compacto, em vista giratória. Arraste para examinar.',
  left: 'Girar à esquerda',
  reset: 'Reiniciar',
  right: 'Girar à direita',
  angle: 'Rotação horizontal: {angle} graus',
  posterAlt: 'Computador compacto: um Apple II com monitor, teclado e unidade de disco.',
  credit: { model: 'Modelo 3D', by: 'de', modified: 'Modificado: texturas e malha comprimidas para a web.' },
};

type Phase = 'poster' | 'loading' | '3d' | 'cube';

function webglDisponivel(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Computador compacto. Mostra o poster; só quando o viewer entra na tela carrega o three.js e o .glb (chunk separado).
 * Se o WebGL ou o modelo falharem, cai para o cubo CSS 3D. O computador gira sozinho, devagar, e o quadriculado de fundo
 * gira no sentido oposto (em celular e desktop; sem giro com prefers-reduced-motion). Arrasto (só mouse), setas do
 * teclado e botões somam ao giro automático nos dois modos.
 */
export function MacViewer({ labels = DEFAULT_LABELS }: { labels?: MacViewerLabels }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ x: 0, y: 0, rx: 0, ry: 0 });
  const [rot, setRot] = useState<{ rx: number; ry: number }>({ ...INITIAL });
  const [dragging, setDragging] = useState(false);
  const [phase, setPhase] = useState<Phase>('poster');
  const [Viewer3D, setViewer3D] = useState<ComponentType<MacViewer3DProps> | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [spin, setSpin] = useState(0);
  const draggingRef = useRef(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    draggingRef.current = dragging;
  }, [dragging]);

  // Giro automático: soma graus por tempo decorrido; pausa arrastando, fora da tela ou com a aba escondida.
  const pronto = phase === '3d' || phase === 'cube';
  useEffect(() => {
    if (reducedMotion || !pronto) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      // Tempo real decorrido: em aparelho lento (poucos quadros por segundo) o giro mantém a mesma velocidade. O limite de
      // 1 s só evita um salto grande ao voltar de uma aba escondida.
      const dt = Math.min(now - last, 1000);
      last = now;
      if (!draggingRef.current && visibleRef.current && document.visibilityState === 'visible') {
        setSpin((angulo) => angulo + (dt / 1000) * SPIN_DEG_PER_S);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion, pronto]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || !('IntersectionObserver' in window)) {
      visibleRef.current = true;
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      visibleRef.current = entries.some((e) => e.isIntersecting);
    });
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let started = false;
    const iniciar = () => {
      if (started) return;
      started = true;
      const economia = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
      if (economia || !webglDisponivel()) {
        setPhase('cube');
        return;
      }
      setPhase('loading');
      import('./MacViewer3D').then((m) => setViewer3D(() => m.default)).catch(() => setPhase('cube'));
    };
    // No celular o 3D espera a página carregar e então a primeira interação (ou 5 s), com o navegador ocioso: assim não
    // disputa com o LCP nem com a primeira interação.
    const noCelular = window.matchMedia('(max-width: 767px)').matches;
    const comecar = () => {
      if (!noCelular) return iniciar();
      const eventos = ['pointerdown', 'touchstart', 'scroll', 'keydown'] as const;
      let timer = 0;
      const disparar = () => {
        window.clearTimeout(timer);
        for (const e of eventos) window.removeEventListener(e, disparar);
        if ('requestIdleCallback' in window) window.requestIdleCallback(iniciar, { timeout: 2500 });
        else setTimeout(iniciar, 500);
      };
      const armar = () => {
        for (const e of eventos) window.addEventListener(e, disparar, { once: true, passive: true });
        timer = window.setTimeout(disparar, 5000);
      };
      if (document.readyState === 'complete') armar();
      else window.addEventListener('load', armar, { once: true });
    };
    if (!('IntersectionObserver' in window)) {
      comecar();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          comecar();
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  const girou = () => track('mac_rotate');
  const turn = (delta: number) => {
    setRot((r) => ({ ...r, ry: r.ry + delta }));
    girou();
  };
  const reset = () => setRot({ ...INITIAL });

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === 'touch') return; // no toque o dedo rola a página; só o mouse arrasta
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, rx: rot.rx, ry: rot.ry };
    setDragging(true);
  }
  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    const { x, y, rx, ry } = drag.current;
    setRot({
      ry: ry + (e.clientX - x) * 0.6,
      rx: Math.max(-80, Math.min(80, rx - (e.clientY - y) * 0.6)),
    });
    girou();
  }
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'ArrowLeft') turn(-STEP);
    else if (e.key === 'ArrowRight') turn(STEP);
    else if (e.key === 'ArrowUp') {
      setRot((r) => ({ ...r, rx: Math.min(80, r.rx + 15) }));
      girou();
    } else if (e.key === 'ArrowDown') {
      setRot((r) => ({ ...r, rx: Math.max(-80, r.rx - 15) }));
      girou();
    } else if (e.key === 'Home') reset();
    else return;
    e.preventDefault();
  }

  const angle = Math.round(((rot.ry % 360) + 360) % 360);
  const autoSpin = !reducedMotion;
  const totalRy = rot.ry + spin;
  const showPoster = phase === 'poster' || phase === 'loading';

  return (
    <figure aria-label={labels.aria}>
      <div
        ref={frameRef}
        tabIndex={0}
        data-renderer={phase}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        onKeyDown={onKeyDown}
        className={`relative h-[500px] touch-pan-y overflow-hidden border-[3px] border-ink select-none max-md:h-[340px] ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ boxShadow: '0 0 0 6px #f3eedf, 0 0 0 8px #111' }}
      >
        {/* Raios do quadriculado: giram em torno do centro junto com o computador (o cruzamento com os anéis, fixos, faz o
            quadriculado "andar em círculo"). Maior que o quadro para que os cantos não apareçam ao girar. */}
        <div
          aria-hidden="true"
          data-testid="mac-raios"
          className="absolute -inset-[25%]"
          style={{
            background: 'repeating-conic-gradient(from 0 at 50% 50%, #111 0 6deg, #f3eedf 6deg 12deg)',
            transform: `rotate(${-totalRy}deg)`,
            transition: dragging || reducedMotion || autoSpin ? 'none' : 'transform 450ms ease-out',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 mix-blend-difference"
          style={{ background: 'repeating-radial-gradient(circle, #fff 0 9px, #000 9px 18px)' }}
        />
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-ink bg-paper"
          style={{ boxShadow: '0 0 0 8px #f3eedf, 0 0 0 11px #111' }}
        />
        {phase === 'cube' ? (
          <MacCube rx={rot.rx} ry={totalRy} dragging={dragging || autoSpin} />
        ) : (
          <>
            {Viewer3D && (
              <Viewer3D
                rx={rot.rx}
                ry={totalRy}
                dragging={dragging}
                reducedMotion={reducedMotion}
                onReady={() => setPhase('3d')}
                onError={() => setPhase('cube')}
              />
            )}
            {/* Imagem de espera: some quando o modelo está pronto. Sem JavaScript, é a imagem final. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={POSTER_URL}
              alt={labels.posterAlt}
              width={900}
              height={1000}
              decoding="async"
              loading="eager"
              fetchPriority="high"
              draggable={false}
              className={`pointer-events-none absolute top-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 transition-opacity duration-300 ${showPoster ? 'opacity-100' : 'opacity-0'}`}
            />
          </>
        )}
      </div>
      <p className="sr-only" aria-live="polite">
        {labels.angle.replace('{angle}', String(angle))}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3 max-md:hidden">
        <Button size="sm" onClick={() => turn(-STEP)}>
          {labels.left}
        </Button>
        <Button size="sm" onClick={reset}>
          {labels.reset}
        </Button>
        <Button size="sm" onClick={() => turn(STEP)}>
          {labels.right}
        </Button>
      </div>
      <figcaption className="mt-3 text-center text-base italic max-md:mt-2.5 max-md:text-left max-md:text-sm">
        <span className="max-md:hidden">{labels.caption}</span>
        <span className="md:hidden">{labels.captionStatic ?? labels.caption}</span>
      </figcaption>
      <p className="mt-1 text-center text-base max-md:text-left max-md:text-sm max-md:italic">
        {labels.credit.model}{' '}
        <a href={MODEL_CREDIT.sourceUrl} rel="noopener">
          «{MODEL_CREDIT.title}»
        </a>{' '}
        {labels.credit.by}{' '}
        <a href={MODEL_CREDIT.authorUrl} rel="noopener">
          {MODEL_CREDIT.author}
        </a>
        ,{' '}
        <a href={MODEL_CREDIT.licenseUrl} rel="license noopener">
          {MODEL_CREDIT.licenseName}
        </a>
        . {labels.credit.modified}
      </p>
    </figure>
  );
}
