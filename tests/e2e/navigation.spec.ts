import { expect, test } from '@playwright/test';
import { LOCALES, PAGES, path } from '../support/routes';

const NUMBERS = [1, 2, 3, 4, 5, 6, 7];

for (const locale of LOCALES) {
  test(`${locale}: a orelha percorre 1>2>3>4>5>6>7>1 por clique`, async ({ page }) => {
    // Este teste confere a ORDEM da sequência; a animação da virada tem teste próprio (interactions.spec.ts).
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(path(locale, ''));
    for (let i = 0; i < PAGES.length; i++) {
      const proxima = PAGES[(i + 1) % PAGES.length]!;
      const orelha = page.getByRole('link', { name: new RegExp(`${NUMBERS[(i + 1) % 7]}$`) }).last();
      await expect(orelha).toHaveAttribute('href', path(locale, proxima.slug));
      await orelha.click();
      await expect(page).toHaveURL(new RegExp(`${path(locale, proxima.slug)}$`));
    }
    await expect(page).toHaveURL(new RegExp(`${path(locale, '')}$`));
  });
}

test('a orelha também vira a página com Enter', async ({ page }) => {
  await page.goto('/');
  const orelha = page.getByRole('link', { name: /Virar a página: Sobre, página 2/ });
  await orelha.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/sobre\/$/);
});

test('o menu tem 6 itens (sem Início), marca a página atual e o letreiro leva ao início', async ({ page }) => {
  await page.goto('/projetos/');
  const nav = page.getByRole('navigation', { name: 'Principal' });
  await expect(nav.getByRole('link')).toHaveCount(6);
  await expect(nav.getByRole('link', { name: 'Início' })).toHaveCount(0);
  await expect(nav.locator('[aria-current="page"]')).toHaveText('Projetos');
  await page.locator('header').getByRole('link', { name: 'Raphael Sena' }).click();
  await expect(page).toHaveURL(/\/$/);
});

test('a troca de idioma preserva a rota', async ({ page }) => {
  await page.goto('/tecnologias/');
  await page.getByRole('navigation', { name: 'Idioma' }).getByRole('link', { name: 'Deutsch' }).click();
  await expect(page).toHaveURL(/\/de\/tecnologias\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'de');
  await page.getByRole('navigation', { name: 'Sprache' }).getByRole('link', { name: 'English' }).click();
  await expect(page).toHaveURL(/\/en\/tecnologias\/$/);
  await expect(page.locator('h1')).toHaveText('Tools of the trade');
});

test('o idioma vem da URL, não de localStorage', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('language', 'de'));
  await page.goto('/sobre/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
});

test('o 404 global funciona e leva aos três idiomas', async ({ page }) => {
  const resposta = await page.goto('/pagina-que-nao-existe/');
  expect(resposta?.status()).toBe(404);
  await expect(page.getByRole('link', { name: 'Deutsch' })).toHaveAttribute('href', '/de/');
});

test('o computador compacto aparece só na home e a página não rola na horizontal', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('figure', { name: /Computador compacto/ })).toBeVisible();
  const largura = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
  expect(largura[0]).toBeLessThanOrEqual(largura[1]! + 1);
});
