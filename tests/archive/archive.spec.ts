import { readFileSync, readdirSync } from 'node:fs';
import { expect, test } from '@playwright/test';

// Versões antigas do portfólio em /<ano>/, construídas a partir das tags site/<ANO> (scripts/build-archives.ts).
const entradas: Array<{ year: number; tag: string; basePath: string; archived: boolean }> = JSON.parse(
  readFileSync(new URL('../../src/content/data/archives.json', import.meta.url), 'utf8'),
);
const anos = entradas.filter((e) => e.archived);
const listadas = anos.filter((e) => (e as { timeline?: boolean }).timeline !== false); // cartões da linha do tempo

test('há versões arquivadas e todas vêm de uma tag site/<ANO>', () => {
  expect(anos.length).toBeGreaterThanOrEqual(3);
  for (const e of anos) {
    expect(e.tag).toBe(`site/${e.year}`);
    expect(e.basePath).toBe(`/${e.year}`);
  }
});

for (const { year } of anos) {
  test.describe(`/${year}/`, () => {
    test('responde 200 e é noindex (cabeçalho e meta), fora do sitemap e sem canonical para a home', async ({ page, request }) => {
      const resposta = await page.goto(`/${year}/`);
      expect(resposta?.status()).toBe(200);
      expect(resposta?.headers()['x-robots-tag']).toContain('noindex');
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
      const sitemap = await (await request.get('/sitemap.xml')).text();
      expect(sitemap).not.toContain(`/${year}/`);
    });

    test('todos os recursos do próprio site carregam (sem 404) e nenhuma analytics antiga é chamada', async ({ page, baseURL }) => {
      const origem = new URL(baseURL ?? 'http://127.0.0.1:8787').origin;
      const quebrados: string[] = [];
      const proibidos: string[] = [];
      page.on('response', (r) => {
        const url = new URL(r.url());
        if (url.origin === origem && r.status() >= 400) quebrados.push(`${r.status()} ${url.pathname}`);
      });
      page.on('request', (r) => {
        if (/_vercel|clarity\.ms|vitals\.vercel|umami|\/stats\//.test(r.url())) proibidos.push(r.url());
      });
      // Nada de terceiros (GitHub, Chess.com, Spotify...) nos testes: o resultado não pode depender deles.
      await page.route((url) => url.origin !== origem, (rota) => rota.abort());
      await page.goto(`/${year}/`, { waitUntil: 'load' });
      await page.waitForTimeout(2500);
      expect(quebrados).toEqual([]);
      expect(proibidos).toEqual([]);
    });

    test('as imagens da página carregam e o link de volta leva à edição atual', async ({ page }) => {
      await page.route((url) => !/^(127\.0\.0\.1|localhost)$/.test(url.hostname), (rota) => rota.abort());
      await page.goto(`/${year}/`, { waitUntil: 'load' });
      const voltar = page.getByRole('link', { name: 'Voltar à edição atual' });
      await expect(voltar).toBeVisible({ timeout: 10_000 });
      await expect(page.locator('#gazeta-voltar')).toContainText(String(year));
      // Imagens com loading="lazy" podem não ter baixado ainda: confere cada src direto no servidor.
      const fontes = await page.locator('img[src^="/"]').evaluateAll((els) => [...new Set(els.map((e) => e.getAttribute('src') as string))]);
      expect(fontes.length).toBeGreaterThan(0);
      for (const src of fontes) {
        const r = await page.request.get(src.split('?')[0]!);
        expect(r.status(), src).toBe(200);
        expect(r.headers()['content-type'], src).toMatch(/^image\//);
        expect(src, 'imagem fora do basePath da versão').toMatch(new RegExp(`^/(${year}|_next|models|timeline)/|^/favicon`));
      }
      await voltar.click();
      await expect(page).toHaveURL(/\/$/);
      await expect(page.locator('h1')).toHaveText('Raphael Sena');
    });

    test('os PDFs do currículo da época abrem sob /<ano>/ (inclusive nomes com acento e espaço)', async ({ request }) => {
      const pasta = new URL(`../../archive/${year}/`, import.meta.url);
      const pdfs = readdirSync(pasta).filter((n) => n.toLowerCase().endsWith('.pdf'));
      expect(pdfs.length).toBeGreaterThan(0);
      for (const nome of pdfs) {
        const r = await request.get(`/${year}/${encodeURIComponent(nome)}`);
        expect(r.status(), nome).toBe(200);
        expect(r.headers()['content-type']).toContain('pdf');
      }
    });
  });
}

test('/linha-do-tempo/ lista as versões arquivadas com link para /<ano>/ e capturas reais', async ({ page }) => {
  await page.goto('/linha-do-tempo/');
  for (const { year } of listadas) {
    await expect(page.getByRole('link', { name: `Abrir /${year}` })).toHaveAttribute('href', `/${year}/`);
    const captura = page.locator(`img[alt*="${year}"]`).first();
    await expect(captura).toHaveAttribute('src', `/timeline/${year}.jpg`); // a imagem entra depois do load
  }
  await expect(page.getByText('Em breve')).toHaveCount(0);
  for (const img of await page.locator('img[src^="/timeline/"]').all()) {
    await img.scrollIntoViewIfNeeded();
    expect(await img.evaluate((e) => (e as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
});
