// Fixtures da suíte umami: um Umami FALSO local + um `wrangler dev` próprio apontando para ele.
// Nunca usa o host real: UMAMI_HOST vem de `--var` e o servidor falso só escuta em 127.0.0.1.
import { test as base, expect } from '@playwright/test';
import { spawn, type ChildProcess } from 'node:child_process';
import { createServer, type IncomingMessage, type Server } from 'node:http';
import { createServer as createNetServer } from 'node:net';
import type { AddressInfo } from 'node:net';

export const WEBSITE_ID = '00000000-0000-4000-8000-000000000001';
export const PAGINA_TESTE = '/__teste-umami__/';

export interface RequisicaoRegistrada {
  method: string;
  url: string;
  headers: IncomingMessage['headers'];
  body: string;
}

// Stand-in mínimo do tracker real: mesmos data-attributes e mesmo endpoint (`${host-url}/api/send`).
const SCRIPT_FALSO = `(() => {
  const s = document.currentScript;
  const id = s.getAttribute('data-website-id');
  const host = s.getAttribute('data-host-url') || '';
  const dnt = s.getAttribute('data-do-not-track') === 'true';
  const domains = (s.getAttribute('data-domains') || '').split(',').filter(Boolean);
  const tag = s.getAttribute('data-tag') || undefined;
  if ((dnt && navigator.doNotTrack === '1') || (domains.length && !domains.includes(location.hostname) && !/^(localhost|127\\.0\\.0\\.1)$/.test(location.hostname))) return;
  const send = (type, extra) => fetch(host + '/api/send', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ type, payload: { website: id, hostname: location.hostname, url: location.pathname, tag, ...extra } }),
  }).catch(() => {});
  window.umami = { track: (name, data) => send('event', typeof name === 'string' ? { name, data } : {}) };
  send('event', {});
})();`;

async function portaLivre(): Promise<number> {
  return new Promise((resolve, reject) => {
    const srv = createNetServer();
    srv.once('error', reject);
    srv.listen(0, '127.0.0.1', () => {
      const { port } = srv.address() as AddressInfo;
      srv.close(() => resolve(port));
    });
  });
}

export interface UmamiFalso {
  porta: number;
  requisicoes: RequisicaoRegistrada[];
  parar: () => Promise<void>;
  iniciar: () => Promise<void>;
}

export async function criarUmamiFalso(): Promise<UmamiFalso> {
  const porta = await portaLivre();
  const requisicoes: RequisicaoRegistrada[] = [];
  let server: Server | null = null;

  const criar = () =>
    createServer((req, res) => {
      const partes: Buffer[] = [];
      req.on('data', (c: Buffer) => partes.push(c));
      req.on('end', () => {
        requisicoes.push({
          method: req.method ?? '',
          url: req.url ?? '',
          headers: req.headers,
          body: Buffer.concat(partes).toString('utf8'),
        });
        if (req.url === '/script.js') {
          res.writeHead(200, { 'content-type': 'text/javascript' }).end(SCRIPT_FALSO);
        } else if (req.url === '/api/heartbeat') {
          res.writeHead(200, { 'content-type': 'application/json' }).end('{"ok":true}');
        } else if (req.url === '/api/send') {
          res
            .writeHead(200, { 'content-type': 'application/json' })
            .end('{"cache":"falso","sessionId":"s","visitId":"v"}');
        } else {
          res.writeHead(404).end();
        }
      });
    });

  const iniciar = () =>
    new Promise<void>((resolve) => {
      if (server) return resolve();
      server = criar();
      server.listen(porta, '127.0.0.1', resolve);
    });
  const parar = () =>
    new Promise<void>((resolve) => {
      if (!server) return resolve();
      server.closeAllConnections();
      server.close(() => resolve());
      server = null;
    });

  await iniciar();
  return { porta, requisicoes, parar, iniciar };
}

interface Ambiente {
  umami: UmamiFalso;
  baseUrl: string;
  hostFalso: string;
}

async function subirWrangler(umamiPorta: number): Promise<{ proc: ChildProcess; baseUrl: string }> {
  const porta = await portaLivre();
  const proc = spawn(
    'node_modules/.bin/wrangler',
    [
      'dev',
      '--ip',
      '127.0.0.1',
      '--port',
      String(porta),
      '--inspector-port',
      String(await portaLivre()),
      '--var',
      `UMAMI_HOST:http://127.0.0.1:${umamiPorta}`,
    ],
    { stdio: 'ignore', env: { ...process.env, WRANGLER_SEND_METRICS: 'false' } },
  );
  const baseUrl = `http://127.0.0.1:${porta}`;
  const limite = Date.now() + 90_000;
  while (Date.now() < limite) {
    try {
      const r = await fetch(`${baseUrl}/api/health`);
      if (r.ok) return { proc, baseUrl };
    } catch {
      // ainda subindo
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  proc.kill();
  throw new Error('wrangler dev da suíte umami não subiu a tempo');
}

// Um Worker + um Umami falso por processo de teste (worker-scoped); os testes seguem em série.
export const test = base.extend<object, { ambiente: Ambiente }>({
  ambiente: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
      const umami = await criarUmamiFalso();
      const { proc, baseUrl } = await subirWrangler(umami.porta);
      await use({ umami, baseUrl, hostFalso: `127.0.0.1:${umami.porta}` });
      proc.kill();
      await umami.parar();
    },
    { scope: 'worker', timeout: 120_000 },
  ],
});

/** HTML mínimo que carrega o tracker pelo proxy do próprio domínio, como o <UmamiScript /> fará. */
export function paginaDeTeste(opcoes: { doNotTrack?: boolean } = {}): string {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>teste umami</title>
<script defer src="/stats/u.js" data-website-id="${WEBSITE_ID}" data-host-url="/stats"
  data-domains="raphaelsena.com,www.raphaelsena.com" data-do-not-track="${opcoes.doNotTrack ?? true}" data-tag="preview"></script>
</head><body><main><h1>ok</h1></main></body></html>`;
}

export { expect };
