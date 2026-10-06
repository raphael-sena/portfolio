interface Env {
  ASSETS: Fetcher;
}

const JSON_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store',
  'x-content-type-options': 'nosniff',
  'x-robots-tag': 'noindex',
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);

    // Fase "hello" (G1): só o health. /stats/* (G5), /api/chess e /api/spotify (G3 e depois) entram nas próximas fases.
    if (pathname === '/api/health') {
      return json({ status: 'ok' });
    }
    if (pathname.startsWith('/api/') || pathname.startsWith('/stats/')) {
      return json({ error: 'not_found' }, 404);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
