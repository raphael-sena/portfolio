import { expect, test } from '@playwright/test';

test('home responde 200 e tem title', async ({ page }) => {
  const resposta = await page.goto('/');
  expect(resposta?.status()).toBe(200);
  await expect(page).toHaveTitle(/Raphael Sena/);
});

test('sem erros no console', async ({ page }) => {
  const erros: string[] = [];
  page.on('console', (m) => m.type() === 'error' && erros.push(m.text()));
  page.on('pageerror', (e) => erros.push(e.message));
  await page.goto('/');
  expect(erros).toEqual([]);
});

test('/api/health responde ok pelo Worker', async ({ request }) => {
  const resposta = await request.get('/api/health');
  expect(resposta.status()).toBe(200);
  expect(await resposta.json()).toMatchObject({ status: 'ok' });
});

test('preview/workers.dev é noindex', async ({ request }) => {
  const resposta = await request.get('/');
  expect(resposta.headers()['x-robots-tag']).toContain('noindex');
});
