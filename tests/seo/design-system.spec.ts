import { expect, test } from '@playwright/test';

// Sem JavaScript: a página de revisão é noindex e tem um único h1.
test('/design-system é noindex, responde 200 e tem um h1', async ({ page, request }) => {
  const resposta = await page.goto('/design-system/');
  expect(resposta?.status()).toBe(200);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await expect(page.locator('h1')).toHaveCount(1);
  expect((await request.get('/design-system/')).headers()['x-robots-tag']).toContain('noindex');
});
