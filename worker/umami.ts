// Proxy first-party do Umami. Módulo puro: `fetch` é injetável para os testes.
// Regras: falha do Umami nunca vira erro visível; UMAMI_HOST nunca aparece em resposta, header ou mensagem.

export interface UmamiEnv {
  UMAMI_HOST?: string;
}

export type FetchFn = (input: string, init?: RequestInit) => Promise<Response>;
export type UmamiStatus = 'ok' | 'degraded' | 'unconfigured';

const TIMEOUT_MS = 5000;
const HEALTH_TIMEOUT_MS = 3000;
const MAX_BODY_BYTES = 16 * 1024;

export const BASE_HEADERS = {
  'x-content-type-options': 'nosniff',
  'x-robots-tag': 'noindex',
} as const;

const ORIGENS_DO_SITE = new Set(['https://raphaelsena.com', 'https://www.raphaelsena.com']);

/** Origens que podem chamar o proxy: o site, workers.dev (preview) e localhost (dev). */
export function origemPermitida(origin: string): boolean {
  if (ORIGENS_DO_SITE.has(origin)) return true;
  let url: URL;
  try {
    url = new URL(origin);
  } catch {
    return false;
  }
  if (url.protocol === 'https:' && url.hostname.endsWith('.workers.dev')) return true;
  return url.protocol === 'http:' && (url.hostname === 'localhost' || url.hostname === '127.0.0.1');
}

/** Normaliza UMAMI_HOST para uma origem sem barra final; inválido ou ausente vira null. */
export function hostDoUmami(env: UmamiEnv): string | null {
  const bruto = env.UMAMI_HOST?.trim();
  if (!bruto) return null;
  try {
    const url = new URL(bruto);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    return `${url.origin}${url.pathname.replace(/\/+$/, '')}`;
  } catch {
    return null;
  }
}

function vazio(status: number, extra: Record<string, string> = {}): Response {
  return new Response(null, { status, headers: { ...BASE_HEADERS, 'cache-control': 'no-store', ...extra } });
}

function naoEncontrado(): Response {
  return new Response(JSON.stringify({ error: 'not_found' }), {
    status: 404,
    headers: { ...BASE_HEADERS, 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}

function corsHeaders(origin: string | null): Record<string, string> {
  if (!origin || !origemPermitida(origin)) return {};
  return {
    'access-control-allow-origin': origin,
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'content-type, x-umami-cache',
    'access-control-max-age': '86400',
    vary: 'Origin',
  };
}

async function servirScript(host: string, request: Request, fetchFn: FetchFn): Promise<Response> {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return vazio(405, { allow: 'GET, HEAD' });
  }
  // Sem Umami, o script vira um JS vazio (200, sem erro no console) e não é cacheado.
  const indisponivel = () =>
    new Response(request.method === 'HEAD' ? null : '/* analytics indisponivel */', {
      status: 200,
      headers: { ...BASE_HEADERS, 'content-type': 'text/javascript; charset=utf-8', 'cache-control': 'no-store' },
    });
  try {
    const upstream = await fetchFn(`${host}/script.js`, {
      method: 'GET',
      redirect: 'manual',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!upstream.ok) return indisponivel();
    return new Response(request.method === 'HEAD' ? null : upstream.body, {
      status: 200,
      headers: {
        ...BASE_HEADERS,
        'content-type': 'text/javascript; charset=utf-8',
        'cache-control': 'public, max-age=300',
      },
    });
  } catch {
    return indisponivel();
  }
}

async function repassarEnvio(host: string, request: Request, fetchFn: FetchFn): Promise<Response> {
  const origin = request.headers.get('origin');
  const cors = corsHeaders(origin);

  if (request.method === 'OPTIONS') {
    return vazio(204, cors);
  }
  if (request.method !== 'POST') {
    return vazio(405, { allow: 'POST, OPTIONS' });
  }
  // Origem estranha: descarta em silêncio, sem repassar e sem cabeçalhos CORS.
  if (origin && !origemPermitida(origin)) return vazio(204);

  try {
    const corpo = await request.arrayBuffer();
    if (corpo.byteLength === 0 || corpo.byteLength > MAX_BODY_BYTES) return vazio(204, cors);

    const headers = new Headers();
    headers.set('content-type', request.headers.get('content-type') ?? 'application/json');
    const ua = request.headers.get('user-agent');
    if (ua) headers.set('user-agent', ua);
    const cache = request.headers.get('x-umami-cache');
    if (cache) headers.set('x-umami-cache', cache);
    // O Umami lê o IP destes cabeçalhos (ver docs/umami.md); o IP real vem do Cloudflare.
    const ip = request.headers.get('cf-connecting-ip');
    if (ip) {
      headers.set('x-forwarded-for', ip);
      headers.set('x-real-ip', ip);
    }

    const upstream = await fetchFn(`${host}/api/send`, {
      method: 'POST',
      headers,
      body: corpo,
      redirect: 'manual',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!upstream.ok) return vazio(204, cors);
    return new Response(upstream.body, {
      status: 200,
      headers: {
        ...BASE_HEADERS,
        ...cors,
        'content-type': upstream.headers.get('content-type') ?? 'application/json',
        'cache-control': 'no-store',
      },
    });
  } catch {
    return vazio(204, cors);
  }
}

/**
 * Trata /stats/*. Caminho desconhecido é 404 limpo. Sem UMAMI_HOST (dev, CI, preview sem secret) o script vira um JS
 * vazio e o envio um 204: a página nunca mostra erro por causa do analytics.
 */
export async function handleStats(
  request: Request,
  env: UmamiEnv,
  fetchFn: FetchFn = (input, init) => fetch(input, init),
): Promise<Response> {
  const { pathname } = new URL(request.url);
  const host = hostDoUmami(env);
  if (!host) {
    if (pathname === '/stats/u.js') {
      return new Response(request.method === 'HEAD' ? null : '/* analytics nao configurado */', {
        status: 200,
        headers: { ...BASE_HEADERS, 'content-type': 'text/javascript; charset=utf-8', 'cache-control': 'no-store' },
      });
    }
    if (pathname === '/stats/api/send') return vazio(request.method === 'POST' ? 204 : 405);
    return naoEncontrado();
  }

  if (pathname === '/stats/u.js') return servirScript(host, request, fetchFn);
  if (pathname === '/stats/api/send') return repassarEnvio(host, request, fetchFn);
  return naoEncontrado();
}

/** Resposta de /api/health: o Worker está de pé; `umami` mostra o estado do servidor sem expor o host. */
export async function handleHealth(env: UmamiEnv, fetchFn?: FetchFn): Promise<Response> {
  const umami = await umamiStatus(env, fetchFn);
  return new Response(JSON.stringify({ status: 'ok', umami }), {
    status: 200,
    headers: { ...BASE_HEADERS, 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}

/** Consulta o heartbeat do Umami. Nunca lança e nunca expõe o host. */
export async function umamiStatus(env: UmamiEnv, fetchFn: FetchFn = (i, n) => fetch(i, n)): Promise<UmamiStatus> {
  const host = hostDoUmami(env);
  if (!host) return 'unconfigured';
  try {
    const resposta = await fetchFn(`${host}/api/heartbeat`, {
      method: 'GET',
      redirect: 'manual',
      signal: AbortSignal.timeout(HEALTH_TIMEOUT_MS),
    });
    return resposta.ok ? 'ok' : 'degraded';
  } catch {
    return 'degraded';
  }
}
