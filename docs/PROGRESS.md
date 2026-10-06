# PROGRESS

## Fase atual

**G7 Linha do tempo por tags: PR aberto, aguardando OK.** G1 a G6 mergeados (`main` publicado só em workers.dev, noindex). Falta o G8 (cutover).

## Feito

- 2026-10-05: G0 aprovado; tags `site/2024`, `site/2025`, `site/2026` e `v1.0.0` intactas. G1, G2 e G5 mergeados.
- 2026-10-06: G3 (páginas, 3 idiomas), G4 (orelha com arraste, virada de página, computador 3D CC BY 4.0) e G6 (SEO, Lighthouse, CSP em Report-Only, smoke com rollback) mergeados.
- 2026-10-06: G7 (`g7-linha-do-tempo`): `scripts/build-archives.ts` constrói as três versões com o Node 20 da época (`archive/2024`, `2025`, `2026`, com patches em `archive/patches/`); `/2024/`, `/2025/` e `/2026/` no ar com `noindex`, fora do sitemap e da CSP; link "Voltar à edição atual"; cartões da linha do tempo com capturas reais; `tests/archive`; `docs/ARCHIVE.md` com o passo a passo para arquivar uma versão nova.

## Feedback do usuário para corrigir depois (G4)

Pontos ruins na passada de página, o tamanho da orelha e bugs ao voltar com a orelha. O usuário vai detalhar; o agente corrige em uma rodada de ajustes.

## Pendente

- Usuário: religar o secret `UMAMI_HOST`; OK para atualizar o conteúdo a partir do currículo novo; versão em português do currículo; revisar o alemão; Instagram, WhatsApp e telefone; cargo e período da Modaxo; "O que mudou" e "O que aprendi" de cada edição; provedor de tradução; proteger o `main` (checks `verificar`, `e2e` e `lighthouse`); como o Search Console foi verificado.
- G8: cutover (zona Cloudflare, MX e SPF, nameservers, domínio no Worker, Redirect Rule do apex, HSTS, rollback ensaiado).

## Regras vivas

Sem commit direto no `main`. Nunca ler nem imprimir `code/.env`. Sem ação na Vercel nem em DNS.
