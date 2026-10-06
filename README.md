# Portfólio de Raphael Sena: "Gazeta de 1900"

Código do site [raphaelsena.com](https://www.raphaelsena.com): um portfólio no formato de um jornal de 1900, em preto e branco, com páginas empilhadas, orelha de página para virar e um computador compacto em 3D.

> **Em reconstrução.** A versão atual de produção continua no ar pela Vercel; este `main` é a nova versão em construção (fase G1, fundação). As versões antigas ficam nas tags `site/<ANO>` (`site/2024`, `site/2025`, `site/2026`) e alimentam a futura página "Linha do tempo".

## Stack

Next.js (App Router, `output: "export"`) · TypeScript estrito · Tailwind CSS v4 (tokens em `@theme`) · Cloudflare Workers com static assets e um Worker pequeno (`worker/index.ts`) · Vitest · Playwright · pnpm.

## Requisitos

Node 24 (`.nvmrc`) e pnpm 12 (campo `packageManager`; ative com `corepack enable pnpm`).

## Comandos

| Comando               | O que faz                                                                  |
| --------------------- | -------------------------------------------------------------------------- |
| `pnpm dev`            | Next em modo de desenvolvimento (sem o Worker)                             |
| `pnpm build`          | `next build` (gera `out/`) + `out/_headers`                                |
| `pnpm preview`        | `wrangler dev` servindo o build real em `http://127.0.0.1:8787`            |
| `pnpm lint`           | ESLint + `prettier --check`                                                |
| `pnpm format`         | `prettier --write`                                                         |
| `pnpm typecheck`      | `tsc --noEmit` do app e do Worker                                          |
| `pnpm test`           | Vitest (`test/`)                                                           |
| `pnpm test:e2e`       | Playwright (`tests/`), sobe `build` + `wrangler dev`; `PW_MATRIZ=completa` |
| `pnpm test:publicado` | Smoke contra um site publicado (`PLAYWRIGHT_BASE_URL`)                     |

## Variáveis de ambiente

| Variável               | Onde             | Uso                                                                                  |
| ---------------------- | ---------------- | ------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | build            | URL canônica (padrão `https://www.raphaelsena.com`)                                  |
| `SITE_ENV`             | build            | `production` remove o `noindex` global do `_headers`; qualquer outro valor = preview |
| `UMAMI_HOST`           | secret do Worker | Servidor Umami (G5). Use `.dev.vars` local e `wrangler secret put`                   |
| `PLAYWRIGHT_BASE_URL`  | testes           | Roda o Playwright contra uma URL já publicada                                        |

Segredos nunca entram no repositório: só `.dev.vars.example` é versionado.

## Deploy

GitHub Actions (`.github/workflows/ci.yml`): lint, typecheck, testes, build, `wrangler deploy --dry-run` e e2e em cada PR. Cada merge no `main` publica o Worker **apenas em workers.dev** (e com `noindex`), quando `DEPLOY_ENABLED=true` e os secrets `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID` existem. O domínio de produção só é anexado no cutover.

## Documentação

A documentação de planejamento fica em [`docs/`](docs/): `BRIEF.md` (fonte de verdade), `PLAN.md`, `PROGRESS.md`, `DECISIONS.md`, `CONVENTIONS.md`, `DESIGN-SPEC.md`, `LEGACY.md`, `INFRA.md`, `ARCHIVE.md`, `CONTENT-TODO.md` e `INPUTS-NEEDED.md`.

## Licença

[MIT](LICENSE)
