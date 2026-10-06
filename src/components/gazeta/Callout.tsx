import type { ReactNode } from 'react';

/** Caixa de anúncio: filete de 1px com contorno afastado, título em Pathway e subtítulo itálico. */
export function Callout({ title, label, children }: { title: string; label?: string; children?: ReactNode }) {
  return (
    <aside aria-label={label} className="frame-outline border-[5px] border-double border-ink px-4 py-3.5 text-center">
      <p className="font-label text-[1.875rem] leading-[1.1] tracking-widest uppercase">{title}</p>
      <svg viewBox="0 0 120 12" aria-hidden="true" focusable="false" className="mx-auto my-1.5 block w-[96px]">
        <line x1="0" y1="6" x2="48" y2="6" stroke="#111" strokeWidth="1.25" />
        <line x1="72" y1="6" x2="120" y2="6" stroke="#111" strokeWidth="1.25" />
        <polygon points="60,1 66,6 60,11 54,6" fill="#111" />
      </svg>
      {children && <div className="text-[1.0625rem] italic">{children}</div>}
    </aside>
  );
}
