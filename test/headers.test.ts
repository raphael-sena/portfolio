import { describe, expect, it } from 'vitest';
// @ts-expect-error módulo .mjs sem tipos
import { csp, gerarHeaders, gerarRedirects, hashesInline, validarHeaders } from '../scripts/gerar-headers.mjs';

describe('gerarHeaders', () => {
  it('em preview marca tudo como noindex e não envia HSTS', () => {
    const texto = gerarHeaders({ producao: false });
    expect(texto).toContain('X-Robots-Tag: noindex, nofollow');
    expect(texto).not.toContain('Strict-Transport-Security');
  });

  it('em produção não envia noindex global e envia HSTS de um ano', () => {
    const texto = gerarHeaders({ producao: true });
    expect(texto).not.toContain('noindex');
    expect(texto).toContain('Strict-Transport-Security: max-age=31536000');
    expect(texto).not.toContain('preload');
    expect(texto).not.toContain('includeSubDomains');
  });

  it('inclui cabeçalhos de segurança e cache dos assets, do modelo 3D e das imagens OG', () => {
    const texto = gerarHeaders({ producao: true });
    expect(texto).toContain('X-Content-Type-Options: nosniff');
    expect(texto).toContain('Referrer-Policy: strict-origin-when-cross-origin');
    expect(texto).toContain('Cross-Origin-Opener-Policy: same-origin');
    expect(texto).toContain('/_next/static/*\n  Cache-Control: public, max-age=31536000, immutable');
    expect(texto).toContain('/models/*\n  Cache-Control: public, max-age=86400');
    expect(texto).toContain('/og/*\n  Cache-Control: public, max-age=86400');
  });

  it('a CSP é por página, começa em Report-Only e usa os hashes dela', () => {
    const paginas = [{ caminho: '/sobre/', hashes: ["'sha256-AAA='"] }];
    const texto = gerarHeaders({ producao: true, paginas });
    expect(texto).toContain(
      "/sobre/\n  Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self' 'wasm-unsafe-eval' 'sha256-AAA='",
    );
    expect(texto).not.toMatch(/\n {2}Content-Security-Policy: /);
    const aplicada = gerarHeaders({ producao: true, paginas, enforce: true });
    expect(aplicada).toMatch(/\n {2}Content-Security-Policy: /);
    expect(aplicada).toContain('upgrade-insecure-requests');
  });

  it('a CSP nega objetos, frames e base externa', () => {
    const politica = csp([]);
    expect(politica).toContain("object-src 'none'");
    expect(politica).toContain("frame-ancestors 'none'");
    expect(politica).toContain("base-uri 'self'");
    expect(politica).not.toContain("'unsafe-eval'");
  });

  it('a CSP tem destino de relatório (report-uri e report-to) e o endpoint é declarado', () => {
    expect(csp([])).toContain('report-uri /api/csp-report');
    expect(csp([])).toContain('report-to csp');
    expect(gerarHeaders({ producao: true })).toContain('Reporting-Endpoints: csp="/api/csp-report"');
  });

  it('versões antigas em /<ano>/ são sempre noindex, mesmo em produção, e não ganham CSP', () => {
    const texto = gerarHeaders({ producao: true, arquivos: [2024, 2025] });
    expect(texto).toContain('/2024/*\n  X-Robots-Tag: noindex, nofollow');
    expect(texto).toContain('/2025/*\n  X-Robots-Tag: noindex, nofollow');
    expect(texto).toContain('/2024/_next/static/*\n  Cache-Control: public, max-age=31536000, immutable');
    expect(texto).not.toContain('/2024/\n');
  });

  it('respeita os limites do Cloudflare', () => {
    expect(() => validarHeaders(gerarHeaders({ producao: false }))).not.toThrow();
    expect(() => validarHeaders('x'.repeat(2001))).toThrow();
    const muitas = Array.from({ length: 101 }, (_, i) => ({ caminho: `/p${i}/`, hashes: [] }));
    expect(() => validarHeaders(gerarHeaders({ producao: false, paginas: muitas }))).toThrow();
  });
});

describe('hashesInline', () => {
  it('pega só scripts inline executáveis e ignora src, JSON-LD e scripts vazios', () => {
    const html = `
      <script src="/a.js"></script>
      <script type="application/ld+json">{"a":1}</script>
      <script>   </script>
      <script>window.x=1</script>
      <script id="b">window.y=2</script>`;
    const hashes = hashesInline(html);
    expect(hashes).toHaveLength(2);
    for (const h of hashes) expect(h).toMatch(/^'sha256-[A-Za-z0-9+/]+={0,2}'$/);
  });

  it('o hash bate com SHA-256 em base64 do corpo exato', async () => {
    const { createHash } = await import('node:crypto');
    const corpo = 'self.__next_f.push([1,"x"])';
    expect(hashesInline(`<script>${corpo}</script>`)).toEqual([
      `'sha256-${createHash('sha256').update(corpo).digest('base64')}'`,
    ]);
  });
});

describe('gerarRedirects', () => {
  it('redireciona os currículos antigos com 301', () => {
    const texto = gerarRedirects();
    expect(texto).toContain('/Resume_Raphael_Sena.pdf /resume-raphael-sena.pdf 301');
    expect(texto).toContain('/Curr%C3%ADculo_Raphael_Sena.pdf /curriculo-raphael-sena.pdf 301');
  });
});
