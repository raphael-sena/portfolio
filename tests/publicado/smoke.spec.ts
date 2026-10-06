import { expect, test } from '@playwright/test';

// Smoke SOMENTE LEITURA, pensado para rodar contra o site publicado (PLAYWRIGHT_BASE_URL): depois de cada deploy, todo dia
// e sob demanda. Nada é enviado ao Umami: as chamadas de /stats/api/send são interceptadas e respondidas aqui.
test.beforeEach(async ({ page }) => {
  await page.route('**/stats/api/send', (route) => route.fulfill({ status: 204 }));
});

test('/api/health responde ok e não vaza o host do Umami', async ({ request }) => {
  const r = await request.get('/api/health');
  expect(r.status()).toBe(200);
  const corpo = await r.text();
  const json = JSON.parse(corpo);
  expect(json.status).toBe('ok');
  expect(['ok', 'degraded', 'unconfigured']).toContain(json.umami);
  expect(corpo).not.toMatch(/https?:\/\//);
});

test('sitemap, robots e todas as páginas do sitemap respondem com title, lang e canonical', async ({
  request,
  page,
}) => {
  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);

  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  const urls = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]!).pathname);
  expect(urls.length).toBeGreaterThanOrEqual(24);

  for (const caminho of urls) {
    const resposta = await page.goto(caminho);
    expect(resposta?.status(), caminho).toBe(200);
    expect((await page.title()).length, caminho).toBeGreaterThan(0);
    expect(await page.locator('html').getAttribute('lang'), caminho).toMatch(/^(pt-BR|en|de)$/);
    await expect(page.locator('h1'), caminho).toHaveCount(1);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(new URL(canonical ?? '').pathname, caminho).toBe(caminho);
  }
});

test('o 404 é real, os currículos e o modelo 3D respondem e as URLs antigas redirecionam', async ({ request }) => {
  expect((await request.get('/nao-existe-smoke/')).status()).toBe(404);
  for (const arquivo of [
    '/curriculo-raphael-sena.pdf',
    '/resume-raphael-sena.pdf',
    '/models/apple-ii-computer.glb',
    '/models/apple-ii-poster.webp',
  ]) {
    expect((await request.get(arquivo)).status(), arquivo).toBe(200);
  }
  const antigo = await request.get('/Resume_Raphael_Sena.pdf', { maxRedirects: 0 });
  expect(antigo.status()).toBe(301);
});

test('cabeçalhos de segurança presentes', async ({ request }) => {
  const h = (await request.get('/')).headers();
  expect(h['x-content-type-options']).toBe('nosniff');
  expect(h['x-frame-options']).toBe('DENY');
  expect(h['referrer-policy']).toBe('strict-origin-when-cross-origin');
  expect(h['content-security-policy-report-only'] ?? h['content-security-policy']).toBeTruthy();
});

// Só no domínio de produção: o build de produção é indexável (sem noindex), com HSTS e robots liberado.
test('produção: indexável, com HSTS e robots liberado', async ({ request, baseURL }) => {
  test.skip(!/(^|\.)raphaelsena\.com/.test(new URL(baseURL ?? 'http://x').hostname), 'só no domínio de produção');
  const h = (await request.get('/')).headers();
  expect(h['x-robots-tag'] ?? '').not.toMatch(/noindex/i);
  expect(h['strict-transport-security']).toMatch(/max-age=\d+/);
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toMatch(/Allow: \//);
  expect(robots).toMatch(/Sitemap: https:\/\/www\.raphaelsena\.com\/sitemap\.xml/);
});

// Só depois do cutover (G8): o apex deve responder com UM salto 301 para o www, preservando o caminho. SMOKE_APEX=https://raphaelsena.com
test('apex redireciona para o www com um único 301, preservando o caminho', async ({ request }) => {
  test.skip(!process.env.SMOKE_APEX, 'defina SMOKE_APEX (ex.: https://raphaelsena.com) para testar o redirect do apex');
  const apex = process.env.SMOKE_APEX!.replace(/\/$/, '');
  const r = await request.get(`${apex}/sobre/`, { maxRedirects: 0 });
  expect(r.status()).toBe(301);
  expect(r.headers()['location']).toBe('https://www.raphaelsena.com/sobre/');
  const http = await request.get(apex.replace('https://', 'http://') + '/', { maxRedirects: 0 });
  expect([301, 308]).toContain(http.status());
});
