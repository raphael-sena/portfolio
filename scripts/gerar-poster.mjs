// Gera public/models/apple-ii-poster.webp: o próprio modelo renderizado (ângulo inicial), colorido, com fundo transparente.
// Uso: node scripts/gerar-poster.mjs [URL_BASE]   (com o build servido por `pnpm preview`, porta 8787)
import { chromium } from '@playwright/test';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const base = process.argv[2] ?? 'http://127.0.0.1:8787';

const navegador = await chromium.launch({
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const contexto = await navegador.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
const pagina = await contexto.newPage();
pagina.on('console', (m) => m.type() === 'error' && console.error('console:', m.text()));
await pagina.goto(`${base}/design-system/`, { waitUntil: 'networkidle' });
const quadro = pagina.locator('[data-renderer]').first();
await quadro.scrollIntoViewIfNeeded();
await pagina.waitForSelector('[data-renderer="3d"]', { timeout: 60_000 });
await pagina.waitForTimeout(1500);

const resultado = await pagina.evaluate(async () => {
  const canvas = document.querySelector('[data-testid="mac-3d"] canvas');
  if (!(canvas instanceof HTMLCanvasElement)) throw new Error('canvas do viewer não encontrado');
  const saida = document.createElement('canvas');
  saida.width = canvas.width;
  saida.height = canvas.height;
  const ctx = saida.getContext('2d');
  ctx.drawImage(canvas, 0, 0);
  return { url: saida.toDataURL('image/webp', 0.85), width: saida.width, height: saida.height };
});
await navegador.close();

const buffer = Buffer.from(resultado.url.split(',')[1], 'base64');
writeFileSync(join(raiz, 'public/models/apple-ii-poster.webp'), buffer);
console.log(`public/models/apple-ii-poster.webp: ${resultado.width}x${resultado.height}, ${buffer.length} bytes`);
