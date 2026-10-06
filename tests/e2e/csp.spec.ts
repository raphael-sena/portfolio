import { expect, test } from '@playwright/test';
import { INDEXABLE } from '../support/routes';

// A CSP está em Report-Only: antes de promovê-la, nenhuma página (nem o 3D) pode gerar violação.
test.skip(({ browserName }) => browserName !== 'chromium', 'securitypolicyviolation confiável só no Chromium');

for (const rota of [...INDEXABLE.filter((r) => r.locale === 'pt' || r.slug === ''), { path: '/design-system/' }]) {
  test(`sem violações de CSP em ${rota.path}`, async ({ page }) => {
    await page.addInitScript(() => {
      const w = window as unknown as { __csp: string[] };
      w.__csp = [];
      document.addEventListener('securitypolicyviolation', (e) => {
        w.__csp.push(`${e.violatedDirective} ${e.blockedURI} ${e.sample ?? ''}`.slice(0, 200));
      });
    });
    await page.goto(rota.path);
    const viewer = page.locator('[data-renderer]').first();
    if ((await viewer.count()) > 0) {
      await viewer.scrollIntoViewIfNeeded();
      await expect(viewer).toHaveAttribute('data-renderer', /3d|cube/, { timeout: 45_000 });
    }
    await page.waitForLoadState('networkidle');
    expect(await page.evaluate(() => (window as unknown as { __csp: string[] }).__csp)).toEqual([]);
  });
}
