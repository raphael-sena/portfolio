import { defineConfig, devices } from '@playwright/test';

const porta = 8787;
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${porta}`;
const completa = process.env.PW_MATRIZ === 'completa';
const externo = Boolean(process.env.PLAYWRIGHT_BASE_URL);

export default defineConfig({
  testDir: './tests',
  // O runner do CI (2 vCPU, WebGL em software) é bem mais lento que um laptop: folgas só no CI.
  timeout: process.env.CI ? 60_000 : 30_000,
  expect: { timeout: process.env.CI ? 15_000 : 5_000 },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list']],
  use: { baseURL, trace: 'on-first-retry', video: 'retain-on-failure' },
  projects: [
    { name: 'seo', testDir: './tests/seo', use: { ...devices['Desktop Chrome'], javaScriptEnabled: false } },
    { name: 'e2e', testDir: './tests/e2e', use: { ...devices['Desktop Chrome'] } },
    // Sobe o próprio wrangler dev + Umami falso (tests/umami/fixtures.ts); precisa do build em out/.
    { name: 'umami', testDir: './tests/umami', use: { ...devices['Desktop Chrome'] } },
    // Smoke somente leitura; também roda contra o site publicado (PLAYWRIGHT_BASE_URL).
    { name: 'publicado', testDir: './tests/publicado', use: { ...devices['Desktop Chrome'] } },
    { name: 'a11y', testDir: './tests/a11y', use: { ...devices['Desktop Chrome'] } },
    ...(completa
      ? [
          { name: 'firefox', testDir: './tests/e2e', use: { ...devices['Desktop Firefox'] } },
          { name: 'webkit', testDir: './tests/e2e', use: { ...devices['Desktop Safari'] } },
          { name: 'pixel', testDir: './tests/e2e', use: { ...devices['Pixel 7'] } },
          { name: 'iphone', testDir: './tests/e2e', use: { ...devices['iPhone 14'] } },
        ]
      : []),
  ],
  // Contra o build real servido pelo wrangler dev (mesmo runtime da Cloudflare), nunca `next dev`.
  webServer: externo
    ? undefined
    : {
        // O id de teste habilita o <UmamiScript /> no build; nenhum Umami real é contatado (UMAMI_HOST fica vazio).
        command: `NEXT_PUBLIC_UMAMI_WEBSITE_ID=00000000-0000-4000-8000-000000000001 pnpm build && pnpm exec wrangler dev --ip 127.0.0.1 --port ${porta}`,
        url: `${baseURL}/api/health`,
        reuseExistingServer: !process.env.CI,
        timeout: 240_000,
      },
});
