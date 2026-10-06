// Lighthouse CI (mobile, simulação padrão de 4G) contra o build REAL servido pelo `wrangler dev`.
// O build do Lighthouse usa SITE_ENV=production: o noindex do preview faria o audit `is-crawlable` falhar de propósito.
// Orçamentos do BRIEF: Performance >= 95, Acessibilidade 100, SEO 100, Boas práticas >= 95; LCP < 2,0 s, CLS < 0,05.
const porta = 4330;
const base = `http://127.0.0.1:${porta}`;
const urls = [
  '/',
  '/sobre/',
  '/experiencia/',
  '/projetos/',
  '/tecnologias/',
  '/linha-do-tempo/',
  '/contato/',
  '/en/',
  '/en/projetos/',
  '/de/',
  '/de/contato/',
  '/privacidade/',
];

module.exports = {
  ci: {
    collect: {
      url: urls.map((u) => `${base}${u}`),
      numberOfRuns: process.env.CI ? 2 : 1,
      startServerCommand: `pnpm exec wrangler dev --ip 127.0.0.1 --port ${porta}`,
      startServerReadyPattern: 'Ready on',
      startServerReadyTimeout: 120000,
      settings: {
        // Chromium do Playwright no CI e localmente (CHROME_PATH); sem sandbox por causa dos contêineres de CI.
        chromeFlags: '--no-sandbox --headless=new',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 1 }],
        // Guarda de regressão no perfil "4G lento" do Lighthouse (1,6 Mbps, 150 ms), onde o LCP real fica em ~2,6-2,9 s.
        // O orçamento do BRIEF (LCP < 2,0 s em 4G) é conferido em tests/e2e/performance.spec.ts com um perfil 4G de verdade.
        'largest-contentful-paint': ['error', { maxNumericValue: 3300 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.05 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
      },
    },
    upload: { target: 'filesystem', outputDir: './lighthouse' },
  },
};
