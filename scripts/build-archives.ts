// Constrói as versões antigas do portfólio (tags `site/<ANO>`) como sites estáticos em archive/<ano>/, que o build copia
// para os assets em /<ano>/. O CI NÃO reconstrói versões antigas: só copia o que está em archive/.
//
//   pnpm archive:build              constrói só o que falta (ou cujo SHA da tag mudou)
//   pnpm archive:rebuild <ano>      reconstrói uma versão (ou `all`)
//
// Para cada entrada de src/content/data/archives.json: git worktree da tag em .worktrees/<ano>, Node da época
// (instalado em .cache/node-<major>), patch archive/patches/<ano>.patch (export estático, basePath e remoção dos
// scripts de analytics antigos), `npm ci --ignore-scripts` (cai para `npm install` se o lock estiver fora de sincronia),
// `next build`, cópia de `out/` para archive/<ano>/ e `archive/<ano>/.source` com o SHA e as versões usadas.
// Roda com Node 24 (remoção de tipos nativa): `node scripts/build-archives.ts`.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

interface Entrada {
  year: number;
  tag: string;
  sha: string;
  node: string;
  build: 'next-export' | 'static-html';
  basePath: string;
  archived: boolean;
}

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const arquivosJson = join(raiz, 'src/content/data/archives.json');
const entradas: Entrada[] = JSON.parse(readFileSync(arquivosJson, 'utf8'));

/** Imagens maiores que isto e sem nenhuma referência pelo nome do arquivo no site construído são podadas. */
const PODA_ACIMA_DE = 400 * 1024;
const EXTENSOES_TEXTO = /\.(html|js|css|txt|json)$/i;

function sh(comando: string, args: string[], opcoes: { cwd?: string; env?: NodeJS.ProcessEnv } = {}): string {
  return execFileSync(comando, args, {
    cwd: opcoes.cwd ?? raiz,
    env: { ...process.env, ...opcoes.env },
    stdio: ['ignore', 'pipe', 'inherit'],
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  }).trim();
}

function* arquivos(pasta: string): Generator<string> {
  for (const nome of readdirSync(pasta)) {
    const caminho = join(pasta, nome);
    if (statSync(caminho).isDirectory()) yield* arquivos(caminho);
    else yield caminho;
  }
}

/** Node da época em .cache/node-<major> (pacote npm `node`), sem tocar no Node do sistema. */
function garantirNode(major: string): string {
  const bin = join(raiz, '.cache', `node-${major}`, 'node_modules', '.bin');
  if (!existsSync(join(bin, 'node'))) {
    console.log(`  instalando Node ${major} em .cache/node-${major} ...`);
    mkdirSync(join(raiz, '.cache'), { recursive: true });
    sh('npm', [
      'install',
      '--prefix',
      join(raiz, '.cache', `node-${major}`),
      `node@${major}`,
      '--no-audit',
      '--no-fund',
    ]);
  }
  return bin;
}

function precisaConstruir(e: Entrada, rebuild: Set<number> | 'all'): boolean {
  if (rebuild === 'all' || rebuild.has(e.year)) return true;
  const fonte = join(raiz, 'archive', String(e.year), '.source');
  if (!existsSync(fonte)) return true;
  return !readFileSync(fonte, 'utf8').includes(`sha=${e.sha}`);
}

/** Caminhos absolutos do site antigo (`/images/...`, `/Resume.pdf`) passam a viver sob o basePath. */
function reescreverCaminhos(saida: string, basePath: string): number {
  const topo = readdirSync(saida).filter((n) => !['_next', 'index.html', '404.html', 'index.txt'].includes(n));
  const alternativas = topo.flatMap((nome) => {
    const eDiretorio = statSync(join(saida, nome)).isDirectory();
    const formas = new Set([nome, encodeURI(nome)]);
    return [...formas].map((f) => (eDiretorio ? `${escapar(f)}(?=/)` : escapar(f)));
  });
  const regex = new RegExp(`(["'\`(=])/(${alternativas.join('|')})`, 'g');
  let total = 0;
  for (const arquivo of arquivos(saida)) {
    if (!EXTENSOES_TEXTO.test(arquivo)) continue;
    const original = readFileSync(arquivo, 'utf8');
    const novo = original.replace(regex, (_, antes: string, nome: string) => {
      total++;
      return `${antes}${basePath}/${nome}`;
    });
    if (novo !== original) writeFileSync(arquivo, novo);
  }
  return total;
}

