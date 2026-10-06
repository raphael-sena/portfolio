import { expect, test, type Page } from '@playwright/test';

// G4: orelha com arraste, virada de página por View Transitions e computador 3D sob demanda.

/** Conta chamadas a document.startViewTransition (o que prova que a virada animada foi usada). */
async function spyViewTransitions(page: Page) {
  await page.addInitScript(() => {
    const w = window as unknown as { __vt: number };
    w.__vt = 0;
    const original = document.startViewTransition?.bind(document);
    if (original) {
      document.startViewTransition = (cb?: () => void | Promise<void>) => {
        w.__vt++;
        return original(cb as () => Promise<void>);
      };
    }
  });
}
const viewTransitions = (page: Page) => page.evaluate(() => (window as unknown as { __vt: number }).__vt);

/** Arrasta a orelha na diagonal (para cima e para a esquerda) por `delta` px somados. */
async function arrastarOrelha(page: Page, delta: number, soltar = true) {
  const orelha = page.getByRole('link', { name: /Virar a página/ });
  await expect(orelha).toHaveAttribute('data-ready', 'true'); // hidratou
  await orelha.scrollIntoViewIfNeeded(); // fica no fim da folha, fora da primeira tela
  const caixa = (await orelha.boundingBox())!;
  const x0 = caixa.x + caixa.width - 12;
  const y0 = caixa.y + caixa.height - 12;
  await page.mouse.move(x0, y0);
  await page.mouse.down();
  await page.mouse.move(x0 - delta / 2, y0 - delta / 2, { steps: 8 });
  if (soltar) await page.mouse.up();
}

test('arrastar a orelha menos de 110px (dx+dy) e soltar faz o canto voltar (sem trocar de página)', async ({
  page,
}) => {
  await page.goto('/sobre/');
  const orelha = page.getByRole('link', { name: /Virar a página/ });
  await arrastarOrelha(page, 80, false);
  expect(Number(await orelha.getAttribute('data-ear-size'))).toBeGreaterThan(100); // o canto descolou
  await page.mouse.up();
  await expect(orelha).toHaveAttribute('data-ear-size', '44'); // voltou
  await expect(page).toHaveURL(/\/sobre\/$/);
});

test('arrastar a orelha 110px ou mais (dx+dy) e soltar completa a virada', async ({ page }) => {
  await spyViewTransitions(page);
  await page.goto('/sobre/');
  await arrastarOrelha(page, 170);
  await expect(page).toHaveURL(/\/experiencia\/$/, { timeout: 10_000 });
  await expect(page.locator('h1')).toHaveText('Experiência e formação');
});

test('a virada usa View Transitions, com a orelha e com o menu, entre rotas de idiomas diferentes', async ({
  page,
  browserName,
}) => {
  test.skip(browserName === 'firefox', 'o Firefox desta versão do Playwright não expõe startViewTransition');
  await spyViewTransitions(page);
  await page.goto('/');
  const suporta = await page.evaluate(() => typeof document.startViewTransition === 'function');
  test.skip(!suporta, 'sem suporte a View Transitions: troca imediata (coberto no teste de reduced-motion)');
  await page.getByRole('link', { name: /Virar a página: Sobre/ }).click();
  await expect(page).toHaveURL(/\/sobre\/$/);
  await page.getByRole('navigation', { name: 'Principal' }).getByRole('link', { name: 'Projetos' }).click();
  await expect(page).toHaveURL(/\/projetos\/$/);
  await page.getByRole('navigation', { name: 'Idioma' }).getByRole('link', { name: 'English' }).click();
  await expect(page).toHaveURL(/\/en\/projetos\/$/);
  expect(await viewTransitions(page)).toBe(3);
});

test('prefers-reduced-motion: troca imediata, sem View Transitions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await spyViewTransitions(page);
  await page.goto('/sobre/');
  await page.getByRole('link', { name: /Virar a página/ }).click();
  await expect(page).toHaveURL(/\/experiencia\/$/);
  expect(await viewTransitions(page)).toBe(0);
});

