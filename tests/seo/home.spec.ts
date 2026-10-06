import { expect, test } from '@playwright/test';

// Projeto "seo": JavaScript DESLIGADO. O conteúdo e os metadados precisam estar no HTML.
test('home responde 200 com title, lang e um h1 sem JavaScript', async ({ page }) => {
  const resposta = await page.goto('/');
  expect(resposta?.status()).toBe(200);
  await expect(page).toHaveTitle(/Raphael Sena/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  await expect(page.locator('h1')).toHaveCount(1);
});

test('rota inexistente devolve 404 real com noindex', async ({ page }) => {
  const resposta = await page.goto('/nao-existe/');
  expect(resposta?.status()).toBe(404);
  await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(1);
});
