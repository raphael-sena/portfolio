'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { PageEarCurl } from '@/components/gazeta';
import { track } from '@/lib/analytics';
import { turnTo } from '@/lib/page-turn';

/** Arraste diagonal somado (dx + dy) a partir do qual soltar completa a virada (BRIEF seção 4). */
export const EAR_COMPLETE_AT = 280;
const REST = 44;
const MAX = 700;
const MOVED_THRESHOLD = 8;

interface PageEarProps {
  href: string;
  ariaLabel: string;
  nextLabel: string;
  nextPage: number;
  pageLabel: string;
  hint: string;
}

/**
 * Orelha de página: um `<a>` real para a próxima página. Arrastar na diagonal (para cima e para a esquerda) descola o
 * canto; soltar com dx+dy ≥ 280 completa a virada, antes disso o canto volta. Clique, toque e Enter também viram a página.
 */
export function PageEar({ href, ariaLabel, nextLabel, nextPage, pageLabel, hint }: PageEarProps) {
  const [size, setSize] = useState(REST);
  const [dragging, setDragging] = useState(false);
  const link = useRef<HTMLAnchorElement>(null);
  // Marca a hidratação (os testes esperam por isso): o arraste só responde depois dela.
  useEffect(() => {
    link.current?.setAttribute('data-ready', 'true');
  }, []);
  const start = useRef<{ x: number; y: number; moved: boolean; v: number } | null>(null);

  const soma = (e: PointerEvent<HTMLAnchorElement>) =>
    start.current ? Math.max(0, start.current.x - e.clientX + (start.current.y - e.clientY)) : 0;

  function onPointerDown(e: PointerEvent<HTMLAnchorElement>) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY, moved: false, v: 0 };
    setDragging(true);
  }

  function onPointerMove(e: PointerEvent<HTMLAnchorElement>) {
    if (!start.current) return;
    const v = soma(e);
    start.current.v = v;
    if (v > MOVED_THRESHOLD) start.current.moved = true;
    setSize(Math.min(MAX, REST + v * 0.9));
  }

  function finish(e: PointerEvent<HTMLAnchorElement>) {
    const atual = start.current;
    if (!atual) return;
    const v = soma(e);
    start.current = null;
    setDragging(false);
    if (!atual.moved) {
      setSize(REST);
      return; // clique ou toque simples: o link e o PageTurnRouter cuidam
    }
    const completed = v >= EAR_COMPLETE_AT;
    track('ear_pull', { completed });
    // Depois de um arraste o navegador ainda dispara um `click`: ele não pode virar a página (nem pelo link, nem pelo
    // PageTurnRouter, que escuta na captura do document). A captura da window roda antes de ambos.
    const engolir = (ev: MouseEvent) => {
      ev.preventDefault();
      ev.stopPropagation();
    };
    window.addEventListener('click', engolir, { capture: true, once: true });
    window.setTimeout(() => window.removeEventListener('click', engolir, { capture: true }), 150);
    if (completed) {
      setSize(MAX);
      turnTo(href, 'ear');
      window.setTimeout(() => setSize(REST), 1200);
    } else {
      setSize(REST);
    }
  }

  return (
    <>
      <PageEarCurl
        size={size}
        nextLabel={nextLabel}
        nextPage={nextPage}
        pageLabel={pageLabel}
        pulse={size === REST && !dragging}
        dragging={dragging}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[72px] bottom-4 z-[3] hidden font-label text-xl tracking-[0.16em] uppercase sm:block"
      >
        {hint}
      </span>
      <Link
        href={href}
        aria-label={ariaLabel}
        data-turn-via="ear"
        ref={link}
        data-ready="false"
        data-ear-size={Math.round(size)}
        draggable={false}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finish}
        onPointerCancel={() => {
          start.current = null;
          setDragging(false);
          setSize(REST);
        }}
        className="absolute right-0 bottom-0 z-[7] block h-24 w-24 cursor-grab touch-none select-none focus-visible:outline-3 focus-visible:outline-offset-[-6px] active:cursor-grabbing max-sm:fixed max-sm:h-16 max-sm:w-16"
      />
    </>
  );
}
