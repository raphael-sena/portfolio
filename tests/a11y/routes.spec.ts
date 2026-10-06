import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { INDEXABLE } from '../support/routes';

for (const rota of INDEXABLE) {
  test(`axe: ${rota.locale} ${rota.path} sem violações serious ou critical`, async ({ page }) => {
    await page.goto(rota.path);
    const resultado = await new AxeBuilder({ page }).analyze();
    const graves = resultado.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(graves.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([]);
  });
}

test('foco por teclado: skip link primeiro; a orelha tem contorno visível', async ({ page }) => {
  await page.goto('/sobre/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused();
  const orelha = page.getByRole('link', { name: /Virar a página/ });
  await orelha.focus();
  const contorno = await orelha.evaluate((el) => getComputedStyle(el).outlineStyle);
  expect(contorno).toBe('solid');
});
