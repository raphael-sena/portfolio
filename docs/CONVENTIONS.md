# CONVENTIONS: o que repetir do Confere Nota

Referência (somente leitura): `/Users/raphaelsena/Desktop/validador/validator-ibs-cbs` (Astro). Fonte: subagente B do G0. Nenhum .env foi lido. Onde conflitar com o BRIEF, vale o BRIEF. Legenda: ADOTAR, ADAPTAR (para Next + Cloudflare + pnpm), DESCARTAR.

## Pastas e aliases

| Item                                                                 | Decisão   | Motivo                                                                  |
| -------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------- |
| `src/components/{site,ui}`, `lib/`, `config/`, `content/`, `styles/` | ADAPTAR   | Manter; `layouts/` e `pages/` viram `app/`.                             |
| `src/engine`, `rules/`, `amostras/`                                  | DESCARTAR | Domínio fiscal.                                                         |
| `e2e/` (Playwright, `setup.ts`, `apoio.ts`) e `test/` (Vitest)       | ADOTAR    | Separados de `src/`. O BRIEF usa `tests/<suíte>`: decidir nome no PLAN. |
| `scripts/*.mjs` (`gerar-headers`, `gerar-og`)                        | ADAPTAR   | Pasta mantida; `_headers` pós-build é útil.                             |
| `docs/` por tema (deploy, handoff, umami)                            | ADOTAR    | Linkadas do README.                                                     |
| Alias `@/*` para `./src/*`                                           | ADOTAR    | Só em `tsconfig` (`paths`).                                             |

## TypeScript

| Item                             | Decisão   | Motivo                                                       |
| -------------------------------- | --------- | ------------------------------------------------------------ |
| `extends astro/tsconfigs/strict` | ADAPTAR   | `strict: true` + `noUncheckedIndexedAccess` + plugin `next`. |
| `jsx`, `include`, `exclude`      | ADAPTAR   | Next usa `jsx: preserve`; excluir `out/` e `.next/`.         |
| `astro check`                    | ADAPTAR   | Vira `tsc --noEmit` (`typecheck`).                           |
| Pin TypeScript 6.0.3             | DESCARTAR | Reavaliar conforme `eslint-config-next` e typescript-eslint. |

## Lint e formatação

| Item                                                                                             | Decisão   | Motivo                                                                                                                                     |
| ------------------------------------------------------------------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| ESLint flat config: `@eslint/js` + `typescript-eslint` recommended + `react-hooks`               | ADOTAR    | Mesmo núcleo.                                                                                                                              |
| `eslint-plugin-astro`                                                                            | DESCARTAR | Troca por `eslint-config-next`.                                                                                                            |
| `ignores`                                                                                        | ADAPTAR   | `out/` e `.next/` no lugar de `dist/` e `.astro/`; manter `.wrangler`, `lighthouse`, `.lighthouseci`, `test-results`, `playwright-report`. |
| `no-restricted-globals` (fetch, XHR, sendBeacon)                                                 | DESCARTAR | O portfólio usa Umami e Worker; privacidade fiscal não se aplica.                                                                          |
| Prettier: `singleQuote`, `printWidth: 120`, `prettier-plugin-tailwindcss` (`tailwindStylesheet`) | ADOTAR    | Ajustar o caminho do CSS (`app/globals.css`).                                                                                              |
| `prettier-plugin-astro`                                                                          | DESCARTAR | Sem Astro.                                                                                                                                 |
| `.editorconfig`, `.prettierignore`                                                               | ADOTAR    | Incluir `out/`, `.next/`, `pnpm-lock.yaml`.                                                                                                |
| `lint` = `eslint . && prettier --check .`; `format` = `prettier --write .`                       | ADOTAR    | Um comando no CI.                                                                                                                          |

## Testes

| Item                                                                                             | Decisão   | Motivo                                                     |
| ------------------------------------------------------------------------------------------------ | --------- | ---------------------------------------------------------- |
| Vitest (`test/**/*.test.ts`, ambiente node)                                                      | ADAPTAR   | `defineConfig` do vitest; alias via `vite-tsconfig-paths`. |
| Testes de config (headers, wrangler, páginas)                                                    | ADOTAR    | Pegam regressão de CSP/headers/`wrangler.jsonc`.           |
| Playwright: `forbidOnly`, `retries` só no CI, reporter `github`, `trace: on-first-retry`         | ADOTAR    |                                                            |
| `webServer`: build + `wrangler dev` (`pnpm exec`)                                                | ADAPTAR   | Fiel ao runtime; nunca `next dev`.                         |
| Matriz completa via `PW_MATRIZ=completa`; projetos chromium, firefox, webkit, Pixel 7, iPhone 14 | ADOTAR    | Casa com o BRIEF.                                          |
| `@axe-core/playwright`                                                                           | ADOTAR    | Meta a11y.                                                 |
| Projeto `publicado` + `URL_PUBLICADA` (smoke pós-deploy)                                         | ADOTAR    | Sem segredos.                                              |
| Specs de NF-e, fixtures, bench                                                                   | DESCARTAR | Domínio.                                                   |

