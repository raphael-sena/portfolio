import type { ReactNode } from 'react';

/** Caixa de anúncio: filete de 1px com contorno afastado, título em Pathway e subtítulo itálico. */
export function Callout({ title, label, children }: { title: string; label?: string; children?: ReactNode }) {
  return (
    <aside aria-label={label} className="frame-outline border border-ink px-4 py-3.5 text-center">
      <p className="font-label text-[1.875rem] leading-[1.1] tracking-widest uppercase">{title}</p>
      {children && <div className="mt-1 text-[1.0625rem] italic">{children}</div>}
    </aside>
  );
}
