import { BASE_HEADERS, handleHealth, handleStats, type UmamiEnv } from './umami';

interface Env extends UmamiEnv {
  ASSETS: Fetcher;
}

const JSON_HEADERS = {
  ...BASE_HEADERS,
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store',
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === '/api/health') {
      return handleHealth(env);
    }
    // /api/chess e /api/spotify entram no G3.
    if (pathname.startsWith('/stats/')) {
      return handleStats(request, env);
    }
    if (pathname.startsWith('/api/')) {
      return json({ error: 'not_found' }, 404);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
