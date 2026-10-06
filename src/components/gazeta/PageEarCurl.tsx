/** Lado do quadrado em que a orelha é desenhada; a orelha de verdade é esse bloco reduzido por `transform: scale`. */
const MAX = 700;

interface PageEarCurlProps {
  /** Lado do canto virado em px (44 em repouso; a orelha cresce ao arrastar e ao completar a virada). */
  size?: number;
  /** Nome da próxima seção e número da página, impressos na página de baixo. */
  nextLabel: string;
  nextPage: number;
  /** Pulso discreto no repouso. */
  pulse?: boolean;
  /** Palavra "Página" no idioma atual. */
  pageLabel?: string;
  /** Durante o arraste o canto segue o ponteiro sem transição. */
  dragging?: boolean;
}

/**
 * Parte visual da orelha (canto virado); a interação fica em `PageEar`.
 *
 * - O canto é um bloco fixo de 700 px escalado por `transform`: sem animar `width/height` e sem `filter` (o `drop-shadow`
 *   deixava um rastro retangular no Safari ao soltar a orelha).
 * - A página de baixo usa o MESMO papel do jornal: a orelha fica sob a camada de textura da folha (z-2, abaixo do z-3 da
 *   textura), então recebe o mesmo grão e a mesma vinheta, sem hachuras.
 */
export function PageEarCurl({
  size = 44,
  nextLabel,
  nextPage,
  pulse = false,
  pageLabel = 'Página',
  dragging = false,
}: PageEarCurlProps) {
  const escala = Math.max(size, 1) / MAX;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2] overflow-hidden max-sm:fixed">
      <div
        className="absolute right-0 bottom-0 origin-bottom-right"
        style={{
          width: MAX,
          height: MAX,
          transform: `scale(${escala})`,
          transition: dragging ? 'none' : 'transform .25s ease',
          willChange: 'transform',
        }}
      >
        <div className={`absolute inset-0 origin-bottom-right ${pulse ? 'animate-ear-hint' : ''}`}>
          {/* Página de baixo: papel liso, com a sombra que a dobra projeta sobre ela. */}
          <div className="absolute inset-0 bg-paper" style={{ clipPath: 'polygon(100% 100%, 0 100%, 100% 0)' }}>
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, transparent 50%, rgb(0 0 0 / 0.3) 50%, rgb(0 0 0 / 0) 70%)',
              }}
            />
          </div>
          {/* Canto levantado. */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: 'polygon(0 100%, 100% 0, 0 0)',
              background: 'linear-gradient(315deg, #a9a597 50%, #e7e4d8 72%, #f5f3ec 100%)',
            }}
          />
        </div>
      </div>
      {size >= 160 && (
        <div className="absolute right-[22px] bottom-3.5 text-right">
          <p className="font-label text-[22px] tracking-[0.2em] uppercase">
            {pageLabel} {nextPage}
          </p>
          <p className="font-headline text-[32px] leading-[1.1] font-extrabold">{nextLabel}</p>
        </div>
      )}
    </div>
  );
}
