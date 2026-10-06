import { defineConfig, devices } from '@playwright/test';

const porta = 8787;
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${porta}`;
const completa = process.env.PW_MATRIZ === 'completa';
const externo = Boolean(process.env.PLAYWRIGHT_BASE_URL);

export default defineConfig({
  testDir: './tests',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list']],
  use: { baseURL, trace: 'on-first-retry', video: 'retain-on-failure' },
  projects: [
    { name: 'seo', testDir: './tests/seo', use: { ...devices['Desktop Chrome'], javaScriptEnabled: false } },
    { name: 'e2e', testDir: './tests/e2e', use: { ...devices['Desktop Chrome'] } },
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
        command: `pnpm build && pnpm exec wrangler dev --ip 127.0.0.1 --port ${porta}`,
        url: `${baseURL}/api/health`,
        reuseExistingServer: !process.env.CI,
        timeout: 240_000,
      },
});
