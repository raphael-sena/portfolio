// Gera os ícones do site (favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png) com a capitular "R" em fraktur.
// Roda uma vez (node scripts/gerar-icones.mjs); os arquivos são versionados em public/.
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const fonte = readFileSync(
  join(raiz, 'node_modules/@fontsource/unifrakturmaguntia/files/unifrakturmaguntia-latin-400-normal.woff'),
);

const el = (tamanho) => ({
  type: 'div',
  props: {
    style: {
      display: 'flex',
      width: tamanho,
      height: tamanho,
      background: '#F3EEDF',
      border: `${Math.max(2, Math.round(tamanho * 0.04))}px solid #111111`,
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Unifraktur',
      fontSize: Math.round(tamanho * 0.82),
      lineHeight: 1,
      color: '#111111',
      paddingBottom: Math.round(tamanho * 0.06),
    },
    children: 'R',
  },
});

async function png(tamanho) {
  const svg = await satori(el(tamanho), {
    width: tamanho,
    height: tamanho,
    fonts: [{ name: 'Unifraktur', data: fonte, weight: 400, style: 'normal' }],
  });
  return new Resvg(svg, { fitTo: { mode: 'width', value: tamanho } }).render().asPng();
}

/** ICO com um único PNG embutido (válido desde o Windows Vista e em todos os navegadores). */
function ico(pngBytes, tamanho) {
  const cabecalho = Buffer.alloc(6);
  cabecalho.writeUInt16LE(0, 0);
  cabecalho.writeUInt16LE(1, 2);
  cabecalho.writeUInt16LE(1, 4);
  const entrada = Buffer.alloc(16);
  entrada.writeUInt8(tamanho >= 256 ? 0 : tamanho, 0);
  entrada.writeUInt8(tamanho >= 256 ? 0 : tamanho, 1);
  entrada.writeUInt16LE(1, 4);
  entrada.writeUInt16LE(32, 6);
  entrada.writeUInt32LE(pngBytes.length, 8);
  entrada.writeUInt32LE(22, 12);
  return Buffer.concat([cabecalho, entrada, pngBytes]);
}

const saidas = {
  'apple-touch-icon.png': await png(180),
  'icon-192.png': await png(192),
  'icon-512.png': await png(512),
};
const p48 = await png(48);
writeFileSync(join(raiz, 'public/favicon.ico'), ico(p48, 48));
for (const [nome, bytes] of Object.entries(saidas)) writeFileSync(join(raiz, 'public', nome), bytes);

writeFileSync(
  join(raiz, 'public/site.webmanifest'),
  JSON.stringify(
    {
      name: 'Raphael Sena',
      short_name: 'Raphael Sena',
      description: 'Gazeta de um desenvolvedor de software',
      lang: 'pt-BR',
      start_url: '/',
      display: 'browser',
      background_color: '#161616',
      theme_color: '#161616',
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2,
  ) + '\n',
);
console.log('favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png e site.webmanifest gerados em public/');
