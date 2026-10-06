// Gera out/_headers depois do `next build`. Em preview/workers.dev (SITE_ENV != production) tudo é noindex.
// Limites do Cloudflare para _headers: 100 regras e 2000 caracteres por linha.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const MAX_REGRAS = 100;
const MAX_LINHA = 2000;

export function gerarHeaders({ producao }) {
  const seguranca = [
    'X-Content-Type-Options: nosniff',
    'Referrer-Policy: strict-origin-when-cross-origin',
    'Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()',
    'X-Frame-Options: DENY',
  ];
  const regras = [
    { padrao: '/*', linhas: [...seguranca, ...(producao ? [] : ['X-Robots-Tag: noindex, nofollow'])] },
    { padrao: '/_next/static/*', linhas: ['Cache-Control: public, max-age=31536000, immutable'] },
  ];
  return regras.map((r) => `${r.padrao}\n${r.linhas.map((l) => `  ${l}`).join('\n')}`).join('\n\n') + '\n';
}

export function validarHeaders(texto) {
  const linhas = texto.split('\n');
  const regras = linhas.filter((l) => l.length > 0 && !l.startsWith(' ')).length;
  if (regras > MAX_REGRAS) throw new Error(`_headers excede ${MAX_REGRAS} regras (${regras})`);
  const longa = linhas.find((l) => l.length > MAX_LINHA);
  if (longa) throw new Error(`_headers tem linha com mais de ${MAX_LINHA} caracteres`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
  const texto = gerarHeaders({ producao: process.env.SITE_ENV === 'production' });
  validarHeaders(texto);
  writeFileSync(join(raiz, 'out', '_headers'), texto);
  console.log(`out/_headers gerado (${process.env.SITE_ENV === 'production' ? 'production' : 'preview, noindex'})`);
}
