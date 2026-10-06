'use client';

import { useId, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { Button } from './Button';

const INITIAL = { rx: -10, ry: 30 } as const;
const STEP = 45;

const FACE = 'absolute backface-hidden';
const STROKE = { stroke: '#111', strokeWidth: 4 } as const;

function Hatch({ id }: { id: string }) {
  return (
    <defs>
      <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="6" stroke="#111" strokeWidth="1.5" />
      </pattern>
    </defs>
  );
}

/** Computador compacto em CSS 3D: seis faces SVG, arrasto, setas do teclado e botões. Substituído pelo .glb quando a licença for confirmada. */
export function MacViewer({ caption = 'Fig. 1 — Computador compacto, em vista giratória. Arraste para examinar.' }) {
  const hatchId = useId();
  const [rot, setRot] = useState<{ rx: number; ry: number }>({ ...INITIAL });
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ x: 0, y: 0, rx: 0, ry: 0 });

  const turn = (delta: number) => setRot((r) => ({ ...r, ry: r.ry + delta }));
  const reset = () => setRot({ ...INITIAL });

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
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
  }
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'ArrowLeft') turn(-STEP);
    else if (e.key === 'ArrowRight') turn(STEP);
    else if (e.key === 'ArrowUp') setRot((r) => ({ ...r, rx: Math.min(80, r.rx + 15) }));
    else if (e.key === 'ArrowDown') setRot((r) => ({ ...r, rx: Math.max(-80, r.rx - 15) }));
    else if (e.key === 'Home') reset();
    else return;
    e.preventDefault();
  }

  const angle = Math.round(((rot.ry % 360) + 360) % 360);

  return (
    <figure
      role="group"
      aria-label="Computador compacto em 3D: arraste, use as setas do teclado ou os botões para girar"
    >
      <div
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        onKeyDown={onKeyDown}
        className={`relative h-[500px] touch-pan-y overflow-hidden border-[3px] border-ink select-none ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ boxShadow: '0 0 0 6px #f5f3ec, 0 0 0 8px #111' }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'repeating-conic-gradient(from 0 at 50% 50%, #111 0 6deg, #f5f3ec 6deg 12deg)' }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 mix-blend-difference"
          style={{ background: 'repeating-radial-gradient(circle, #fff 0 9px, #000 9px 18px)' }}
        />
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-ink bg-paper"
          style={{ boxShadow: '0 0 0 8px #f5f3ec, 0 0 0 11px #111' }}
        />
        <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: 1000 }}>
          <div
            aria-hidden="true"
            className="relative h-60 w-[200px] motion-safe:transition-transform motion-safe:duration-[450ms] motion-safe:ease-in-out"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${rot.rx}deg) rotateY(${rot.ry}deg)`,
              transition: dragging ? 'none' : undefined,
            }}
          >
            {/* Frente */}
            <svg
              className={FACE}
              viewBox="0 0 200 240"
              width="200"
              height="240"
              style={{ transform: 'rotateY(0) translateZ(100px)' }}
            >
              <Hatch id={`${hatchId}-f`} />
              <rect x="2" y="2" width="196" height="236" rx="12" fill="#f2f0e8" {...STROKE} />
              <rect x="170" y="10" width="22" height="220" fill={`url(#${hatchId}-f)`} opacity=".5" />
              <rect x="28" y="28" width="132" height="108" rx="14" fill="#f5f3ec" {...STROKE} />
              <rect x="64" y="58" width="10" height="16" fill="#111" />
              <rect x="114" y="58" width="10" height="16" fill="#111" />
              <path d="M62 98h8v8h8v8h34v-8h8v-8h8" fill="none" {...STROKE} strokeLinejoin="miter" />
              <line x1="28" y1="160" x2="172" y2="160" {...STROKE} strokeWidth="2" />
              <rect x="58" y="184" width="70" height="8" fill="#111" />
              <circle cx="152" cy="188" r="4" fill="#111" />
            </svg>
            {/* Verso */}
            <svg
              className={FACE}
              viewBox="0 0 200 240"
              width="200"
              height="240"
              style={{ transform: 'rotateY(180deg) translateZ(100px)' }}
            >
              <rect x="2" y="2" width="196" height="236" rx="12" fill="#cfccc0" {...STROKE} />
              {[50, 70, 90, 110, 130].map((y) => (
                <line key={y} x1="40" y1={y} x2="160" y2={y} {...STROKE} strokeWidth="3" />
              ))}
              {[60, 100, 140].map((x) => (
                <circle key={x} cx={x} cy="190" r="10" fill="#f5f3ec" {...STROKE} />
              ))}
            </svg>
            {/* Laterais */}
            {[90, -90].map((deg) => (
              <svg
                key={deg}
                className={FACE}
                viewBox="0 0 200 240"
                width="200"
                height="240"
                style={{ transform: `rotateY(${deg}deg) translateZ(100px)` }}
              >
                <rect x="2" y="2" width="196" height="236" rx="12" fill="#d9d6cb" {...STROKE} />
                {[40, 56, 72, 88, 104].map((y) => (
                  <line key={y} x1="50" y1={y} x2="150" y2={y} {...STROKE} strokeWidth="3" />
                ))}
              </svg>
            ))}
            {/* Topo e base */}
            <svg
              className={FACE}
              viewBox="0 0 200 200"
              width="200"
              height="200"
              style={{ top: 20, transform: 'rotateX(90deg) translateZ(120px)' }}
            >
              <rect x="2" y="2" width="196" height="196" rx="12" fill="#e6e3d8" {...STROKE} />
              <rect x="30" y="30" width="140" height="140" rx="8" fill="none" {...STROKE} strokeWidth="2" />
            </svg>
            <svg
              className={FACE}
              viewBox="0 0 200 200"
              width="200"
              height="200"
              style={{ top: 20, transform: 'rotateX(-90deg) translateZ(120px)' }}
            >
              <rect x="2" y="2" width="196" height="196" rx="12" fill="#cfccc0" {...STROKE} />
              {[30, 170].flatMap((x) =>
                [30, 170].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="8" fill="#111" />),
              )}
            </svg>
          </div>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        Rotação horizontal: {angle} graus
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button size="sm" onClick={() => turn(-STEP)}>
          Girar à esquerda
        </Button>
        <Button size="sm" onClick={reset}>
          Reiniciar
        </Button>
        <Button size="sm" onClick={() => turn(STEP)}>
          Girar à direita
        </Button>
      </div>
      <figcaption className="mt-3 text-center text-base italic">{caption}</figcaption>
    </figure>
  );
}
