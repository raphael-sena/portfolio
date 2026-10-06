# PLAN (G0): reconstrução do portfólio "Gazeta de 1900"

Status: **G0 APROVADO em 2026-10-05** (com os ajustes da seção 9). Versão original da proposta mantida abaixo; a seção 9 prevalece onde divergir. Base: BRIEF.md + LEGACY, CONVENTIONS, DESIGN-SPEC, INFRA e ARCHIVE. Nenhuma ferramenta foi configurada ainda. As versões atuais de Next.js, Wrangler, Umami, Playwright e Lighthouse CI serão confirmadas na documentação oficial no início do G1 e registradas em DECISIONS.md.

## 1. Arquitetura

- **Next.js App Router, `output: "export"`**, `images.unoptimized: true`, TypeScript estrito, Tailwind v4 (tokens em `@theme`), pnpm, Node 24 (`.nvmrc`).
- **Worker `worker/index.ts`** só para `/stats/*` (proxy Umami), `/api/spotify`, `/api/chess`, `/api/health`. `wrangler.jsonc` com `assets` (`directory: ./out`, `binding: ASSETS`, `not_found_handling: 404-page`, `run_worker_first: ["/stats/*","/api/*"]`). O resto vem direto dos assets. Fallback do brief: se houver bloqueio real, propor OpenNext em DECISIONS.md antes de mudar.
- **Conteúdo** em MDX/JSON no repo, schema Zod, pt-BR e en (alemão: ver perguntas). Projetos congelados em JSON no build, não consultados no cliente.
- **Rotas:** `/`, `/sobre`, `/experiencia`, `/projetos`, `/tecnologias`, `/linha-do-tempo`, `/contato`, `/privacidade`, e o mesmo em `/en/*`. `/design-system` (noindex, fora do sitemap), `/<ano>/` (arquivos, noindex), 404 real.
- **Navegação:** links reais sempre; PageEar, PageTurn (View Transitions) e MacViewer são progressive enhancement. Sem JS, tudo funciona.
- **Linha do tempo:** `archives.json` + `archive/<ano>/` (saída já construída) copiado para `/<ano>/`. O CI não reconstrói versões antigas.

## 2. Estrutura de pastas (alvo)

```
app/                 rotas (pt na raiz, en em /en), layout, metadata, sitemap.ts, robots.ts
src/components/{ui,site}/   Masthead, NavBar, PageStack, PageEar, PageTurn, MacViewer, ...
src/content/         MDX/JSON por idioma + schemas Zod
src/lib/  src/config/  src/styles/
worker/index.ts      Worker (Umami, spotify, chess, health)
archive/<ano>/  archive/patches/   saídas e patches das versões antigas
scripts/             gerar-headers, gerar-og, build-archives.ts
public/              assets, _headers/_redirects gerados no build
tests/{seo,e2e,umami,a11y,archive}/   Playwright; test/ Vitest (decidir nomes no G1)
docs/                BRIEF, PLAN, PROGRESS, DECISIONS, ...
```

## 3. Decisões propostas (a aprovar)

1. **Pastas de teste:** `tests/<suíte>` (como no BRIEF) para Playwright e `test/` para Vitest (como no Confere Nota).
2. **Hooks locais:** o Confere Nota não usa nenhum; proposta: lefthook leve (lint-staged + typecheck no pre-push) ou nenhum. O BRIEF cita hooks.
3. **Deploy:** GitHub Actions (CI, preview com `wrangler versions upload`, deploy do `main` só em workers.dev), no lugar de Workers Builds, para os testes rodarem contra o build real antes de publicar e permitir `wrangler rollback` automático no smoke. Recomendado.
4. **CSP:** começar em Report-Only com hashes SHA-256 extraídos dos HTMLs de `out/` por `scripts/gerar-headers`; promover após os testes. Risco: scripts inline do Next mudam a cada build (aceito, é gerado).
5. **Orelha e movimento reduzido:** troca imediata, sem esperar 650 ms/1 s (corrige o protótipo).
6. **Menu sem Início:** manter como no protótipo (Início pelo letreiro e rodapé), mas a orelha segue 1 a 7.
7. **Host canônico:** `www.raphaelsena.com` (é o atual, por INFRA.md); o apex vira 301 para o www. O BRIEF diz "mantenha o atual".
8. **`code/` removido no G1** (histórico intacto); `LICENSE` mantida; README reescrito.
9. **Versões antigas:** ver ARCHIVE.md. Só duas tags retroativas viáveis (`site/2024` e `site/2025`). Nenhuma criada.

