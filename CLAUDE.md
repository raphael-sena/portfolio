# CLAUDE.md

**Ao iniciar, leia `docs/BRIEF.md` e `docs/PROGRESS.md`.** O BRIEF é a fonte de verdade; na dúvida, vale o brief.

## Stack

Next.js App Router (`output: "export"`) + TypeScript estrito + Tailwind v4 (tokens em `@theme`) + Worker pequeno em `worker/index.ts` + Cloudflare Workers (static assets, `wrangler.jsonc`). Conteúdo em MDX/JSON com Zod. Testes: Playwright (contra `wrangler dev`), Lighthouse CI. Convenções de tooling: ver `docs/CONVENTIONS.md`.

## Comandos

`pnpm dev | build | preview | lint | format | typecheck | test | test:e2e` (ver README). Node 24, pnpm 12. Rode `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e` antes de dizer que terminou.

## Regras de segurança

- Nunca commitar no `main`; branches `gN-nome` + PR com CI verde. Sem force push, sem reescrever histórico, sem apagar/mover tags `site/*`.
- Exigem confirmação explícita: criar/enviar tags, DNS/nameservers, domínio customizado no Worker, qualquer ação na Vercel, apagar arquivos fora do repo.
- Segredos: nunca pedir nem imprimir. Use `.dev.vars` (gitignored) e `wrangler secret put`; commite só `.dev.vars.example`.
- `../portfolio-legacy` e `../confere-nota` (hoje `/Users/raphaelsena/Desktop/validador/validator-ibs-cbs`) são SOMENTE LEITURA.
- Não inventar conteúdo: faltou, vira placeholder `[...]` + `docs/CONTENT-TODO.md`.
- Portões G0–G8: parar e esperar "OK" explícito a cada um. G0 aprovado em 2026-10-05; G1 em andamento.
