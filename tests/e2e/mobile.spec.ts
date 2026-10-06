import { expect, test } from '@playwright/test';

// Mobile (< 768 px): faixa superior com menu <details>, barra inferior "N de 7", home enxuta e sem three.js.
test.use({ viewport: { width: 390, height: 844 } });

test('home: faixa superior, sem menu horizontal, sem rolagem lateral e o 3D também gira no celular', async ({
  page,
}) => {
  await page.goto('/');
  await expect(
    page.getByRole('button', { name: 'Menu de seções' }).or(page.locator('summary[aria-label="Menu de seções"]')),
  ).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Principal' })).toBeHidden();
  await expect(page.locator('h1')).toHaveText('Raphael Sena');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  // O 3D (ou o cubo CSS, sem WebGL) carrega depois do load, com o navegador ocioso.
  await expect(page.locator('[data-renderer]')).toHaveAttribute('data-renderer', /3d|cube/, { timeout: 45_000 });
  await expect(page.getByRole('link', { name: /Quem escreve esta gazeta/ })).toBeVisible();
});

test('menu lista as 7 seções, marca a atual e fecha ao navegar', async ({ page }) => {
  await page.goto('/projetos/');
  const menu = page.locator('details:has(summary[aria-label="Menu de seções"])');
  await page.locator('summary[aria-label="Menu de seções"]').click();
  await expect(menu).toHaveAttribute('open', '');
  const nav = page.getByRole('navigation', { name: 'Seções' }).first();
  await expect(nav.getByRole('link')).toHaveCount(7 + 2);
  await expect(nav.locator('[aria-current="page"]').first()).toContainText('Projetos');
  await nav.getByRole('link', { name: /Tecnologias/ }).click();
  await expect(page).toHaveURL(/\/tecnologias\/$/);
  await expect(menu).not.toHaveAttribute('open', '');
});

test('barra inferior: anterior / N de 7 / próxima, com volta do 7 ao 1', async ({ page }) => {
  await page.goto('/');
  const tabs = page.getByRole('navigation', { name: 'Seções' }).last();
  await expect(tabs).toContainText('1 de 7');
  await tabs.getByRole('link', { name: /Próxima página: Sobre/ }).click();
  await expect(page).toHaveURL(/\/sobre\/$/);
  await expect(page.getByRole('navigation', { name: 'Seções' }).last()).toContainText('2 de 7');
  await page.goto('/contato/');
  await page
    .getByRole('navigation', { name: 'Seções' })
    .last()
    .getByRole('link', { name: /Próxima página: Início/ })
    .click();
  await expect(page).toHaveURL(/\/$/);
});

test('o idioma é trocado pelo menu e preserva a rota', async ({ page }) => {
  await page.goto('/tecnologias/');
  await page.locator('summary[aria-label="Menu de seções"]').click();
  await page.getByRole('link', { name: 'Deutsch' }).click();
  await expect(page).toHaveURL(/\/de\/tecnologias\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'de');
  await expect(page.locator('summary[aria-label="Abschnittsmenü"]')).toBeVisible();
});
