'use client';

import { useId } from 'react';

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

/** Fallback do computador: cubo CSS 3D com seis faces SVG (usado se o WebGL ou o .glb falharem). */
export function MacCube({ rx, ry, dragging }: { rx: number; ry: number; dragging: boolean }) {
  const hatchId = useId();
  const rot = { rx, ry };
  return (
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
          {[30, 170].flatMap((x) => [30, 170].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="8" fill="#111" />))}
        </svg>
      </div>
    </div>
  );
}
