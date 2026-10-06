// Gera imagens lado a lado do protótipo (design/design-gazeta) com a implementação em /design-system.
// Uso: node scripts/comparar-design.mjs [URL_BASE]   (padrão http://127.0.0.1:8787, com o build servido por `pnpm preview`)
import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const base = process.argv[2] ?? 'http://127.0.0.1:8787';
const saida = join(raiz, 'docs/design-system');
mkdirSync(saida, { recursive: true });

const navegador = await chromium.launch();
const contexto = await navegador.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });

async function capturar(url, clip) {
  const pagina = await contexto.newPage();
  await pagina.goto(url, { waitUntil: 'networkidle' });
  await pagina.evaluate(() => document.fonts.ready);
  await pagina.waitForTimeout(800);
  const png = await pagina.screenshot({ fullPage: true, ...(clip ? { clip } : {}) });
  await pagina.close();
  return png;
}

async function lado(nome, esquerda, direita, rotulos) {
  const pagina = await contexto.newPage();
  await pagina.setViewportSize({ width: 1280, height: 200 });
  const img = (b) => `data:image/png;base64,${b.toString('base64')}`;
  await pagina.setContent(`<body style="margin:0;background:#fff;font:20px sans-serif">
    <div style="display:flex;gap:16px;align-items:flex-start;padding:12px">
      <figure style="margin:0;flex:1"><figcaption style="padding:4px 0">${rotulos[0]}</figcaption><img style="width:100%;border:1px solid #999" src="${img(esquerda)}"></figure>
      <figure style="margin:0;flex:1"><figcaption style="padding:4px 0">${rotulos[1]}</figcaption><img style="width:100%;border:1px solid #999" src="${img(direita)}"></figure>
    </div></body>`);
  await pagina.waitForTimeout(300);
  const jpg = await pagina.screenshot({ fullPage: true, type: 'jpeg', quality: 80 });
  writeFileSync(join(saida, `${nome}.jpg`), jpg);
  await pagina.close();
  console.log(`docs/design-system/${nome}.jpg (${jpg.length} bytes)`);
}

const protoUrl = pathToFileURL(join(raiz, 'design/design-gazeta/GuiaGazeta.dc.html')).href;
const implUrl = `${base}/design-system/`;

const proto = await capturar(protoUrl);
const impl = await capturar(implUrl);
await lado('guia-completo', proto, impl, ['Protótipo: GuiaGazeta.dc.html', 'Implementação: /design-system']);

// Recorte do topo (letreiro, datação, menu, título): 1280x440 de cada lado, em tamanho real.
const clip = { x: 0, y: 0, width: 1280, height: 440 };
await lado('guia-topo', await capturar(protoUrl, clip), await capturar(implUrl, clip), [
  'Protótipo (topo)',
  'Implementação (topo)',
]);

await navegador.close();
