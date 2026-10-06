import { expect, test } from '@playwright/test';

// Orçamento do BRIEF (mobile, 4G): LCP < 2,0 s e CLS < 0,05. Perfil "4G regular" (9 Mbps, 170 ms) e CPU 4x mais lenta.
// O Lighthouse CI usa o perfil "4G lento" (1,6 Mbps) só como guarda de regressão das categorias.
test.skip(({ browserName }) => browserName !== 'chromium', 'emulação de rede e CPU via CDP só no Chromium');

const PAGINAS = ['/', '/sobre/', '/en/projetos/', '/de/contato/'];

for (const rota of PAGINAS) {
  test(`LCP < 2,0 s e CLS < 0,05 em ${rota} (celular, 4G)`, async ({ page }) => {
    await page.setViewportSize({ width: 412, height: 823 });
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 170,
      downloadThroughput: (9 * 1024 * 1024) / 8,
      uploadThroughput: (9 * 1024 * 1024) / 8,
    });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: process.env.CI ? 2 : 4 });

    await page.addInitScript(() => {
      const w = window as unknown as { __lcp: number; __cls: number };
      w.__lcp = 0;
      w.__cls = 0;
      new PerformanceObserver((lista) => {
        for (const e of lista.getEntries()) w.__lcp = e.startTime;
      }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver((lista) => {
        for (const e of lista.getEntries() as unknown as Array<{ value: number; hadRecentInput: boolean }>) {
          if (!e.hadRecentInput) w.__cls += e.value;
        }
      }).observe({ type: 'layout-shift', buffered: true });
    });

    await page.goto(rota, { waitUntil: 'load' });
    await page.waitForTimeout(1500);
    const { lcp, cls } = await page.evaluate(() => {
      const w = window as unknown as { __lcp: number; __cls: number };
      return { lcp: w.__lcp, cls: w.__cls };
    });
    test
      .info()
      .annotations.push(
        { type: 'LCP', description: `${Math.round(lcp)} ms` },
        { type: 'CLS', description: cls.toFixed(4) },
      );
    expect(lcp, `LCP ${Math.round(lcp)} ms`).toBeGreaterThan(0);
    expect(lcp, `LCP ${Math.round(lcp)} ms`).toBeLessThan(2000);
    expect(cls, `CLS ${cls.toFixed(4)}`).toBeLessThan(0.05);
  });
}
