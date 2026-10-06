import type { Page } from '@playwright/test';
import { expect, paginaDeTeste, PAGINA_TESTE, test, WEBSITE_ID } from './fixtures';

// O Umami real nunca é contatado: o Worker desta suíte aponta para um servidor falso em 127.0.0.1.
test.describe.configure({ mode: 'serial' });

async function abrir(page: Page, baseUrl: string, html = paginaDeTeste()) {
  await page.route(`${baseUrl}${PAGINA_TESTE}`, (route) =>
    route.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: html }),
  );
  await page.goto(`${baseUrl}${PAGINA_TESTE}`);
}

function envios(umami: { requisicoes: { method: string; url: string; body: string }[] }) {
  return umami.requisicoes
    .filter((r) => r.method === 'POST' && r.url === '/api/send')
    .map((r) => JSON.parse(r.body) as { type: string; payload: Record<string, unknown> });
}

test.beforeEach(async ({ ambiente }) => {
  await ambiente.umami.iniciar();
  ambiente.umami.requisicoes.length = 0;
});

test('/stats/u.js é servido pelo próprio domínio com 200 e cache curto', async ({ request, ambiente }) => {
  const r = await request.get(`${ambiente.baseUrl}/stats/u.js`);
  expect(r.status()).toBe(200);
  expect(r.headers()['content-type']).toContain('javascript');
  expect(r.headers()['cache-control']).toBe('public, max-age=300');
  expect(r.headers()['x-content-type-options']).toBe('nosniff');
  expect(await r.text()).toContain('window.umami');
});

test('pageview e eventos chegam ao Umami com website id e URL certos, via proxy first-party', async ({
  page,
  ambiente,
}) => {
  const externos: string[] = [];
  page.on('request', (req) => {
    if (!req.url().startsWith(ambiente.baseUrl) && !req.url().startsWith('data:')) externos.push(req.url());
  });
  await abrir(page, ambiente.baseUrl);
  await expect.poll(() => envios(ambiente.umami).length).toBeGreaterThanOrEqual(1);

  await page.evaluate(() =>
    (window as unknown as { umami: { track: (n: string, d: object) => void } }).umami.track('contact_click', {
      channel: 'email',
    }),
  );
  await expect.poll(() => envios(ambiente.umami).length).toBeGreaterThanOrEqual(2);

  const [pageview, evento] = envios(ambiente.umami);
  expect(pageview?.payload).toMatchObject({ website: WEBSITE_ID, url: PAGINA_TESTE, tag: 'preview' });
  expect(evento?.payload).toMatchObject({ website: WEBSITE_ID, name: 'contact_click', data: { channel: 'email' } });
  expect(externos).toEqual([]);

  const comPost = ambiente.umami.requisicoes.find((r) => r.method === 'POST');
  expect(comPost?.headers['user-agent']).toContain('Chrome');
  expect(comPost?.headers['x-forwarded-for']).toBe('127.0.0.1'); // o wrangler dev também injeta cf-connecting-ip
  expect(await page.context().cookies()).toEqual([]);
});

test('repassa o IP real de cf-connecting-ip como x-forwarded-for', async ({ request, ambiente }) => {
  const r = await request.post(`${ambiente.baseUrl}/stats/api/send`, {
    headers: { origin: ambiente.baseUrl, 'cf-connecting-ip': '203.0.113.9', 'user-agent': 'Teste/1.0' },
    data: { type: 'event', payload: { website: WEBSITE_ID, url: '/' } },
  });
  expect(r.status()).toBe(200);
  const recebido = ambiente.umami.requisicoes.find((x) => x.url === '/api/send');
  expect(recebido?.headers['x-forwarded-for']).toBe('203.0.113.9');
  expect(recebido?.headers['user-agent']).toBe('Teste/1.0');
  expect(r.headers()['access-control-allow-origin']).toBe(ambiente.baseUrl);
});

test('com Do Not Track: nenhum envio e nenhum cookie', async ({ page, ambiente }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'doNotTrack', { get: () => '1' }));
  await abrir(page, ambiente.baseUrl);
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => (window as unknown as { umami?: { track: (n: string) => void } }).umami?.track('x'));
  await page.waitForTimeout(500);
  expect(envios(ambiente.umami)).toEqual([]);
  expect(await page.context().cookies()).toEqual([]);
});

