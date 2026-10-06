import { describe, expect, it } from 'vitest';
// @ts-expect-error módulo .mjs sem tipos
import { gerarHeaders, validarHeaders } from '../scripts/gerar-headers.mjs';

describe('gerarHeaders', () => {
  it('em preview marca tudo como noindex', () => {
    const texto = gerarHeaders({ producao: false });
    expect(texto).toContain('X-Robots-Tag: noindex, nofollow');
  });

  it('em produção não envia noindex global', () => {
    const texto = gerarHeaders({ producao: true });
    expect(texto).not.toContain('noindex');
  });

  it('inclui cabeçalhos de segurança e cache imutável de assets com hash', () => {
    const texto = gerarHeaders({ producao: true });
    expect(texto).toContain('X-Content-Type-Options: nosniff');
    expect(texto).toContain('Referrer-Policy: strict-origin-when-cross-origin');
    expect(texto).toContain('/_next/static/*\n  Cache-Control: public, max-age=31536000, immutable');
  });

  it('respeita os limites do Cloudflare', () => {
    expect(() => validarHeaders(gerarHeaders({ producao: false }))).not.toThrow();
    expect(() => validarHeaders('x'.repeat(2001))).toThrow();
  });
});