## Scripts (pnpm)

| Item                                                                                                      | Decisão | Motivo                                          |
| --------------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------------- |
| `dev`, `build`, `lint`, `format`, `test`, `test:watch`, `test:e2e`, `test:e2e:completo`, `test:publicado` | ADOTAR  | `build` = `next build` + geração de `_headers`. |
| `check`                                                                                                   | ADAPTAR | Vira `typecheck`.                               |
| `preview`                                                                                                 | ADAPTAR | `wrangler dev` sobre `out/`.                    |
| `deploy` = `wrangler deploy`                                                                              | ADOTAR  | Só emergência.                                  |
| `og`                                                                                                      | ADAPTAR | BRIEF pede satori no build.                     |
| `engines.node >=24`, `.nvmrc`, `packageManager`                                                           | ADOTAR  |                                                 |

## CI

| Item                                                                                                                                        | Decisão | Motivo                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------- |
| Gatilhos `pull_request` e `push` main; `permissions: contents: read`; `concurrency` cancelando; `checkout` com `persist-credentials: false` | ADOTAR  |                                                         |
| `setup-node` + `npm ci`                                                                                                                     | ADAPTAR | `pnpm/action-setup` + `pnpm install --frozen-lockfile`. |
| Job verificar: lint, typecheck, test, build, `wrangler deploy --dry-run`                                                                    | ADOTAR  |                                                         |
| Job e2e em matriz; cache do Playwright; artefatos 7 dias em falha                                                                           | ADOTAR  |                                                         |
| Job Lighthouse só em PR para main, `@lhci/cli@0.15.1` fora do lockfile (`pnpm dlx`)                                                         | ADOTAR  |                                                         |
| `publicado.yml` (manual + cron diário)                                                                                                      | ADOTAR  | Casa com o smoke diário do BRIEF.                       |

## Hooks e commits

| Item                                                                   | Decisão   | Motivo                                                                                        |
| ---------------------------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------- |
| husky, lefthook, lint-staged                                           | DESCARTAR | O Confere Nota não usa. O BRIEF cita "hooks": decisão nova (propor lefthook ou nada no PLAN). |
| Conventional Commits em PT-BR com escopo (`feat(marca):`, `fix(e2e):`) | ADOTAR    | Padrão real do git log.                                                                       |
| Branches curtas e PR por etapa                                         | ADOTAR    | O BRIEF define `gN-nome`.                                                                     |
| commitlint                                                             | DESCARTAR | Só por disciplina.                                                                            |

## Variáveis de ambiente (nomes)

| Item                                        | Decisão | Motivo                                                                      |
| ------------------------------------------- | ------- | --------------------------------------------------------------------------- |
| `SITE_URL`                                  | ADAPTAR | Vira `NEXT_PUBLIC_SITE_URL` ou só de build.                                 |
| `WORKERS_CI_BRANCH` (preview = noindex)     | ADOTAR  | Evita indexar preview/workers.dev.                                          |
| `URL_PUBLICADA`, `PW_MATRIZ`, `CHROME_PATH` | ADOTAR  |                                                                             |
| `UMAMI_HOST`, `UMAMI_WEBSITE_ID`            | ADAPTAR | BRIEF usa `UMAMI_HOST` (secret do Worker) e `NEXT_PUBLIC_UMAMI_WEBSITE_ID`. |
| `.env*` no `.gitignore`                     | ADOTAR  | O BRIEF usa `.dev.vars`.                                                    |

## README e CLAUDE.md

| Item                                                                                                                                                                                                                             | Decisão   | Motivo                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------------------------- |
| Seções: sumário, arquitetura, estrutura, desenvolvimento, variáveis, versões fixadas, testes, CI/CD, docs, limitações                                                                                                            | ADOTAR    | Remover as de domínio fiscal. |
| CLAUDE.md: decisões fechadas, regras invioláveis, comandos, deploy, como trabalhar; "sem dependência fora da stack sem perguntar"; "rodar lint/test/build antes de dizer que terminou"; "estado com ícone + texto, nunca só cor" | ADOTAR    |                               |
| Regras RN/RNF fiscais                                                                                                                                                                                                            | DESCARTAR |                               |