test('com o Umami fora (servidor parado) a página funciona e não há erro visível', async ({ page, ambiente }) => {
  await ambiente.umami.parar();
  const erros: string[] = [];
  page.on('pageerror', (e) => erros.push(e.message));
  page.on('console', (m) => m.type() === 'error' && erros.push(m.text()));

  await abrir(page, ambiente.baseUrl);
  await expect(page.getByRole('heading', { name: 'ok' })).toBeVisible();
  await page.waitForLoadState('networkidle');
  expect(erros).toEqual([]);
});

test('com o proxy bloqueado (route.abort) a página funciona', async ({ page, ambiente }) => {
  await page.route('**/stats/**', (route) => route.abort());
  await abrir(page, ambiente.baseUrl);
  await expect(page.getByRole('heading', { name: 'ok' })).toBeVisible();
});

test('/api/health usa o Umami mas não vaza UMAMI_HOST', async ({ request, ambiente }) => {
  const r = await request.get(`${ambiente.baseUrl}/api/health`);
  expect(await r.json()).toEqual({ status: 'ok', umami: 'ok' });
  expect(ambiente.umami.requisicoes.some((x) => x.url === '/api/heartbeat')).toBe(true);

  const tudo = JSON.stringify({ corpo: await r.text(), headers: r.headersArray() });
  expect(tudo).not.toContain(String(ambiente.umami.porta));
  expect(tudo).not.toContain('127.0.0.1');

  await ambiente.umami.parar();
  const degradado = await request.get(`${ambiente.baseUrl}/api/health`);
  expect(await degradado.json()).toEqual({ status: 'ok', umami: 'degraded' });
  expect(await degradado.text()).not.toContain(String(ambiente.umami.porta));
});

test('origem estranha no POST é descartada em silêncio', async ({ request, ambiente }) => {
  const r = await request.post(`${ambiente.baseUrl}/stats/api/send`, {
    headers: { origin: 'https://malvado.example' },
    data: { type: 'event', payload: { website: WEBSITE_ID } },
  });
  expect(r.status()).toBe(204);
  expect(envios(ambiente.umami)).toEqual([]);
});

// Integração com o layout real (<UmamiScript /> e <AnalyticsClient /> em app/layout.tsx). O build de teste usa
// NEXT_PUBLIC_UMAMI_WEBSITE_ID=WEBSITE_ID (ver playwright.config.ts).
test.describe('integração com o layout real', () => {
  test('o layout carrega /stats/u.js com os data-attributes do brief', async ({ page, ambiente }) => {
    await page.goto(`${ambiente.baseUrl}/`);
    const script = page.locator('script[src="/stats/u.js"]');
    await expect(script).toHaveAttribute('data-host-url', '/stats');
    await expect(script).toHaveAttribute('data-do-not-track', 'true');
    await expect(script).toHaveAttribute('data-domains', 'raphaelsena.com,www.raphaelsena.com');
    await expect(script).toHaveAttribute('data-tag', 'preview');
  });

  // A home ainda não tem link externo (conteúdo no G3): habilitar então.
  test.fixme('clique em link externo envia outbound_click {host}', async ({ page, ambiente }) => {
    await page.goto(`${ambiente.baseUrl}/`);
    await page.route('https://github.com/**', (route) => route.fulfill({ status: 200, body: 'ok' }));
    await page.locator('a[href^="https://github.com"]').first().click();
    await expect.poll(() => envios(ambiente.umami).some((e) => e.payload.name === 'outbound_click')).toBe(true);
  });

  test('rota inexistente envia not_found {path} e erro JS envia js_error (máx. 3)', async ({ page, ambiente }) => {
    await page.goto(`${ambiente.baseUrl}/nao-existe/`);
    await expect.poll(() => envios(ambiente.umami).some((e) => e.payload.name === 'not_found')).toBe(true);
    for (let i = 0; i < 5; i++)
      await page.evaluate(() =>
        setTimeout(() => {
          throw new Error('boom');
        }),
      );
    await expect
      .poll(() => envios(ambiente.umami).filter((e) => e.payload.name === 'js_error').length)
      .toBeLessThanOrEqual(3);
  });
});
