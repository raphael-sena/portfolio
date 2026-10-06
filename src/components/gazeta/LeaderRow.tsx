import type { ReactNode } from 'react';

/** "CIDADE ................ Belo Horizonte, MG": rótulo, pontilhado e valor. */
export function LeaderRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex min-h-11 items-baseline gap-2">
      <span className="font-label text-[1.375rem] tracking-widest whitespace-nowrap uppercase">{label}</span>
      <span aria-hidden="true" className="min-w-4 flex-[1_1_16px] border-b-2 border-dotted border-ink" />
      <span className="text-right">{children}</span>
    </div>
  );
}
