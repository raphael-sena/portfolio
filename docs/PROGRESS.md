# PROGRESS

## Fase atual

**G1 Fundação: PR #26 aberto, CI verde (verificar e e2e). Aguardando OK do usuário** para o merge e para o G2. Pendente para o aceite completo: URL workers.dev servindo (precisa dos secrets e de `DEPLOY_ENABLED`).

## Feito

- 2026-10-05: G0 aprovado. Tags `site/2024` (8303d12) e `site/2025` (8235c76) criadas e enviadas; `site/2026` e `v1.0.0` intactas.
- 2026-10-05: branch `g1-fundacao`; `code/` removido; scaffold na raiz (Next 16 export, TS 6, Tailwind 4, Worker hello, ESLint 9, Prettier, lefthook, Vitest, Playwright, CI). Versões em DECISIONS.md.
- 2026-10-05: local: lint, typecheck, 7 testes unitários e 6 e2e verdes. GitHub Actions: `verificar` e `e2e` (matriz completa: chromium, firefox, webkit, Pixel 7, iPhone 14) verdes.

## Pendente

- Usuário: criar secrets `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID` e a variável `DEPLOY_ENABLED=true`; proteger o `main` (CI obrigatório). Depois do merge, o deploy em workers.dev roda sozinho.
- Abertas, sem bloquear: slugs, `x-default`, Instagram/WhatsApp, zona Cloudflare, renovação do domínio.
- Vercel: o preview do PR falha (build do Next 16 legado/ambiente). Não mexi na Vercel, como combinado.
- G2 em diante só após o OK do G1.

## Regras vivas

Sem commit direto no `main`. Nunca ler nem imprimir `code/.env`. Sem ação na Vercel nem em DNS.