test('links de arquivo (PDF) e externos não passam pela virada', async ({ page }) => {
  await spyViewTransitions(page);
  await page.goto('/');
  await page.route('**/curriculo-raphael-sena.pdf', (r) =>
    r.fulfill({ status: 200, contentType: 'application/pdf', body: '%PDF-1.4' }),
  );
  await page.getByRole('link', { name: 'Baixar o currículo →' }).click();
  expect(await viewTransitions(page)).toBe(0);
});

test('a orelha é fixa no canto da tela no celular', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/sobre/');
  const orelha = page.getByRole('link', { name: /Virar a página/ });
  const posicao = await orelha.evaluate((el) => getComputedStyle(el).position);
  expect(posicao).toBe('fixed');
  const caixa = (await orelha.boundingBox())!;
  expect(caixa.x + caixa.width).toBeCloseTo(390, 0);
  expect(caixa.y + caixa.height).toBeCloseTo(844, 0);
});

test.describe('computador 3D', () => {
  const glb = '**/models/apple-ii-computer.glb';

  test('o three.js e o .glb só são pedidos quando o viewer entra na tela', async ({ page }) => {
    const pedidos: string[] = [];
    page.on('request', (r) => {
      if (r.url().endsWith('.glb')) pedidos.push(r.url());
    });
    const scripts: string[] = [];
    page.on('response', async (r) => {
      if (r.request().resourceType() === 'script') scripts.push(r.url());
    });
    await page.setViewportSize({ width: 1280, height: 700 });
    await page.goto('/design-system/'); // o viewer fica bem abaixo da dobra
    await page.waitForLoadState('networkidle');
    expect(pedidos).toEqual([]);
    const antes = scripts.length;
    const comThree = async () => {
      let achou = false;
      for (const url of scripts) {
        const texto = await (await page.request.get(url)).text();
        if (/MeshoptDecoder|GLTFLoader/.test(texto)) achou = true;
      }
      return achou;
    };
    expect(await comThree()).toBe(false);

    const quadro = page.locator('[data-renderer]').first();
    await quadro.scrollIntoViewIfNeeded();
    await expect(quadro).toHaveAttribute('data-renderer', /3d|cube/, { timeout: 45_000 });
    if ((await quadro.getAttribute('data-renderer')) === '3d') {
      expect(scripts.length).toBeGreaterThan(antes);
      expect(await comThree()).toBe(true);
      expect(pedidos.length).toBeGreaterThan(0);
    } else {
      // Sem WebGL neste navegador: o cubo CSS entra e o three.js e o .glb nunca são baixados.
      expect(await comThree()).toBe(false);
      expect(pedidos).toEqual([]);
    }
  });

  test('renderiza o modelo (3D) e as setas giram; sem .glb cai para o cubo', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'WebGL em software só é estável no Chromium do CI');
    await page.goto('/design-system/');
    const quadro = page.locator('[data-renderer]').first();
    await quadro.scrollIntoViewIfNeeded();
    await expect(quadro).toHaveAttribute('data-renderer', /3d|cube/, { timeout: 30_000 });
    const modo = await quadro.getAttribute('data-renderer');
    if (modo === '3d') await expect(page.getByTestId('mac-3d').locator('canvas')).toHaveCount(1);
    const angulo = () =>
      page
        .getByRole('figure', { name: /Computador compacto/ })
        .locator('[aria-live]')
        .textContent();
    await quadro.focus();
    await page.keyboard.press('ArrowRight');
    expect(await angulo()).toContain('75 graus');
    await page.getByRole('button', { name: 'Reiniciar' }).click();
    expect(await angulo()).toContain('30 graus');
  });

  test('fallback: se o .glb falhar, o viewer usa o cubo CSS', async ({ page }) => {
    await page.route(glb, (r) => r.abort());
    await page.goto('/design-system/');
    const quadro = page.locator('[data-renderer]').first();
    await quadro.scrollIntoViewIfNeeded();
    await expect(quadro).toHaveAttribute('data-renderer', 'cube', { timeout: 30_000 });
    await expect(page.getByRole('figure', { name: /Computador compacto/ })).toBeVisible();
  });

  test('o quadriculado gira junto com o modelo (setas) e o canvas não tem filtro de cinza', async ({
    page,
    browserName,
  }) => {
    await page.goto('/design-system/');
    const quadro = page.locator('[data-renderer]').first();
    await quadro.scrollIntoViewIfNeeded();
    await expect(quadro).toHaveAttribute('data-renderer', /3d|cube/, { timeout: 45_000 });
    const raios = page.getByTestId('mac-raios');
    const antes = await raios.evaluate((el) => getComputedStyle(el).transform);
    await quadro.focus();
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => raios.evaluate((el) => getComputedStyle(el).transform)).not.toBe(antes);
    if (browserName === 'chromium' && (await quadro.getAttribute('data-renderer')) === '3d') {
      expect(
        await page
          .getByTestId('mac-3d')
          .locator('canvas')
          .evaluate((c) => getComputedStyle(c).filter),
      ).toBe('none');
    }
  });

  test('a atribuição CC BY 4.0 do modelo está na página', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: '«Apple II Computer»' })).toHaveAttribute(
      'href',
      /sketchfab\.com\/3d-models\/apple-ii-computer/,
    );
    await expect(page.getByRole('link', { name: 'dark_igorek' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'CC BY 4.0' })).toHaveAttribute(
      'href',
      'https://creativecommons.org/licenses/by/4.0/',
    );
  });
});