function escapar(texto: string): string {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Remove imagens grandes que nenhuma página referencia (ex.: fotos antigas esquecidas em public/). */
function podar(saida: string): string[] {
  const textos = [...arquivos(saida)]
    .filter((a) => EXTENSOES_TEXTO.test(a))
    .map((a) => readFileSync(a, 'utf8'))
    .join('\n');
  const removidos: string[] = [];
  for (const arquivo of arquivos(saida)) {
    if (EXTENSOES_TEXTO.test(arquivo) || arquivo.includes(`${'/'}_next${'/'}`)) continue;
    if (statSync(arquivo).size < PODA_ACIMA_DE) continue;
    const nome = arquivo.split('/').pop() as string;
    if (!textos.includes(nome) && !textos.includes(encodeURI(nome))) {
      rmSync(arquivo);
      removidos.push(relative(saida, arquivo));
    }
  }
  return removidos;
}

/** noindex (meta + cabeçalho vem do build) e o link de volta para a edição atual, criado depois da hidratação. */
function marcarComoArquivo(saida: string, ano: number): void {
  const caminho = join(saida, 'index.html');
  let html = readFileSync(caminho, 'utf8');
  html = html.replace('<head>', '<head><meta name="robots" content="noindex, nofollow"/>');
  const script = `<script>(function(){var A=${ano};function criar(){if(document.getElementById('gazeta-voltar'))return;var b=document.createElement('div');b.id='gazeta-voltar';b.setAttribute('role','navigation');b.setAttribute('aria-label','Edições do site');b.style.cssText='position:fixed;left:0;right:0;bottom:0;z-index:2147483647;background:#111;color:#f5f3ec;font:600 16px/1.4 system-ui,sans-serif;text-align:center;padding:10px 12px';var s=document.createElement('span');s.textContent='Edição de '+A+' \\u00b7 ';var a=document.createElement('a');a.href='/';a.textContent='Voltar à edição atual';a.style.cssText='color:#f5f3ec;text-decoration:underline';b.appendChild(s);b.appendChild(a);document.body.appendChild(b)}function iniciar(){setTimeout(function(){criar();new MutationObserver(criar).observe(document.body,{childList:true})},1500)}if(document.readyState==='complete')iniciar();else window.addEventListener('load',iniciar)})()</script>`;
  html = html.replace('</body>', `${script}</body>`);
  writeFileSync(caminho, html);
}

function construir(e: Entrada): void {
  const ano = String(e.year);
  console.log(`\n== ${e.tag} (${e.sha.slice(0, 7)}), Node ${e.node}`);
  const worktree = join(raiz, '.worktrees', ano);
  const destino = join(raiz, 'archive', ano);

  if (existsSync(worktree)) {
    try {
      sh('git', ['worktree', 'remove', '--force', worktree]);
    } catch {
      rmSync(worktree, { recursive: true, force: true });
    }
  }
  sh('git', ['worktree', 'prune']);
  sh('git', ['worktree', 'add', '--detach', worktree, e.tag]);
  const sha = sh('git', ['rev-parse', 'HEAD'], { cwd: worktree });
  if (sha !== e.sha)
    throw new Error(`A tag ${e.tag} aponta para ${sha}, mas archives.json registra ${e.sha}. Abortando.`);

  const patch = join(raiz, 'archive', 'patches', `${ano}.patch`);
  if (existsSync(patch)) sh('git', ['apply', '--whitespace=nowarn', patch], { cwd: worktree });

  const app = existsSync(join(worktree, 'code', 'package.json')) ? join(worktree, 'code') : worktree;
  const nodeBin = garantirNode(e.node);
  const env = {
    PATH: `${nodeBin}:${process.env.PATH ?? ''}`,
    NEXT_TELEMETRY_DISABLED: '1',
    // O legado trazia um .env versionado: nada dele deve ser embutido no arquivo (Clarity nem existe mais no patch).
    NEXT_PUBLIC_CLARITY_PROJECT_ID: '',
  };
  const versaoNode = sh('node', ['-v'], { cwd: app, env });

  let instalacao = 'npm ci';
  try {
    sh('npm', ['ci', '--ignore-scripts', '--no-audit', '--no-fund'], { cwd: app, env });
  } catch {
    console.log('  npm ci falhou (lockfile fora de sincronia); usando npm install, como a hospedagem da época fazia');
    instalacao = 'npm install (lockfile fora de sincronia)';
    sh('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund'], { cwd: app, env });
  }
  sh('npx', ['next', 'build'], { cwd: app, env });

  const saida = join(app, 'out');
  if (!existsSync(join(saida, 'index.html'))) throw new Error(`${e.tag}: next build não gerou out/index.html`);

  const reescritos = reescreverCaminhos(saida, e.basePath);
  const podados = podar(saida);
  marcarComoArquivo(saida, e.year);

  rmSync(destino, { recursive: true, force: true });
  mkdirSync(dirname(destino), { recursive: true });
  cpSync(saida, destino, { recursive: true });
  // 404.html do app antigo não é usado (o 404 é o do site atual) e confundiria o crawl.
  rmSync(join(destino, '404.html'), { force: true });

  const hashPatch = existsSync(patch)
    ? createHash('sha256').update(readFileSync(patch)).digest('hex').slice(0, 12)
    : 'nenhum';
  writeFileSync(
    join(destino, '.source'),
    [
      `tag=${e.tag}`,
      `sha=${e.sha}`,
      `node=${versaoNode}`,
      `instalacao=${instalacao}`,
      `patch=${hashPatch}`,
      `caminhos_reescritos=${reescritos}`,
      `podados=${podados.join(',') || 'nenhum'}`,
      '',
    ].join('\n'),
  );

  sh('git', ['worktree', 'remove', '--force', worktree]);
  console.log(`  ok: archive/${ano}/ (${reescritos} caminhos reescritos; podados: ${podados.join(', ') || 'nenhum'})`);
}

function main(): void {
  const args = process.argv.slice(2);
  const rebuild: Set<number> | 'all' = args.includes('--rebuild')
    ? (() => {
        const alvo = args[args.indexOf('--rebuild') + 1];
        return !alvo || alvo === 'all' ? 'all' : new Set([Number(alvo)]);
      })()
    : new Set<number>();

  const pendentes = entradas.filter((e) => precisaConstruir(e, rebuild));
  if (pendentes.length === 0) {
    console.log('archive/: nada a construir (todas as versões estão em dia com archives.json).');
    return;
  }
  for (const e of pendentes) construir(e);
  console.log(
    '\nLembrete: marque `"archived": true` em archives.json das versões construídas e faça o commit de archive/.',
  );
}

main();
