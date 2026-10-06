// Copia archive/<ano>/ (versões antigas já construídas por scripts/build-archives.ts) para out/<ano>/, depois do `next build`.
// O CI não reconstrói versões antigas: só copia o que está versionado em archive/. Só entram as entradas com `archived: true`.
import { cpSync, existsSync, readFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

export function anosArquivados() {
  const entradas = JSON.parse(readFileSync(join(raiz, 'src/content/data/archives.json'), 'utf8'));
  return entradas.filter((e) => e.archived).map((e) => e.year);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const copiados = [];
  for (const ano of anosArquivados()) {
    const origem = join(raiz, 'archive', String(ano));
    if (!existsSync(join(origem, 'index.html'))) {
      throw new Error(
        `archive/${ano}/index.html não existe: rode \`pnpm archive:build\` e faça o commit de archive/${ano}/`,
      );
    }
    const destino = join(raiz, 'out', String(ano));
    cpSync(origem, destino, { recursive: true });
    rmSync(join(destino, '.source'), { force: true });
    copiados.push(ano);
  }
  console.log(
    `archive: ${copiados.length ? copiados.map((a) => `/${a}/`).join(', ') : 'nenhuma versão'} copiada(s) para out/`,
  );
}