## 4. Ordem, dependências e estimativa

Grafo (BRIEF): G0 > G1 > { G2 > G3 > G4 } || { G5 Umami } || { G7 Linha do tempo } > G6 SEO > G8 Cutover. Estimativas em horas de trabalho do agente + revisão (indicativas):

| Fase                                                                                                      | Entrega                                                     | Estimativa                                |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------- |
| G0                                                                                                        | docs, plano, perguntas                                      | feito, aguardando OK                      |
| G1 Fundação                                                                                               | scaffold, tokens, fontes, CI, Worker "hello" em workers.dev | 1 a 2 dias                                |
| G2 Design system                                                                                          | componentes em `/design-system` + screenshots               | 2 a 3 dias                                |
| G3 Páginas e conteúdo                                                                                     | 7 rotas × 2 idiomas, Zod, 404, placeholders                 | 2 a 3 dias                                |
| G4 Interações                                                                                             | PageEar, PageTurn, MacViewer lazy + e2e                     | 2 a 3 dias                                |
| G5 Umami (paralelo)                                                                                       | proxy, eventos, docs/umami.md, tests/umami                  | 1 dia                                     |
| G7 Linha do tempo (paralelo)                                                                              | build-archives, `/<ano>/`, tests/archive                    | 1 a 2 dias (depende do build das versões) |
| G6 SEO e confiabilidade                                                                                   | metadata, JSON-LD, OG, sitemap, redirects, Lighthouse       | 2 dias                                    |
| G8 Cutover                                                                                                | zona Cloudflare, domínio, rollback ensaiado                 | 0,5 a 1 dia + janela de DNS               |
| Total: aproximadamente 2 a 3 semanas corridas, dominadas pelas suas entregas de conteúdo (INPUTS-NEEDED). |

## 5. Riscos e mitigação

| Risco                                                                 | Mitigação                                                                                                    |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Versões antigas não buildam (`canvas` nativo, dependências)           | Preferir `8235c76` (sem canvas); build com Node 20 em container; fallback: capturar saída da Vercel/Wayback. |
| Versões antigas sem `output: export` e com chamadas de API no cliente | Patch por ano (`output: export`, `basePath`, `images.unoptimized`); congelar dados dinâmicos.                |
| `code/.env` versionado em `8235c76` em diante                         | Não ler nem publicar; auditar e decidir rotação; excluir de `archive/`.                                      |
| CSP com scripts inline do Next                                        | Hashes gerados no build; Report-Only primeiro.                                                               |
| View Transitions desiguais                                            | Progressive enhancement; fallback imediato.                                                                  |
| E-mail do domínio (MX/TXT do Namecheap Email Forwarding)              | Copiar 5 MX e o SPF antes de trocar NS (INFRA.md); testar o encaminhamento depois.                           |
| Proxy Umami (IP real, CORS)                                           | `cf-connecting-ip`; testes com interceptação.                                                                |
| Vercel ainda conectada ao repo                                        | Builds do `main` podem falhar: aceito pelo BRIEF; avisarei. Não mexo na Vercel.                              |
| Metas do Lighthouse (performance 95, JS < 150 KB) com runtime do Next | Calibrar na primeira medição do G1/G6; three.js só lazy.                                                     |
| Peso de assets (.glb, texturas)                                       | Orçamento e compressão (Draco ou meshopt); poster. Licença do `.glb` pendente.                               |
| Domínio expira em 2026-12-20                                          | Confirmar renovação automática (você).                                                                       |
| Spotify sem credenciais no legado                                     | Decidir: API real no Worker ou widget/placeholder.                                                           |

## 6. Segurança e permissões (G1)

Configurar `.claude/settings.json` negando escrita em `../portfolio-legacy` e no Confere Nota. Nunca ler nem imprimir `.env`. Segredos só via `.dev.vars` e `wrangler secret put`. Sem force push; tags `site/*` imutáveis.

## 7. Critérios de aceite do G0

Você aprova: PLAN.md, CONVENTIONS.md e a tabela de versões (ARCHIVE.md), e responde as perguntas que bloqueiam o G1 (abaixo e em INPUTS-NEEDED.md).

## 8. Perguntas que bloqueiam o G1 (máx. 5, com recomendação)

