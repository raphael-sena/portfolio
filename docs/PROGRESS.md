# PROGRESS

## Fase atual

**G1 concluído** (PR #26 mergeado; site em https://portfolio.raphael-116.workers.dev, noindex). **G2 Design system: PR aberto, aguardando OK.** **G5 Umami: subagente em worktree próprio (`g5-umami`), em andamento.**

## Feito

- 2026-10-05: G0 aprovado; tags `site/2024` e `site/2025` criadas e enviadas (com `site/2026` e `v1.0.0` intactas).
- 2026-10-05: G1: scaffold, CI e Worker "hello". PR #26 mergeado em `2254f53`; deploy do `main` em workers.dev pelo GitHub Actions (secrets e `DEPLOY_ENABLED` criados pelo usuário); smoke contra a URL publicada: 6 de 6.
- 2026-10-05: G2 (`g2-design-system`): componentes em `src/components/gazeta/`, rota `/design-system` (noindex), textura de papel WebP 256 px (`scripts/gerar-textura.mjs`), skip link no layout, `scripts/comparar-design.mjs` e comparações em `docs/design-system/`. Verificação: lint, typecheck, 7 testes unitários e 11 e2e (seo, e2e, a11y com axe) verdes.

## Pendente

- Usuário: proteger o `main` (CI obrigatório: `verificar` e `e2e`); cadastrar o `raphaelsena.com` no Umami e fornecer `UMAMI_HOST` e o website ID só no G5.
- G5: integrar `<UmamiScript />` no layout quando a branch `g5-umami` chegar.
- Abertas, sem bloquear: slugs, `x-default`, Instagram/WhatsApp, zona Cloudflare, renovação do domínio.
- G3 em diante só após o OK do G2.

## Regras vivas

Sem commit direto no `main`. Nunca ler nem imprimir `code/.env`. Sem ação na Vercel nem em DNS. O check da Vercel falha nos PRs (Root Directory `code` não existe mais): esperado.
