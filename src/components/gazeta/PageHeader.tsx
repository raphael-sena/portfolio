interface PageHeaderProps {
  /** "{Seção} · Página N" */
  kicker: string;
  title: string;
  lead?: string;
}

export function PageHeader({ kicker, title, lead }: PageHeaderProps) {
  return (
    <div className="text-center">
      <p className="font-label text-xl tracking-[0.22em] uppercase">{kicker}</p>
      <h1 className="font-headline text-[clamp(2.125rem,5vw,3.75rem)] leading-[1.1] font-extrabold">{title}</h1>
      {lead && <p className="mx-auto mt-2 max-w-[60ch] text-xl italic">{lead}</p>}
      <hr className="mt-6 border-0 border-t-4 border-double border-ink" />
    </div>
  );
}