test('orçamento: JS inicial de uma página sem o 3D fica abaixo de 150 KB gzip', async ({ page }) => {
  const { gzipSync } = await import('node:zlib');
  let total = 0;
  page.on('response', async (r) => {
    if (r.request().resourceType() !== 'script') return;
    try {
      total += gzipSync(await r.body()).length;
    } catch {
      /* resposta sem corpo */
    }
  });
  await page.goto('/sobre/');
  await page.waitForLoadState('networkidle');
  expect(total / 1024, `JS inicial: ${(total / 1024).toFixed(1)} KB gzip`).toBeLessThan(150);
});

test('a orelha não usa filter nem animação de width/height (causa do rastro no Safari) e a página de baixo é papel liso', async ({
  page,
}) => {
  await page.goto('/sobre/');
  const orelha = page.getByRole('link', { name: /Virar a página/ });
  await expect(orelha).toHaveAttribute('data-ready', 'true');
  const auditoria = await orelha.evaluate((link) => {
    const curl = link.previousElementSibling?.previousElementSibling as HTMLElement;
    const todos = [curl, ...curl.querySelectorAll<HTMLElement>('*')];
    return {
      comFilter: todos.filter((el) => getComputedStyle(el).filter !== 'none').length,
      comListras: todos.filter((el) => /repeating/.test(getComputedStyle(el).backgroundImage)).length,
      // Só transições com duração de verdade (o padrão `all 0s` não conta) em width, height ou all.
      transicoes: todos.filter((el) => {
        const e = getComputedStyle(el);
        return (
          /width|height|all/.test(e.transitionProperty) &&
          e.transitionDuration.split(',').some((d) => parseFloat(d) > 0)
        );
      }).length,
      z: getComputedStyle(curl).zIndex,
    };
  });
  expect(auditoria.comFilter).toBe(0);
  expect(auditoria.comListras).toBe(0);
  expect(auditoria.transicoes).toBe(0);
  expect(auditoria.z).toBe('2'); // abaixo da textura de papel (z-3): recebe o mesmo grão do jornal
});

for (const [locale, caminho] of [
  ['pt', '/'],
  ['en', '/en/'],
  ['de', '/de/'],
] as const) {
  for (const largura of [1280, 1024, 820]) {
    test(`o título da home não estoura a coluna (${locale}, ${largura}px)`, async ({ page }) => {
      await page.setViewportSize({ width: largura, height: 800 });
      await page.goto(caminho);
      const medidas = await page
        .locator('article h2')
        .first()
        .evaluate((h) => {
          const coluna = h.closest('article') as HTMLElement;
          return {
            cabe: h.scrollWidth <= h.clientWidth + 1,
            direita: h.getBoundingClientRect().right,
            limite: coluna.getBoundingClientRect().right,
          };
        });
      expect(medidas.cabe).toBe(true);
      expect(medidas.direita).toBeLessThanOrEqual(medidas.limite + 1);
    });
  }
}