1. **Alemão (`de`)** existe no legado. Recomendo **só pt-BR e en**, como no BRIEF; o alemão fica fora do escopo.
2. **Tags retroativas:** aprova `site/2024` = `8303d12` e `site/2025` = `8235c76`? Recomendo sim (nada é criado antes do seu OK). Posso criá-las já no G1 ou só no G7?
3. **Deploy por GitHub Actions** (decisão 3) em vez de Workers Builds: aprova? Recomendo Actions.
4. **Spotify:** usar a API oficial no Worker (preciso das credenciais por `wrangler secret put`) ou manter widgets/placeholder? Recomendo placeholder no lançamento e API depois, sem bloquear o cutover.
5. **Hooks locais:** lefthook leve ou nenhum? Recomendo lefthook com lint-staged no pre-commit.

## 9. Revisão pós-G0 (2026-10-05): BRIEF corrigido e decisões do usuário

Prevalece sobre as seções anteriores.

- **Idiomas: pt-BR (fonte de verdade), en e de.** i18n por dicionários tipados próprios (sem biblioteca), segmento `[locale]` + `generateStaticParams`, idioma sempre da URL, sem middleware. `pnpm i18n:translate` (ferramenta a confirmar no G1) com glossário e hash por chave; textos `de` com `reviewed: false` até o usuário revisar. Rotas: 7 × 3 idiomas. **G3 ganha ~1 dia**; as suítes seo, e2e e a11y rodam nos 3 idiomas. Estrutura: dados neutros em `src/content/data`, textos em `src/content/{pt,en,de}`.
- **Infra:** registrador e DNS na Namecheap; host canônico `www`; apex com 301 (Redirect Rule da Cloudflare ou Worker; documentar a escolha no G6/G8). E-mail por Namecheap Email Forwarding (plano B: Cloudflare Email Routing).
- **Tags:** `site/2026` já existe. `site/2024` (8303d12) e `site/2025` (8235c76) autorizadas, criadas no início do G1. `v1.0.0` intocada. Anos reais na linha do tempo (2024, 2025, 2026).
- **Analytics:** só Umami (Clarity, Vercel Analytics e Speed Insights não migram).
- **Deploy:** GitHub Actions. **Hooks:** lefthook leve (só lint-staged no pre-commit; typecheck e testes pesados no CI). **Testes:** `tests/<suíte>` (Playwright) e `test/` (Vitest).
- **Spotify:** placeholder no lançamento, API depois; nada de widgets de terceiros nem Last.fm. **Chess.com:** proxy com cache no Worker.
- **MacViewer:** cubo CSS 3D até o usuário confirmar a licença do `.glb`. `design/3d/` entra no `.gitignore` e não é commitado nem publicado.
- **Design:** NavBar de 6 itens, orelha 1 a 7; limiar da orelha = deslocamento diagonal somado (dx+dy) de ~280px; PageTurn por View Transitions entre TODAS as rotas, com troca imediata sem espera em movimento reduzido; cores e sombras extras viram tokens em `@theme`; `useId` para ids de SVG; as 8 lacunas de a11y do DESIGN-SPEC (seção 7) serão corrigidas.
- **Currículos:** `curriculo-raphael-sena.pdf` (pt) e `resume-raphael-sena.pdf` (en e de), com 301 de `/Resume_Raphael_Sena.pdf` e `/Curr%C3%ADculo_Raphael_Sena.pdf`.
- **Conteúdo:** nada de números ou datas da Modaxo (42,6%, 177K, 40000, 05/2025) sem confirmação; placeholders + CONTENT-TODO.md. Projetos: dados dos 5 repositórios congelados em JSON consultando a API do GitHub uma vez (sem token), com descrições traduzidas pelo script de i18n. Contatos públicos: LinkedIn, GitHub e e-mail. Corrigir ao migrar: duplicatas em tecnologias, "Desevolvimento", "NGS", `alt` incorretos, ids duplicados.
- **Search Console:** procurar `google-site-verification` no legado e replicar; método a confirmar com o usuário.
- **Segredos:** o agente nunca lê nem imprime `code/.env`.
- **Pendências abertas (não bloqueiam o G1):** slugs (manter pt ou neutros em inglês), `x-default` (recomendado `/en/`), Instagram e WhatsApp (manter ou remover), conta e zona na Cloudflare, renovação automática do domínio.
