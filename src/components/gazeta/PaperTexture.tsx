/**
 * Grão do papel e vinheta, em SVG inline (feTurbulence com os parâmetros do protótipo, repetido em um <pattern> de 300px).
 * Decorativo: fica por cima da folha, sem capturar cliques. Sem requisição de rede, e como são formas SVG (não imagem
 * nem background-image) o navegador não as considera candidatas a LCP: um WebP de 50 KB, e depois um SVG em data URI,
 * eram escolhidos como o maior elemento da página e atrasavam a métrica.
 * Os `id` são fixos porque há uma única PaperTexture por página.
 */
export function PaperTexture() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute inset-0 z-[3] h-full w-full mix-blend-multiply"
    >
      <defs>
        <filter id="paper-grain-filter" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="4" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 .12  0 0 0 0 .12  0 0 0 0 .12  1.6 0 0 0 -.72" />
        </filter>
        <pattern id="paper-grain-tile" width="300" height="300" patternUnits="userSpaceOnUse">
          <rect width="300" height="300" filter="url(#paper-grain-filter)" />
        </pattern>
        <radialGradient id="paper-vignette" cx="50%" cy="50%" r="75%">
          <stop offset="60%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity=".2" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#paper-grain-tile)" opacity=".7" />
      <rect width="100%" height="100%" fill="url(#paper-vignette)" />
    </svg>
  );
}
