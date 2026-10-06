interface PageEarCurlProps {
  /** Lado do canto virado em px (44 em repouso; a orelha cresce até 700 ao arrastar e 1800 ao concluir). */
  size?: number;
  /** Nome da próxima seção e número da página, impressos no verso. */
  nextLabel: string;
  nextPage: number;
  /** Pulso discreto no repouso. */
  pulse?: boolean;
}

/** Parte visual da orelha (canto virado). A interação (arrastar, clicar, Enter) entra no G4. */
export function PageEarCurl({ size = 44, nextLabel, nextPage, pulse = false }: PageEarCurlProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[6] overflow-hidden">
      <div
        className={`absolute right-0 bottom-0 origin-bottom-right ${pulse ? 'animate-ear-hint' : ''}`}
        style={{ width: size, height: size }}
      >
        <div className="absolute inset-0 bg-ear-back" style={{ clipPath: 'polygon(100% 100%, 0 100%, 100% 0)' }}>
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, transparent 50%, rgb(0 0 0 / 0.38) 50%, rgb(0 0 0 / 0) 78%)',
            }}
          />
          {size >= 200 && (
            <div className="absolute right-[22px] bottom-3.5 text-right">
              <p className="font-label text-[22px] tracking-[0.2em] uppercase">Página {nextPage}</p>
              <p className="font-headline text-[32px] leading-[1.1] font-extrabold">{nextLabel}</p>
            </div>
          )}
        </div>
        <div className="absolute inset-0" style={{ filter: 'drop-shadow(-3px -3px 5px rgb(0 0 0 / 0.35))' }}>
          <div
            className="absolute inset-0"
            style={{
              clipPath: 'polygon(0 100%, 100% 0, 0 0)',
              background: 'linear-gradient(315deg, #a9a597 50%, #e7e4d8 72%, #f5f3ec 100%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
