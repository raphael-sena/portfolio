# PROGRESS

## Fase atual

**G6 SEO e confiabilidade: PR aberto, aguardando OK.** G1 a G5 mergeados (`main` publicado só em workers.dev, noindex). G7 (linha do tempo por tags) e G8 (cutover) pendentes.

## Feito

- 2026-10-05: G0 aprovado; tags `site/2024`, `site/2025`, `site/2026` e `v1.0.0` intactas. G1, G2 e G5 mergeados.
- 2026-10-06: G3 (páginas, 3 idiomas) e G4 (orelha com arraste, virada de página por View Transitions, computador 3D Apple II CC BY 4.0) mergeados.
- 2026-10-06: G6 (`g6-seo`): imagens Open Graph por página, JSON-LD, `robots.txt`, `sitemap.xml` com hreflang, CSP em Report-Only com hashes, HSTS só em produção, favicon e manifest, Lighthouse CI, orçamento de LCP/CLS em 4G, smoke pós-deploy com rollback, workflow de smoke e crawl, `docs/search-console.md`. Lighthouse local nas 12 rotas: Performance 95 a 97, Acessibilidade 100, Boas práticas 100, SEO 100.

## Feedback do usuário para corrigir depois (G4)

Pontos que ficaram ruins na passada de página, o tamanho da orelha e bugs ao voltar com a orelha. O usuário vai detalhar; o agente corrige em uma rodada de ajustes.

## Pendente

- Usuário: religar o secret `UMAMI_HOST` (`wrangler secret list` está vazio; `/api/health` mostra `umami: unconfigured`); OK para atualizar o conteúdo a partir do currículo novo; versão em português do currículo; revisar o alemão; Instagram, WhatsApp e telefone; cargo e período da Modaxo; provedor de tradução; proteger o `main` (CI obrigatório: `verificar`, `e2e` e `lighthouse`); descobrir como o Search Console foi verificado.
- G7: `archive/<ano>/` e `/<ano>/` (hoje "Em breve").
- G8: cutover (zona Cloudflare, MX/SPF, nameservers, domínio no Worker, Redirect Rule do apex, rollback ensaiado).

## Regras vivas

Sem commit direto no `main`. Nunca ler nem imprimir `code/.env`. Sem ação na Vercel nem em DNS.
