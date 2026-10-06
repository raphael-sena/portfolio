import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('/design-system não tem violações serious ou critical (axe)', async ({ page }) => {
  await page.goto('/design-system/');
  const resultado = await new AxeBuilder({ page }).analyze();
  const graves = resultado.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
  expect(graves.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([]);
});

test('o link "Pular para o conteúdo" é o primeiro foco e leva ao main', async ({ page }) => {
  await page.goto('/design-system/');
  await page.keyboard.press('Tab');
  const pular = page.getByRole('link', { name: 'Pular para o conteúdo' });
  await expect(pular).toBeFocused();
  await expect(pular).toBeInViewport();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#conteudo$/);
});

test('foco por teclado visível nos itens do menu', async ({ page }) => {
  await page.goto('/design-system/');
  const sobre = page.getByRole('navigation', { name: 'Principal' }).getByRole('link', { name: 'Sobre' });
  await sobre.focus();
  await expect(sobre).toBeFocused();
  const outline = await sobre.evaluate(
    (el) => getComputedStyle(el).outlineStyle + ' ' + getComputedStyle(el).outlineWidth,
  );
  expect(outline).toBe('solid 3px');
});

test('MacViewer gira pelas setas do teclado e reinicia com Home', async ({ page }) => {
  await page.goto('/design-system/');
  const viewer = page.getByRole('group', { name: /Computador compacto em 3D/ });
  const area = viewer.locator('[tabindex="0"]');
  const angulo = () => viewer.locator('[aria-live="polite"]').textContent();
  expect(await angulo()).toContain('30 graus');
  await area.focus();
  await page.keyboard.press('ArrowRight');
  expect(await angulo()).toContain('75 graus');
  await page.keyboard.press('Home');
  expect(await angulo()).toContain('30 graus');
});
