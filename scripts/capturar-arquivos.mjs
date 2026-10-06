// Gera as capturas de tela dos cartões da linha do tempo: public/timeline/<ano>.jpg (versões antigas em /<ano>/) e atual.jpg (a home).
// Uso: node scripts/capturar-arquivos.mjs [URL_BASE]   (com o build servido por `pnpm preview`, porta 8787)
// As requisições para fora do site são abortadas, para a captura não depender de APIs de terceiros (GitHub, Chess.com...).
import { chromium } from '@playwright/test';
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const base = (process.argv[2] ?? 'http://127.0.0.1:8787').replace(/\/$/, '');
const entradas = JSON.parse(readFileSync(join(raiz, 'src/content/data/archives.json'), 'utf8'));
const saida = join(raiz, 'public/timeline');
mkdirSync(saida, { recursive: true });

const alvos = [
  ...entradas.filter((e) => e.archived).map((e) => ({ nome: String(e.year), caminho: `/${e.year}/` })),
  { nome: 'atual', caminho: '/' },
];

const navegador = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const contexto = await navegador.newContext({
  viewport: { width: 560, height: 448 },
  deviceScaleFactor: 1,
  reducedMotion: 'reduce',
});
await contexto.route(
  (url) => url.origin !== new URL(base).origin,
  (rota) => rota.abort(),
);

for (const alvo of alvos) {
  const pagina = await contexto.newPage();
  await pagina.goto(`${base}${alvo.caminho}`, { waitUntil: 'load' });
  await pagina.waitForTimeout(7000);
  await pagina.addStyleTag({ content: '#gazeta-voltar{display:none!important}' });
  await pagina.screenshot({ path: join(saida, `${alvo.nome}.jpg`), type: 'jpeg', quality: 62 });
  console.log(`public/timeline/${alvo.nome}.jpg`);
  await pagina.close();
}
await navegador.close();
