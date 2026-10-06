# PROGRESS

## Fase atual

**G3 Páginas e conteúdo: PR aberto, aguardando OK.** G1, G2 e G5 estão mergeados (`main` em produção só em workers.dev, noindex). G4, G6, G7 e G8 pendentes.

## Feito

- 2026-10-05: G0 aprovado; tags `site/2024`, `site/2025`, `site/2026` e `v1.0.0` intactas.
- 2026-10-05: G1 (PR #26), G2 (PR #27) e G5 (PR #28) mergeados; CI verde; deploy do `main` em workers.dev por GitHub Actions.
- 2026-10-06: Umami ligado pelo usuário (`UMAMI_HOST` como secret do Worker; `NEXT_PUBLIC_UMAMI_WEBSITE_ID` como variável do repositório; `/api/health` respondeu `umami: ok`). Integração Git "Workers Builds" da Cloudflare desconectada pelo usuário.
- 2026-10-06: G3 (`g3-paginas`): 7 páginas × 3 idiomas + privacidade × 3 + guia de estilo, dicionários tipados (pt, en, de), Zod, metadata e hreflang por rota, 404 global, orelha como link real, seletor de idioma, currículos com 301 das URLs antigas, `i18n:check` no CI. Verificação: lint, typecheck, 72 testes unitários e 154 e2e (seo, e2e, a11y, umami) verdes.

## Pendente

- Usuário: revisar o alemão (`src/content/de/index.ts`, `reviewed.json`); responder Instagram e WhatsApp; fornecer cargo e data da Modaxo, parágrafos de Sobre, capturas e retrato; licença do `.glb`; decidir o provedor de tradução (DeepL ou LLM).
- Usuário: proteger o `main` (CI obrigatório: `verificar` e `e2e`).
- G4: arraste da orelha, View Transitions entre rotas, `.glb` lazy.
- G6: OG por página (satori), JSON-LD, sitemap e robots, redirect apex para www, CSP, Lighthouse.
- G7: `archive/<ano>/` e `/<ano>/` (hoje "Em breve").

## Regras vivas

Sem commit direto no `main`. Nunca ler nem imprimir `code/.env`. Sem ação na Vercel nem em DNS.
