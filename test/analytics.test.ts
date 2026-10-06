import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  hostExterno,
  installGlobalErrorTracking,
  resetarContadoresDeSessao,
  sanitizarMensagem,
  track,
} from '../src/lib/analytics';

type Ouvinte = (e: unknown) => void;

function criarWindow(opts: { umami?: unknown; dnt?: string; storage?: boolean } = {}) {
  const ouvintes = new Map<string, Ouvinte[]>();
  const store = new Map<string, string>();
  const win = {
    umami: opts.umami,
    navigator: { doNotTrack: opts.dnt ?? null },
    location: { pathname: '/projetos/' },
    sessionStorage:
      opts.storage === false
        ? {
            getItem: () => {
              throw new Error('bloqueado');
            },
            setItem: () => {
              throw new Error('bloqueado');
            },
            clear: () => {},
          }
        : {
            getItem: (k: string) => store.get(k) ?? null,
            setItem: (k: string, v: string) => void store.set(k, v),
            clear: () => store.clear(),
          },
    addEventListener: (t: string, l: Ouvinte) => ouvintes.set(t, [...(ouvintes.get(t) ?? []), l]),
    removeEventListener: (t: string, l: Ouvinte) =>
      ouvintes.set(
        t,
        (ouvintes.get(t) ?? []).filter((x) => x !== l),
      ),
    dispararEvento: (t: string, e: unknown) => (ouvintes.get(t) ?? []).forEach((l) => l(e)),
  };
  return win;
}

describe('track', () => {
  beforeEach(() => vi.unstubAllGlobals());
  afterEach(() => vi.unstubAllGlobals());

  it('é no-op no servidor (sem window)', () => {
    expect(() => track('resume_download')).not.toThrow();
  });

  it('é no-op sem window.umami', () => {
    vi.stubGlobal('window', criarWindow());
    expect(() => track('page_turn', { from: '/', to: '/contato/', via: 'ear' })).not.toThrow();
  });

  it('envia nome e props ao umami.track', () => {
    const umami = { track: vi.fn() };
    vi.stubGlobal('window', criarWindow({ umami }));
    track('page_turn', { from: '/', to: '/contato/', via: 'menu' });
    track('resume_download');
    expect(umami.track).toHaveBeenNthCalledWith(1, 'page_turn', { from: '/', to: '/contato/', via: 'menu' });
    expect(umami.track).toHaveBeenNthCalledWith(2, 'resume_download', undefined);
  });

  it.each(['1', 'yes'])('respeita Do Not Track (%s)', (dnt) => {
    const umami = { track: vi.fn() };
    vi.stubGlobal('window', criarWindow({ umami, dnt }));
    track('contact_click', { channel: 'email' });
    expect(umami.track).not.toHaveBeenCalled();
  });

  it('nunca lança, mesmo se umami.track lançar', () => {
    vi.stubGlobal(
      'window',
      criarWindow({
        umami: {
          track: () => {
            throw new Error('boom');
          },
        },
      }),
    );
    expect(() => track('resume_download')).not.toThrow();
  });

  it('mac_rotate: no máximo 1 por sessão', () => {
    const umami = { track: vi.fn() };
    vi.stubGlobal('window', criarWindow({ umami }));
    resetarContadoresDeSessao();
    for (let i = 0; i < 5; i++) track('mac_rotate');
    expect(umami.track).toHaveBeenCalledTimes(1);
  });

  it('js_error: no máximo 3 por sessão, também sem sessionStorage', () => {
    const umami = { track: vi.fn() };
    vi.stubGlobal('window', criarWindow({ umami, storage: false }));
    resetarContadoresDeSessao();
    for (let i = 0; i < 10; i++) track('js_error', { route: '/', message: `erro ${i}` });
    expect(umami.track).toHaveBeenCalledTimes(3);
  });

  it('js_error trunca a mensagem em 120 caracteres e tira query de URLs', () => {
    const umami = { track: vi.fn() };
    vi.stubGlobal('window', criarWindow({ umami }));
    resetarContadoresDeSessao();
    track('js_error', { route: '/', message: `falha em https://x.example/a.js?token=segredo#h ${'y'.repeat(300)}` });
    const [, dados] = umami.track.mock.calls[0] as [string, { message: string }];
    expect(dados.message.length).toBeLessThanOrEqual(120);
    expect(dados.message).toContain('https://x.example/a.js');
    expect(dados.message).not.toContain('segredo');
  });
});

describe('installGlobalErrorTracking', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('converte error e unhandledrejection em js_error com limite de 3', () => {
    const umami = { track: vi.fn() };
    const win = criarWindow({ umami });
    vi.stubGlobal('window', win);
    resetarContadoresDeSessao();
    const remover = installGlobalErrorTracking();

    win.dispararEvento('error', { message: 'ReferenceError: x is not defined' });
    win.dispararEvento('unhandledrejection', { reason: new Error('promessa rejeitada') });
    win.dispararEvento('error', { message: 'terceiro' });
    win.dispararEvento('error', { message: 'quarto (descartado)' });

    expect(umami.track).toHaveBeenCalledTimes(3);
    expect(umami.track).toHaveBeenNthCalledWith(1, 'js_error', {
      route: '/projetos/',
      message: 'ReferenceError: x is not defined',
    });
    expect(umami.track).toHaveBeenNthCalledWith(2, 'js_error', { route: '/projetos/', message: 'promessa rejeitada' });
    remover();
    win.dispararEvento('error', { message: 'depois de remover' });
    expect(umami.track).toHaveBeenCalledTimes(3);
  });
});

describe('helpers', () => {
  it('sanitizarMensagem', () => {
    expect(sanitizarMensagem(new Error('oi'))).toBe('oi');
    expect(sanitizarMensagem(undefined)).toBe('');
    expect(sanitizarMensagem('a'.repeat(500)).length).toBe(120);
  });

  it('hostExterno só devolve hosts http(s) diferentes do site', () => {
    const base = 'https://www.raphaelsena.com/contato/';
    expect(hostExterno('https://github.com/raphael-sena', base)).toBe('github.com');
    expect(hostExterno('/projetos/', base)).toBeNull();
    expect(hostExterno('https://www.raphaelsena.com/x', base)).toBeNull();
    expect(hostExterno('mailto:a@b.c', base)).toBeNull();
    expect(hostExterno('tel:+5531', base)).toBeNull();
    expect(hostExterno('#topo', base)).toBeNull();
  });
});
