# PROGRESS

## Fase atual

**Atualização de conteúdo a partir do currículo: PR aberto, aguardando OK.** G1 a G7 mergeados; `main` protegido (PR obrigatório e checks `verificar`, `e2e` e `lighthouse`); `UMAMI_HOST` religado (`/api/health` mostra `umami: ok`). Falta o G8 (cutover).

## Feito

- 2026-10-05: G0 aprovado; tags `site/2024`, `site/2025`, `site/2026` e `v1.0.0` intactas. G1, G2 e G5 mergeados.
- 2026-10-06: G3 (páginas, 3 idiomas), G4 (orelha com arraste, virada de página, computador 3D CC BY 4.0) e G6 (SEO, Lighthouse, CSP em Report-Only, smoke com rollback) mergeados.
- 2026-10-06: G7 (`g7-linha-do-tempo`): `scripts/build-archives.ts` constrói as três versões com o Node 20 da época (`archive/2024`, `2025`, `2026`, com patches em `archive/patches/`); `/2024/`, `/2025/` e `/2026/` no ar com `noindex`, fora do sitemap e da CSP; link "Voltar à edição atual"; cartões da linha do tempo com capturas reais; `tests/archive`; `docs/ARCHIVE.md` com o passo a passo para arquivar uma versão nova.

- 2026-10-06: G7 mergeado (PR #32): `/2024/`, `/2025/` e `/2026/` no ar, `noindex`. Proteção do `main` aplicada pela API.
- 2026-10-06: conteúdo atualizado a partir do currículo (`conteudo-curriculo`): Experiência, Formação, Projetos (inclui o TCC), Tecnologias (12 grupos), Sobre, Home e idiomas, nos 3 idiomas.

## Feedback do usuário para corrigir depois (G4)

Pontos ruins na passada de página, o tamanho da orelha e bugs ao voltar com a orelha. O usuário vai detalhar; o agente corrige em uma rodada de ajustes.

## Pendente

- Usuário: versão em português do currículo (PDF); revisar o alemão (agora com o conteúdo do currículo); Instagram, WhatsApp e telefone; parágrafos de Sobre, frase de destaque e retrato; "O que mudou" e "O que aprendi" de cada edição; provedor de tradução; como o Search Console foi verificado.
- G8: cutover (zona Cloudflare, MX e SPF, nameservers, domínio no Worker, Redirect Rule do apex, HSTS, rollback ensaiado).

## Regras vivas

Sem commit direto no `main`. Nunca ler nem imprimir `code/.env`. Sem ação na Vercel nem em DNS.
