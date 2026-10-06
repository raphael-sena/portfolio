import { expect, test } from '@playwright/test';
import { INDEXABLE, SITE } from '../support/routes';

// Projeto "seo": JavaScript DESLIGADO.

test('robots.txt responde, é válido e combina com o ambiente', async ({ request }) => {
  const r = await request.get('/robots.txt');
  expect(r.status()).toBe(200);
  expect(r.headers()['content-type']).toContain('text/plain');
  const corpo = await r.text();
  expect(corpo).toMatch(/^User-Agent: \*$/im);
  if (/^Disallow: \/$/im.test(corpo)) {
    // Preview (workers.dev): fechado, e o noindex vem junto nos cabeçalhos.
    expect((await request.get('/')).headers()['x-robots-tag']).toContain('noindex');
  } else {
    expect(corpo).toContain(`Sitemap: ${SITE}/sitemap.xml`);
  }
});

test('sitemap.xml é válido, só lista páginas indexáveis e todas respondem 200', async ({ request }) => {
  const r = await request.get('/sitemap.xml');
  expect(r.status()).toBe(200);
  expect(r.headers()['content-type']).toContain('xml');
  const xml = await r.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]!);
  expect(urls).toHaveLength(INDEXABLE.length);
  expect(new Set(urls).size).toBe(urls.length);
  for (const rota of INDEXABLE) expect(urls).toContain(`${SITE}${rota.path}`);
  expect(xml).not.toContain('design-system');
  expect(xml).not.toMatch(/\/20(24|25|26)\//); // versões antigas ficam fora
  // Cada <url> traz os 3 idiomas e o x-default.
  const blocos = xml.split('<url>').slice(1);
  for (const bloco of blocos) {
    for (const lang of ['pt-BR', 'en', 'de', 'x-default']) expect(bloco).toContain(`hreflang="${lang}"`);
  }
  for (const url of urls) {
    const resposta = await request.get(url.replace(SITE, ''), { maxRedirects: 0 });
    expect(resposta.status(), url).toBe(200);
  }
});

for (const rota of INDEXABLE) {
  test(`${rota.locale} ${rota.path}: imagem OG 1200x630 e JSON-LD válido`, async ({ page, request }) => {
    await page.goto(rota.path);
    const og = (await page.locator('meta[property="og:image"]').getAttribute('content')) ?? '';
    expect(og).toMatch(new RegExp(`^${SITE}/og/${rota.locale}/[a-z]+\\.png$`));
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content', '1200');
    await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute('content', '630');
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveCount(1);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', og);

    const imagem = await request.get(og.replace(SITE, ''));
    expect(imagem.status()).toBe(200);
    expect(imagem.headers()['content-type']).toBe('image/png');
    const bytes = await imagem.body();
    expect(bytes.readUInt32BE(16)).toBe(1200);
    expect(bytes.readUInt32BE(20)).toBe(630);

    const blocos = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(blocos).toHaveLength(1);
    const dados = JSON.parse(blocos[0]!);
    expect(dados['@context']).toBe('https://schema.org');
    const grafo: Array<Record<string, unknown>> = dados['@graph'];
    const tipos = grafo.map((n) => n['@type']);
    expect(tipos).toEqual(['Person', 'WebSite', 'BreadcrumbList']);
    const pessoa = grafo[0]!;
    expect(pessoa.name).toBe('Raphael Sena');
    expect(pessoa.url).toBe(`${SITE}/`);
    expect(pessoa.sameAs).toEqual(['https://github.com/raphael-sena', 'https://www.linkedin.com/in/raphael-sena/']);
    expect(pessoa.alumniOf).toMatchObject({ name: 'PUC Minas' });
    expect(String(pessoa.jobTitle).length).toBeGreaterThan(0);
    const site = grafo[1]!;
    expect(site.inLanguage).toBe({ pt: 'pt-BR', en: 'en', de: 'de' }[rota.locale]);
    const trilha = (grafo[2]!.itemListElement as Array<{ position: number; item: string }>) ?? [];
    expect(trilha.at(-1)!.item).toBe(`${SITE}${rota.path}`);
    expect(trilha.map((i) => i.position)).toEqual(trilha.map((_, i) => i + 1));
  });
}

test('cabeçalhos de segurança e de cache', async ({ request, page }) => {
  const r = await request.get('/sobre/');
  const h = r.headers();
  expect(h['x-content-type-options']).toBe('nosniff');
  expect(h['referrer-policy']).toBe('strict-origin-when-cross-origin');
  expect(h['x-frame-options']).toBe('DENY');
  expect(h['permissions-policy']).toContain('camera=()');
  expect(h['cross-origin-opener-policy']).toBe('same-origin');
  const politica = h['content-security-policy-report-only'] ?? '';
  expect(politica).toContain("default-src 'self'");
  expect(politica).toContain("object-src 'none'");
  expect(politica).toMatch(/'sha256-/);
  expect(politica).toContain('report-uri /api/csp-report');
  expect(politica).toContain('report-to csp');
  expect(h['reporting-endpoints']).toContain('/api/csp-report');
  expect(h['content-security-policy']).toBeUndefined(); // Report-Only até os testes liberarem a promoção
  expect((await request.post('/api/csp-report', { data: '{}' })).status()).toBe(204);

  await page.goto('/sobre/');
  const chunk = (await page.locator('script[src^="/_next/static/"]').first().getAttribute('src'))!;
  expect((await request.get(chunk)).headers()['cache-control']).toContain('immutable');
  expect((await request.get('/models/apple-ii-computer.glb')).headers()['cache-control']).toContain('max-age=86400');
});
