import { afterEach, describe, expect, it, vi } from 'vitest';
import { extrairViolacoes, handleCspReport } from '../worker/csp-report';

const pedido = (corpo: string, metodo = 'POST') =>
  new Request('https://exemplo.test/api/csp-report', { method: metodo, body: metodo === 'POST' ? corpo : undefined });

afterEach(() => vi.restoreAllMocks());

describe('extrairViolacoes', () => {
  it('lê o formato report-uri (application/csp-report)', () => {
    const v = extrairViolacoes({
      'csp-report': {
        'effective-directive': 'script-src-elem',
        'blocked-uri': 'inline',
        'document-uri': 'https://x.test/sobre/',
      },
    });
    expect(v).toEqual([{ diretiva: 'script-src-elem', bloqueado: 'inline', pagina: 'https://x.test/sobre/' }]);
  });

  it('lê o formato report-to (application/reports+json, lista)', () => {
    const v = extrairViolacoes([
      {
        type: 'csp-violation',
        body: { effectiveDirective: 'img-src', blockedURL: 'https://a.test/i.png', documentURL: 'https://x.test/' },
      },
    ]);
    expect(v).toEqual([{ diretiva: 'img-src', bloqueado: 'https://a.test/i.png', pagina: 'https://x.test/' }]);
  });

  it('ignora lixo e limita a quantidade', () => {
    expect(extrairViolacoes(null)).toEqual([]);
    expect(extrairViolacoes('texto')).toEqual([]);
    expect(extrairViolacoes([{ sem: 'diretiva' }])).toEqual([]);
    const muitos = Array.from({ length: 30 }, () => ({ 'csp-report': { 'effective-directive': 'x' } }));
    expect(extrairViolacoes(muitos)).toHaveLength(10);
  });
});

describe('handleCspReport', () => {
  it('POST válido responde 204 e registra só diretiva, recurso e página', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    const r = await handleCspReport(
      pedido(
        JSON.stringify({
          'csp-report': {
            'effective-directive': 'script-src',
            'blocked-uri': 'inline',
            'document-uri': 'https://x.test/',
            extra: 'não deve aparecer',
          },
        }),
      ),
    );
    expect(r.status).toBe(204);
    expect(log).toHaveBeenCalledTimes(1);
    const registro = JSON.parse(String(log.mock.calls[0]?.[0]));
    expect(registro).toEqual({
      tipo: 'csp-violation',
      diretiva: 'script-src',
      bloqueado: 'inline',
      pagina: 'https://x.test/',
    });
  });

  it('corpo inválido ou grande demais não gera erro nem log', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    expect((await handleCspReport(pedido('não é json'))).status).toBe(204);
    expect((await handleCspReport(pedido('x'.repeat(20_000)))).status).toBe(204);
    expect(log).not.toHaveBeenCalled();
  });

  it('só aceita POST', async () => {
    const r = await handleCspReport(pedido('', 'GET'));
    expect(r.status).toBe(405);
    expect(r.headers.get('allow')).toBe('POST');
  });
});
