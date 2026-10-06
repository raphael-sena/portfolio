import { describe, expect, it, vi } from 'vitest';
import { handleHealth, handleStats, hostDoUmami, origemPermitida, umamiStatus, type FetchFn } from '../worker/umami';

const HOST = 'https://umami-secreto.invalid';
const env = { UMAMI_HOST: HOST };
const SITE = 'https://www.raphaelsena.com';

function pedido(path: string, init: RequestInit = {}): Request {
  return new Request(`${SITE}${path}`, init);
}

function envio(init: { origin?: string | null; body?: string; headers?: Record<string, string> } = {}): Request {
  const { origin = SITE, body = '{"type":"event","payload":{"website":"w","url":"/"}}', headers = {} } = init;
  return pedido('/stats/api/send', {
    method: 'POST',
    body,
    headers: {
      'content-type': 'application/json',
      'user-agent': 'Mozilla/5.0 Teste',
      'cf-connecting-ip': '203.0.113.7',
      ...(origin ? { origin } : {}),
      ...headers,
    },
  });
}

describe('/stats/u.js', () => {
  it('serve o script do Umami com cache curto e cabeçalhos próprios', async () => {
    const fetchFn = vi.fn<FetchFn>(async () => new Response('window.umami={}', { status: 200 }));
    const r = await handleStats(pedido('/stats/u.js'), env, fetchFn);
    expect(r.status).toBe(200);
    expect(await r.text()).toBe('window.umami={}');
    expect(r.headers.get('cache-control')).toBe('public, max-age=300');
    expect(r.headers.get('content-type')).toContain('javascript');
    expect(r.headers.get('x-content-type-options')).toBe('nosniff');
    expect(r.headers.get('x-robots-tag')).toBe('noindex');
    expect(fetchFn.mock.calls[0]?.[0]).toBe(`${HOST}/script.js`);
  });

  it.each([
    ['rede cai', () => Promise.reject(new Error(`falhou ${HOST}`))],
    ['upstream 500', () => Promise.resolve(new Response('erro interno', { status: 500 }))],
  ])('Umami fora (%s): JS vazio, 200, sem cache e sem vazar nada', async (_nome, impl) => {
    const r = await handleStats(pedido('/stats/u.js'), env, impl as FetchFn);
    const texto = await r.text();
    expect(r.status).toBe(200);
    expect(r.headers.get('cache-control')).toBe('no-store');
    expect(texto).not.toContain('umami-secreto');
    expect(texto).not.toContain('erro interno');
  });

  it('rejeita métodos que não sejam GET/HEAD', async () => {
    const r = await handleStats(pedido('/stats/u.js', { method: 'POST' }), env, vi.fn<FetchFn>());
    expect(r.status).toBe(405);
  });
});

