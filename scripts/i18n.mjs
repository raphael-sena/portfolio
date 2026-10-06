// Fluxo de tradução pt-BR → en e de (docs/umami.md não se aplica; ver docs/DECISIONS.md "i18n").
//   pnpm i18n:check      falha se alguma tradução ficou defasada em relação ao pt (usado no CI)
//   pnpm i18n:lock       grava src/content/i18n.lock.json a partir do estado atual (depois de traduzir e revisar)
//   pnpm i18n:translate  lista as chaves defasadas com o texto pt e o glossário (a chamada ao tradutor depende do provedor)
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildLock, staleKeys } from './i18n-lib.mjs';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const lockPath = join(raiz, 'src/content/i18n.lock.json');
const { pt } = await import('../src/content/pt/index.ts');
const { en } = await import('../src/content/en/index.ts');
const { de } = await import('../src/content/de/index.ts');
const glossario = JSON.parse(readFileSync(join(raiz, 'src/content/glossary.json'), 'utf8'));

const comando = process.argv[2];

function lerLock() {
  try {
    return JSON.parse(readFileSync(lockPath, 'utf8'));
  } catch {
    return null;
  }
}

if (comando === 'lock') {
  writeFileSync(lockPath, JSON.stringify(buildLock(pt, { en, de }), null, 2) + '\n');
  console.log('src/content/i18n.lock.json atualizado.');
} else if (comando === 'check' || comando === 'translate') {
  const lock = lerLock();
  if (!lock) {
    console.error('src/content/i18n.lock.json não existe. Rode `pnpm i18n:lock`.');
    process.exit(1);
  }
  let total = 0;
  for (const locale of ['en', 'de']) {
    const defasadas = staleKeys(pt, lock, locale);
    total += defasadas.length;
    for (const { chave, texto } of defasadas) {
      console.log(`[${locale}] defasada: ${chave}${comando === 'translate' ? `\n    pt: ${texto}` : ''}`);
    }
  }
  if (total === 0) {
    console.log('i18n: todas as traduções estão em dia com o pt-BR.');
  } else if (comando === 'translate') {
    console.log(
      `\n${total} chave(s) para retraduzir. Glossário: src/content/glossary.json (${glossario.noTranslate.length} nomes que não se traduzem, ${Object.keys(glossario.terms).length} termos).`,
    );
    console.log(
      'Depois de traduzir em src/content/{en,de}/index.ts, rode `pnpm i18n:lock`. O alemão continua com reviewed:false até a revisão do usuário.',
    );
    process.exit(1);
  } else {
    console.error(`\ni18n: ${total} chave(s) defasada(s). Retraduza e rode \`pnpm i18n:lock\`.`);
    process.exit(1);
  }
} else {
  console.error('Uso: node scripts/i18n.mjs check | lock | translate');
  process.exit(2);
}
