// Gera public/textures/paper-grain.webp (256x256, repetível) a partir do filtro feTurbulence do protótipo.
// Roda uma vez (pnpm texture); o resultado é versionado. Usa o Chromium do Playwright para rasterizar e codificar em WebP.
import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const TAMANHO = 256;

// Mesmos parâmetros do protótipo (GuiaGazeta/Gazeta): fractalNoise 0.85, 2 oitavas, seed 4, stitchTiles; alfa = 1.6*R - 0.72.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${TAMANHO}" height="${TAMANHO}">
  <filter id="g" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="4" stitchTiles="stitch"/>
    <feColorMatrix values="0 0 0 0 0.12  0 0 0 0 0.12  0 0 0 0 0.12  1.6 0 0 0 -0.72"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#g)"/>
</svg>`;

const navegador = await chromium.launch();
const pagina = await navegador.newPage();
const dataUrl = await pagina.evaluate(
  async ({ svg, tamanho }) => {
    const img = new Image();
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    await img.decode();
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = tamanho;
    canvas.getContext('2d').drawImage(img, 0, 0);
    return canvas.toDataURL('image/webp', 0.8);
  },
  { svg, tamanho: TAMANHO },
);
await navegador.close();

const buffer = Buffer.from(dataUrl.split(',')[1], 'base64');
mkdirSync(join(raiz, 'public/textures'), { recursive: true });
writeFileSync(join(raiz, 'public/textures/paper-grain.webp'), buffer);
console.log(`public/textures/paper-grain.webp: ${buffer.length} bytes`);
