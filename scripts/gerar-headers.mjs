// Gera out/_headers e out/_redirects depois do `next build`.
//  - Em preview/workers.dev (SITE_ENV != production) tudo é noindex; HSTS só em produção.
//  - CSP por página, com os hashes SHA-256 dos scripts inline do Next extraídos do HTML de out/. Começa em Report-Only
//    (CSP_MODE=enforce promove). Cada página é uma regra; cada linha respeita o limite do Cloudflare.
// Limites do Cloudflare para _headers: 100 regras e 2000 caracteres por linha.
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { anosArquivados } from './copiar-arquivos.mjs';
import { fileURLToPath } from 'node:url';

const MAX_REGRAS = 100;
const MAX_LINHA = 2000;

/** Scripts inline executáveis (sem `src` e que não sejam blocos de dados como JSON-LD) e seus hashes SHA-256 em base64. */
export function hashesInline(html) {
  const hashes = new Set();
  for (const m of html.matchAll(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/g)) {
    const atributos = m[1] ?? '';
    if (/\ssrc\s*=/.test(atributos) || /type\s*=\s*["']application\/(ld\+)?json["']/.test(atributos)) continue;
    const corpo = m[2] ?? '';
    if (!corpo.trim()) continue;
    hashes.add(`'sha256-${createHash('sha256').update(corpo).digest('base64')}'`);
  }
  return [...hashes].sort();
}

/** Política de segurança de conteúdo de uma página. `'wasm-unsafe-eval'` é do decodificador meshopt do three.js. */
export function csp(hashes, { enforce = false } = {}) {
  const diretivas = [
    "default-src 'self'",
    `script-src 'self' 'wasm-unsafe-eval' ${hashes.join(' ')}`.trim(),
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self' blob: data:",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    // Destino dos relatórios (Worker, /api/csp-report). Em Report-Only o Safari exige `report-to` (senão registra erro no console).
    'report-uri /api/csp-report',
    'report-to csp',
  ];
  if (enforce) diretivas.push('upgrade-insecure-requests');
  return diretivas.join('; ');
}

export function gerarHeaders({ producao, paginas = [], enforce = false, arquivos = [] }) {
  const seguranca = [
    'X-Content-Type-Options: nosniff',
    'Referrer-Policy: strict-origin-when-cross-origin',
    'Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()',
    'X-Frame-Options: DENY',
    'Cross-Origin-Opener-Policy: same-origin',
  ];
  const regras = [
    {
      padrao: '/*',
      linhas: [
        ...seguranca,
        'Reporting-Endpoints: csp="/api/csp-report"',
        // HSTS só com o domínio de produção anexado (G8): um ano, sem includeSubDomains nem preload.
        ...(producao ? ['Strict-Transport-Security: max-age=31536000'] : ['X-Robots-Tag: noindex, nofollow']),
      ],
    },
    { padrao: '/_next/static/*', linhas: ['Cache-Control: public, max-age=31536000, immutable'] },
    // Modelo 3D, poster e imagens Open Graph não têm hash no nome: cache de um dia.
    { padrao: '/models/*', linhas: ['Cache-Control: public, max-age=86400'] },
    { padrao: '/og/*', linhas: ['Cache-Control: public, max-age=86400'] },
    // Versões antigas em /<ano>/: sempre noindex (e sem CSP: os apps antigos usam scripts inline que não controlamos).
    ...arquivos.flatMap((ano) => [
      { padrao: `/${ano}/*`, linhas: ['X-Robots-Tag: noindex, nofollow'] },
      { padrao: `/${ano}/_next/static/*`, linhas: ['Cache-Control: public, max-age=31536000, immutable'] },
    ]),
    ...paginas.map(({ caminho, hashes }) => ({
      padrao: caminho,
      linhas: [
        `${enforce ? 'Content-Security-Policy' : 'Content-Security-Policy-Report-Only'}: ${csp(hashes, { enforce })}`,
      ],
    })),
  ];
  return regras.map((r) => `${r.padrao}\n${r.linhas.map((l) => `  ${l}`).join('\n')}`).join('\n\n') + '\n';
}

/** Redirects 301 das URLs antigas (currículos com nomes antigos). Sintaxe `_redirects` da Cloudflare: origem destino status. */
export function gerarRedirects() {
  const regras = [
    ['/Resume_Raphael_Sena.pdf', '/resume-raphael-sena.pdf'],
    ['/Curr%C3%ADculo_Raphael_Sena.pdf', '/curriculo-raphael-sena.pdf'],
  ];
  return regras.map(([de, para]) => `${de} ${para} 301`).join('\n') + '\n';
}

export function validarHeaders(texto) {
  const linhas = texto.split('\n');
  const regras = linhas.filter((l) => l.length > 0 && !l.startsWith(' ')).length;
  if (regras > MAX_REGRAS) throw new Error(`_headers excede ${MAX_REGRAS} regras (${regras})`);
  const longa = linhas.find((l) => l.length > MAX_LINHA);
  if (longa)
    throw new Error(
      `_headers tem linha com mais de ${MAX_LINHA} caracteres (${longa.length}): ${longa.slice(0, 80)}...`,
    );
}

function* arquivosHtml(pasta) {
  for (const nome of readdirSync(pasta)) {
    const caminho = join(pasta, nome);
    if (statSync(caminho).isDirectory()) yield* arquivosHtml(caminho);
    else if (nome === 'index.html') yield caminho;
  }
}

/** Páginas servidas como `/<rota>/` (index.html) com os hashes dos scripts inline de cada uma. */
export function paginasDe(saida, arquivos = []) {
  return [...arquivosHtml(saida)]
    .map((arquivo) => {
      const rota = '/' + relative(saida, dirname(arquivo)).split(sep).join('/');
      const caminho = rota === '/' ? '/' : `${rota}/`;
      return { caminho, hashes: hashesInline(readFileSync(arquivo, 'utf8')) };
    })
    .filter(({ caminho }) => !['/_not-found/', '/404/'].includes(caminho))
    .filter(({ caminho }) => !arquivos.some((ano) => caminho === `/${ano}/`))
    .sort((a, b) => a.caminho.localeCompare(b.caminho));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
  const saida = join(raiz, 'out');
  const producao = process.env.SITE_ENV === 'production';
  const enforce = process.env.CSP_MODE === 'enforce';
  const arquivos = anosArquivados();
  const paginas = paginasDe(saida, arquivos);
  const texto = gerarHeaders({ producao, paginas, enforce, arquivos });
  validarHeaders(texto);
  writeFileSync(join(saida, '_headers'), texto);
  writeFileSync(join(saida, '_redirects'), gerarRedirects());
  console.log(
    `out/_headers gerado (${producao ? 'production' : 'preview, noindex'}; CSP ${enforce ? 'enforce' : 'report-only'} em ${paginas.length} páginas; ${arquivos.length} versão(ões) antiga(s) noindex)`,
  );
}
