import type { ReactNode } from 'react';

/** Caixa de anúncio: filete de 1px com contorno afastado, título em Pathway e subtítulo itálico. */
export function Callout({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <aside className="frame-outline border border-ink px-4 py-3.5 text-center">
      <p className="font-label text-[30px] leading-[1.1] tracking-widest uppercase">{title}</p>
      {children && <div className="mt-1 text-[17px] italic">{children}</div>}
    </aside>
  );
}