## Cloudflare, headers e CSP

| Item                                                                          | Decisão   | Motivo                                                                                                                      |
| ----------------------------------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------- |
| `wrangler.jsonc`: `$schema`, `send_metrics: false`, `compatibility_date` fixa | ADOTAR    |                                                                                                                             |
| `assets.directory ./dist`, `html_handling`, `not_found_handling: 404-page`    | ADAPTAR   | Diretório `./out`; BRIEF adiciona `main`, `binding` e `run_worker_first`.                                                   |
| `workers_dev: false` em produção                                              | ADAPTAR   | BRIEF: workers.dev ligado até o G8.                                                                                         |
| `gerar-headers.mjs` gera `_headers` com CSP por hash                          | ADAPTAR   | Next não gera hashes; extrair dos HTMLs de `out/` ou outra abordagem (risco do BRIEF). Cache imutável em `/_next/static/*`. |
| Limites do `_headers` (100 regras, 2000 caracteres) validados no build        | ADOTAR    |                                                                                                                             |
| HSTS adiado                                                                   | ADAPTAR   | O BRIEF pede HSTS; ativar após estabilizar.                                                                                 |
| `connect-src 'none'`                                                          | DESCARTAR | Umami via `/stats` e `/api` exigem `'self'`.                                                                                |
| `robots.txt` e `sitemap.xml` no build                                         | ADAPTAR   | `app/robots.ts`, `app/sitemap.ts` com `force-static`.                                                                       |
| `trailingSlash: never`                                                        | ADAPTAR   | Testar `trailingSlash` e `html_handling` (BRIEF).                                                                           |
| Fontes locais                                                                 | ADAPTAR   | BRIEF usa `next/font/google` (self-hosted no build).                                                                        |

## Lighthouse

| Item                                                                                 | Decisão | Motivo                                                           |
| ------------------------------------------------------------------------------------ | ------- | ---------------------------------------------------------------- |
| Mobile, 3 runs, `--no-sandbox --headless=new`, `startServerCommand: wrangler dev`    | ADOTAR  |                                                                  |
| Performance ≥ 0.95, A11y = 1, Best Practices ≥ 0.95, SEO = 1; LCP ≤ 2000, CLS ≤ 0.05 | ADOTAR  | Casa com o BRIEF.                                                |
| `total-byte-weight` ≤ 150 KB                                                         | ADAPTAR | BRIEF fixa 150 KB gzip de JS inicial; medir antes de virar erro. |
| `robots-txt` fora do Lighthouse, coberto no e2e                                      | ADAPTAR | Cobrir em tests/seo.                                             |
| `upload: filesystem` em `./lighthouse`                                               | ADOTAR  |                                                                  |

## Versões encontradas (referência, não copiar às cegas)

Node 24; TypeScript 6.0.3; ESLint ^10.11; typescript-eslint ^8.71; Prettier ^3.9.9; Tailwind ^4.3.3; React ^19.3; Vitest ^5.0.2; Playwright ^1.63; axe-playwright 4.13.0; wrangler 4.143.1; `compatibility_date` 2026-09-29; `@lhci/cli` 0.15.1. Registrar as versões efetivas em DECISIONS.md após checar a documentação atual.

## Riscos de conflito com o BRIEF

1. Worker próprio (`worker/index.ts`): muda `wrangler.jsonc`, o `wrangler dev` do e2e/Lighthouse e a regra "sem script no Worker".
2. CSP por hash no export do Next: decidir cedo (hashes extraídos do HTML, ou `'unsafe-inline'` temporário em Report-Only). Nonce não combina com HTML estático.
3. npm para pnpm: traduzir workflows, `webServer`, `lhci`; configurar `onlyBuiltDependencies` do zero.
4. Metas Lighthouse calibradas para Astro quase sem JS; calibrar com o runtime do Next antes de bloquear o CI.
5. Sem hooks locais para copiar: o BRIEF pede hooks, então é decisão nova.
6. Deploy: o Confere Nota usa Workers Builds; o BRIEF deixa GitHub Actions ou Workers Builds para o PLAN.
7. Nome de pasta de testes (`e2e/` + `test/` versus `tests/`) a decidir no PLAN.
