# PROGRESS

## Fase atual

**G4 Interações e computador 3D: PR aberto, aguardando OK.** G1, G2, G3 e G5 mergeados (`main` publicado só em workers.dev, noindex). G6, G7 e G8 pendentes.

## Feito

- 2026-10-05: G0 aprovado; tags `site/2024`, `site/2025`, `site/2026` e `v1.0.0` intactas. G1, G2 e G5 mergeados.
- 2026-10-06: Umami ligado pelo usuário; integração Git "Workers Builds" da Cloudflare desconectada. G3 mergeado (PR #29): 7 páginas × 3 idiomas.
- 2026-10-06: G4 (`g4-interacoes`): computador 3D "Apple II Computer" (CC BY 4.0, atribuição no site; 114 MB reduzidos a 1 MB), carregado só ao entrar na tela, com poster e reserva em cubo CSS; orelha com arraste (dx+dy ≥ 280 px); virada de página por View Transitions entre todas as rotas, imediata com movimento reduzido; currículo novo em inglês ligado. Verificação: lint, typecheck, 72 unitários e a matriz completa de navegadores (Chromium, Firefox, WebKit, Pixel 7, iPhone 14): 257 e2e passando, 4 `skip` documentados.

## Pendente

- Usuário: OK para atualizar o conteúdo a partir do currículo novo; versão em português do PDF; revisar o alemão; Instagram, WhatsApp e telefone; cargo e período da Modaxo; provedor de tradução.
- Usuário: proteger o `main` (CI obrigatório: `verificar` e `e2e`).
- G6: OG por página (satori), JSON-LD, sitemap e robots, redirect apex para www, CSP, Lighthouse.
- G7: `archive/<ano>/` e `/<ano>/` (hoje "Em breve").
- G8: cutover.

## Regras vivas

Sem commit direto no `main`. Nunca ler nem imprimir `code/.env`. Sem ação na Vercel nem em DNS.
