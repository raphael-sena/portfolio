import { expect, test } from '@playwright/test';
import { HTML_LANG, INDEXABLE, LOCALES, SITE, path } from '../support/routes';

// Projeto "seo": JavaScript DESLIGADO. Tudo precisa estar no HTML servido.
const vistos = { titles: new Map<string, string>(), descriptions: new Map<string, string>() };

for (const rota of INDEXABLE) {
  test.describe(`${rota.locale} ${rota.path}`, () => {
    test('200, lang, um h1, landmarks, title e description únicos', async ({ page }) => {
      const resposta = await page.goto(rota.path);
      expect(resposta?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', HTML_LANG[rota.locale]);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('header')).toHaveCount(1);
      await expect(page.getByRole('navigation').first()).toBeVisible();
      await expect(page.locator('main')).toHaveCount(1);
      await expect(page.locator('footer')).toHaveCount(1);

      const title = await page.title();
      const description = (await page.locator('meta[name="description"]').getAttribute('content')) ?? '';
      expect(title.length).toBeGreaterThan(0);
      expect(title.length).toBeLessThanOrEqual(60);
      expect(description.length).toBeGreaterThan(0);
      expect(description.length).toBeLessThanOrEqual(155);
      expect(`${title} ${description}`).not.toMatch(/\[[^\]]*\]/);

      const chave = `${rota.locale}:${title}`;
      const outro = vistos.titles.get(chave);
      expect(outro === undefined || outro === rota.path, `title duplicado: ${title}`).toBe(true);
      vistos.titles.set(chave, rota.path);
      const dChave = `${rota.locale}:${description}`;
      const dOutro = vistos.descriptions.get(dChave);
      expect(dOutro === undefined || dOutro === rota.path, `description duplicada em ${rota.path}`).toBe(true);
      vistos.descriptions.set(dChave, rota.path);
    });

    test('canonical é a própria URL; hreflang recíproco com x-default em /en/; sem noindex', async ({
      page,
      request,
    }) => {
      await page.goto(rota.path);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${SITE}${rota.path}`);
      await expect(page.locator('meta[name="robots"]')).toHaveCount(0);

      const alternates = await page
        .locator('link[rel="alternate"][hreflang]')
        .evaluateAll((els) => els.map((e) => [e.getAttribute('hreflang'), e.getAttribute('href')] as const));
      const mapa = Object.fromEntries(alternates);
      for (const l of LOCALES) expect(mapa[HTML_LANG[l]]).toBe(`${SITE}${path(l, rota.slug)}`);
      expect(mapa['x-default']).toBe(`${SITE}${path('en', rota.slug)}`);

      // Reciprocidade: cada alternativa aponta de volta para esta página.
      for (const l of LOCALES) {
        if (l === rota.locale) continue;
        const html = await (await request.get(path(l, rota.slug))).text();
        expect(html, `${path(l, rota.slug)} deve listar ${rota.path}`).toContain(`${SITE}${rota.path}`);
      }
    });

    test('Open Graph e Twitter básicos', async ({ page }) => {
      await page.goto(rota.path);
      await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:description"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', `${SITE}${rota.path}`);
      await expect(page.locator('meta[property="og:locale"]')).toHaveCount(1);
      await expect(page.locator('meta[name="twitter:card"]')).toHaveCount(1);
    });

    test('links internos não estão quebrados', async ({ page, request }) => {
      await page.goto(rota.path);
      const hrefs = await page
        .locator('a[href^="/"]')
        .evaluateAll((els) => [...new Set(els.map((e) => e.getAttribute('href') as string))]);
      for (const href of hrefs) {
        const r = await request.get(href, { maxRedirects: 0 });
        expect(r.status(), `${href} em ${rota.path}`).toBe(200);
      }
    });
  });
}

test('privacidade, 404 e guia de estilo', async ({ page, request }) => {
  const guia = await request.get('/design-system/');
  expect(guia.status()).toBe(200);
  expect(guia.headers()['x-robots-tag']).toContain('noindex');

  const resposta = await page.goto('/nao-existe/');
  expect(resposta?.status()).toBe(404);
  await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveCount(1);
  expect((await request.get('/en/sobre/')).status()).toBe(200);
  expect((await request.get('/en/about/')).status()).toBe(404);
});

test('os currículos respondem e as URLs antigas redirecionam com 1 salto 301', async ({ request }) => {
  for (const arquivo of ['/curriculo-raphael-sena.pdf', '/resume-raphael-sena.pdf']) {
    const r = await request.get(arquivo);
    expect(r.status()).toBe(200);
    expect(r.headers()['content-type']).toContain('pdf');
  }
  const antigos: Array<[string, string]> = [
    ['/Resume_Raphael_Sena.pdf', '/resume-raphael-sena.pdf'],
    ['/Curr%C3%ADculo_Raphael_Sena.pdf', '/curriculo-raphael-sena.pdf'],
  ];
  for (const [de, para] of antigos) {
    const r = await request.get(de, { maxRedirects: 0 });
    expect(r.status()).toBe(301);
    expect(new URL(r.headers()['location'] ?? '', 'http://x').pathname).toBe(para);
  }
});
