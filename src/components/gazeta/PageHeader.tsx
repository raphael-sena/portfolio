interface PageHeaderProps {
  /** "{Seção} · Página N" */
  kicker: string;
  title: string;
  lead?: string;
}

export function PageHeader({ kicker, title, lead }: PageHeaderProps) {
  return (
    <div className="text-center max-md:pt-5 max-md:text-left">
      <p className="font-label text-xl tracking-[0.22em] uppercase max-md:mb-1.5 max-md:text-[1.0625rem] max-md:tracking-[0.2em]">
        {kicker}
      </p>
      <h1 className="font-headline text-[clamp(2.125rem,5vw,3.75rem)] leading-[1.1] font-extrabold max-md:text-[1.875rem]">
        {title}
      </h1>
      {lead && (
        <p className="mx-auto mt-2 max-w-[60ch] text-xl italic max-md:mx-0 max-md:text-[1.0625rem] max-md:leading-[1.4]">
          {lead}
        </p>
      )}
      <hr className="mt-6 border-0 border-t-4 border-double border-ink max-md:mt-4" />
    </div>
  );
}
