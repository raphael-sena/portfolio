interface DatelineProps {
  /** Terceiro item: "Preço: um clique" na home; "{Seção} · Página N" nas internas. */
  right: string;
  left?: string;
  center?: string;
}

export function Dateline({ left = 'Belo Horizonte, Minas Gerais', center = 'Edição de 2026', right }: DatelineProps) {
  return (
    <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-b border-ink pb-1.5 font-label text-[1.1875rem] tracking-[0.14em] uppercase">
      <span>{left}</span>
      <span>{center}</span>
      <span>{right}</span>
    </div>
  );
}