describe('POST /stats/api/send', () => {
  it('repassa corpo, user-agent e IP real (x-forwarded-for) para o Umami', async () => {
    const fetchFn = vi.fn<FetchFn>(
      async () => new Response('{"cache":"abc"}', { status: 200, headers: { 'content-type': 'application/json' } }),
    );
    const corpo = '{"type":"event","payload":{"website":"w","url":"/contato/"}}';
    const r = await handleStats(envio({ body: corpo, headers: { 'x-umami-cache': 'tok' } }), env, fetchFn);

    expect(fetchFn).toHaveBeenCalledOnce();
    const [url, init] = fetchFn.mock.calls[0]!;
    const h = new Headers(init?.headers);
    expect(url).toBe(`${HOST}/api/send`);
    expect(init?.method).toBe('POST');
    expect(new TextDecoder().decode(init?.body as ArrayBuffer)).toBe(corpo);
    expect(h.get('user-agent')).toBe('Mozilla/5.0 Teste');
    expect(h.get('x-forwarded-for')).toBe('203.0.113.7');
    expect(h.get('x-real-ip')).toBe('203.0.113.7');
    expect(h.get('x-umami-cache')).toBe('tok');
    expect(h.get('cookie')).toBeNull();
    expect(r.status).toBe(200);
    expect(await r.json()).toEqual({ cache: 'abc' });
    expect(r.headers.get('access-control-allow-origin')).toBe(SITE);
  });

  it('não inventa IP quando o cabeçalho do Cloudflare não existe', async () => {
    const fetchFn = vi.fn<FetchFn>(async () => new Response('{}', { status: 200 }));
    const req = new Request(`${SITE}/stats/api/send`, { method: 'POST', body: '{"a":1}', headers: { origin: SITE } });
    await handleStats(req, env, fetchFn);
    expect(new Headers(fetchFn.mock.calls[0]?.[1]?.headers).get('x-forwarded-for')).toBeNull();
  });

  it('OPTIONS responde 204 com CORS para origem permitida', async () => {
    const fetchFn = vi.fn<FetchFn>();
    const r = await handleStats(
      pedido('/stats/api/send', { method: 'OPTIONS', headers: { origin: 'http://localhost:3000' } }),
      env,
      fetchFn,
    );
    expect(r.status).toBe(204);
    expect(r.headers.get('access-control-allow-origin')).toBe('http://localhost:3000');
    expect(r.headers.get('access-control-allow-methods')).toContain('POST');
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it('origem não permitida: 204 silencioso, sem CORS e sem repassar', async () => {
    const fetchFn = vi.fn<FetchFn>();
    const r = await handleStats(envio({ origin: 'https://malvado.example' }), env, fetchFn);
    expect(r.status).toBe(204);
    expect(r.headers.get('access-control-allow-origin')).toBeNull();
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it('corpo grande demais ou vazio não chega ao Umami', async () => {
    const fetchFn = vi.fn<FetchFn>();
    expect((await handleStats(envio({ body: 'x'.repeat(20_000) }), env, fetchFn)).status).toBe(204);
    expect((await handleStats(envio({ body: '' }), env, fetchFn)).status).toBe(204);
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it.each([
    ['fetch rejeita', () => Promise.reject(new Error(`ECONNREFUSED ${HOST}`))],
    ['upstream 502', () => Promise.resolve(new Response('bad gateway do umami', { status: 502 }))],
    ['upstream 500', () => Promise.resolve(new Response('stack trace', { status: 500 }))],
  ])('Umami fora (%s): 204 sem corpo, sem erro visível', async (_nome, impl) => {
    const r = await handleStats(envio(), env, impl as FetchFn);
    expect(r.status).toBe(204);
    expect(await r.text()).toBe('');
    expect(JSON.stringify([...r.headers])).not.toContain('umami-secreto');
  });

  it('GET em /stats/api/send é 405', async () => {
    expect((await handleStats(pedido('/stats/api/send'), env, vi.fn<FetchFn>())).status).toBe(405);
  });
});

describe('sem UMAMI_HOST', () => {
  it('/stats/u.js vira um JS vazio (200), sem chamar a rede', async () => {
    const fetchFn = vi.fn<FetchFn>();
    const r = await handleStats(pedido('/stats/u.js'), {}, fetchFn);
    expect(r.status).toBe(200);
    expect(r.headers.get('content-type')).toContain('javascript');
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it('POST em /stats/api/send é 204 silencioso, sem chamar a rede', async () => {
    const fetchFn = vi.fn<FetchFn>();
    const r = await handleStats(pedido('/stats/api/send', { method: 'POST' }), {}, fetchFn);
    expect(r.status).toBe(204);
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it('caminho desconhecido é 404 limpo', async () => {
    const r = await handleStats(pedido('/stats/outra'), {}, vi.fn<FetchFn>());
    expect(r.status).toBe(404);
    expect(await r.json()).toEqual({ error: 'not_found' });
  });

  it('host inválido é tratado como ausente', () => {
    expect(hostDoUmami({ UMAMI_HOST: 'não é url' })).toBeNull();
    expect(hostDoUmami({ UMAMI_HOST: 'ftp://x.example' })).toBeNull();
    expect(hostDoUmami({ UMAMI_HOST: ' https://x.example/ ' })).toBe('https://x.example');
  });
});

describe('/api/health', () => {
  const health = (umamiHost: string | undefined, fetchImpl: FetchFn) =>
    handleHealth({ UMAMI_HOST: umamiHost }, fetchImpl);

  it('ok quando o heartbeat responde, sem vazar o host em corpo ou headers', async () => {
    const fetchFn = vi.fn<FetchFn>(async () => new Response('{"ok":true}', { status: 200 }));
    const r = await health(HOST, fetchFn);
    expect(await r.clone().json()).toEqual({ status: 'ok', umami: 'ok' });
    expect(fetchFn.mock.calls[0]?.[0]).toBe(`${HOST}/api/heartbeat`);
    expect(await r.text()).not.toContain('umami-secreto');
    expect(JSON.stringify([...r.headers])).not.toContain('umami-secreto');
    expect(r.headers.get('x-content-type-options')).toBe('nosniff');
  });

  it.each([
    ['rede cai', () => Promise.reject(new Error(`getaddrinfo ${HOST}`))],
    ['5xx', () => Promise.resolve(new Response('x', { status: 503 }))],
  ])('degraded quando %s, sem vazar o host', async (_n, impl) => {
    const r = await health(HOST, impl as FetchFn);
    const texto = await r.text();
    expect(JSON.parse(texto)).toEqual({ status: 'ok', umami: 'degraded' });
    expect(texto).not.toContain('umami-secreto');
  });

  it('unconfigured sem UMAMI_HOST', async () => {
    const r = await health(undefined, vi.fn<FetchFn>());
    expect(await r.json()).toEqual({ status: 'ok', umami: 'unconfigured' });
  });

  it('umamiStatus nunca lança', async () => {
    await expect(umamiStatus(env, () => Promise.reject(new Error('x')))).resolves.toBe('degraded');
  });
});

describe('origemPermitida', () => {
  it.each([
    ['https://raphaelsena.com', true],
    ['https://www.raphaelsena.com', true],
    ['https://portfolio.conta.workers.dev', true],
    ['http://localhost:8787', true],
    ['http://127.0.0.1:3000', true],
    ['http://www.raphaelsena.com', false],
    ['https://raphaelsena.com.malvado.example', false],
    ['https://workers.dev.malvado.example', false],
    ['nao-e-url', false],
  ])('%s -> %s', (origem, esperado) => {
    expect(origemPermitida(origem)).toBe(esperado);
  });
});
