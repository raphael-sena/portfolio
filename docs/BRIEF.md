# BRIEF: reconstrução do portfólio raphaelsena.com ("Gazeta de 1900")

> Este arquivo é a fonte de verdade do projeto. Leia-o por inteiro ao iniciar cada sessão, junto com docs/PROGRESS.md.

# 0. Como trabalhar (orquestração)

Você é o orquestrador da reconstrução completa do meu portfólio. Comece em MODO DE PLANEJAMENTO: não escreva código nem altere nada no repositório (além de docs/) antes de eu aprovar o plano (portão G0).

- Mantenha estes arquivos em docs/: PROGRESS.md (fase atual, feito, pendente, decisões; atualize ao fim de cada tarefa), PLAN.md, DECISIONS.md (decisões com data e versões de ferramentas), CONTENT-TODO.md (placeholders de conteúdo), INPUTS-NEEDED.md (o que preciso fornecer).
- Crie um CLAUDE.md curto na raiz com: stack, comandos, regras de segurança e a instrução "ao iniciar, leia docs/BRIEF.md e docs/PROGRESS.md".
- Use subagentes para trabalho independente e paralelo. Cada um recebe escopo, arquivos permitidos e formato de saída. Subagentes de exploração são SOMENTE LEITURA e devolvem resumos, nunca código. Subagentes que escrevem código trabalham em `git worktree` próprio, em branch própria, para não conflitar. Você integra, revisa e decide.
- Portões G0 a G8: ao fim de cada um, pare, mostre evidências (comandos e saídas reais) e espere meu "OK" explícito. Nunca avance sozinho para o portão seguinte.
- Antes de configurar Cloudflare/Wrangler, Next.js, Umami, Playwright ou Lighthouse CI, confirme a documentação ATUAL na web (versões e opções mudam) e registre as versões em docs/DECISIONS.md.
- Na dúvida, pergunte (no máximo 5 perguntas objetivas por vez, com a sua recomendação). Não invente conteúdo: o que faltar vira placeholder visível, como [NOME DO PROJETO], e entra em docs/CONTENT-TODO.md.
- Verifique antes de afirmar: rode os comandos e mostre a saída. Não diga que algo funciona sem evidência.

# 1. Ambiente e limites

- cwd = repositório EXISTENTE (github.com/raphael-sena/portfolio). O `main` é SEMPRE a versão mais atual do site; as versões antigas vivem nas tags `site/<ANO>` (o túnel do tempo). Não existe branch de longa duração para o redesign.
- PRÉ-CONDIÇÕES (confirme as duas comigo ANTES de qualquer commit no `main`):
  1. A versão atual já está marcada: tag `site/2026` (d30b96f) existe, local e remota. As tags retroativas (`site/2024`, `site/2025`) são criadas no INÍCIO do G1, antes do primeiro commit no `main`, depois do meu OK. `v1.0.0` permanece como está.
  2. `../portfolio-legacy` é um git worktree (detached) da tag `site/2026`.
- Tolerância a manutenção: o site é meu e ficar fora do ar ou "em manutenção" durante a migração NÃO é crítico. Por isso a Vercel não precisa ser congelada: se ela tentar construir o `main` e falhar, a produção continua no último deploy bom; se construir, tudo bem. Não mexa na Vercel; eu decido depois se desconecto o repo. O que NÃO pode se perder: o histórico git e as tags `site/*`, e o e-mail do domínio (MX e TXT).
- Estrutura atual do repo: README.md, LICENSE (MIT) e `code/` (app Next.js). O projeto novo fica na RAIZ. No primeiro PR (G1), remova `code/` (o histórico git continua intacto), mantenha o LICENSE e reescreva o README.
- Referências SOMENTE LEITURA: `../portfolio-legacy` (a tag da versão atual) e `../confere-nota` (repositório local com as convenções que quero repetir). Configure permissões em `.claude/settings.json` para negar escrita nesses dois diretórios.
- Do Confere Nota, reaproveite apenas convenções e configuração; nunca código de negócio, .env, chaves ou dados.
- Fluxo: trunk-based. Branches curtas `gN-nome`, PR para o `main` e merge só com o CI verde; `main` protegido (CI obrigatório). Não commitar direto no `main`. Cada merge no `main` publica o Worker APENAS em workers.dev; o domínio de produção só é anexado no G8. Proibido: force push, reescrever histórico (as tags apontam para SHAs), apagar ou mover tags `site/*`.
- `code/.env` está versionado no legado (desde 8235c76). Nunca leia nem imprima esse arquivo. No projeto novo, `.env*` fica no .gitignore. Não reescreva o histórico (as tags apontam para SHAs); se eu achar uma chave real, eu a rotaciono.
- Segredos: nunca peça nem imprima segredos no chat. Use `.dev.vars` (no .gitignore) e `wrangler secret put`. Commite apenas `.dev.vars.example`.
- Exigem minha confirmação explícita: criar ou enviar tags, mudar DNS ou nameservers, anexar domínio customizado ao Worker, qualquer ação na Vercel, apagar arquivos fora do repo.
- Ações que só eu posso fazer (o agente apenas lembra e orienta): trocar nameservers no registrador ou na Vercel, fornecer secrets e o modelo 3D.

# 2. Contexto

- Site atual: raphaelsena.com (Next 14 + React 18 + Tailwind 3), hospedado na Vercel. Registrador E DNS na Namecheap (nameservers dns1/dns2.registrar-servers.com); a zona NÃO está na Cloudflare. E-mail por Namecheap Email Forwarding (MX eforward1..5 e SPF). Sem DNSSEC. O domínio expira em 2026-12-20 (eu confirmo a renovação automática). Host canônico: `www.raphaelsena.com`; hoje o apex responde 308 para o www e, no site novo, 301 (por Redirect Rule da Cloudflare ou no Worker; documentar a escolha). Detalhes em docs/INFRA.md.
- Novo design "Gazeta de 1900": jornal de 1900 em preto e branco, com páginas empilhadas sobre fundo escuro, textura de papel, orelha de página para virar, virada de página entre rotas e um computador compacto 3D giratório.
- Protótipos em `./design` (LEIAME.md descreve cada arquivo). São ESPECIFICAÇÃO VISUAL: reimplemente em componentes React + Tailwind, sem copiar o HTML bruto.
- Idiomas: pt-BR (fonte de verdade), en e de (alemão dentro; eu falo alemão e reviso os textos de `de`).
- Projeto greenfield, reaproveitando só artefatos: conteúdo, imagens, currículo, fontes, servidor Umami, domínio e histórico git (para a linha do tempo).
- O site é meu portfólio profissional; SEO e confiabilidade são os critérios principais.
- Versionamento: `main` = versão mais atual; tags `site/<ANO>` = linha do tempo (seção 7).
- Tolerância: o site pode ficar fora do ar ou em manutenção durante a migração. Se a manutenção for longa (mais de algumas horas), responder 503 com `Retry-After` em vez de 404 ou conteúdo quebrado, para não prejudicar a indexação.

# 3. Decisões tomadas

- Hospedagem: Cloudflare Workers com static assets (não Pages). Config em `wrangler.jsonc`.
- Next.js App Router com `output: "export"` (`images.unoptimized: true`; decidir e testar `trailingSlash` e `html_handling`) + um Worker pequeno (`worker/index.ts`) para `/stats/*` (proxy do Umami), `/api/spotify`, `/api/chess` e `/api/health`. O resto é servido direto dos assets (`run_worker_first` só para `/stats/*` e `/api/*`). Se houver bloqueio real, proponha o adaptador OpenNext em docs/DECISIONS.md ANTES de mudar.
- TypeScript estrito; Tailwind v4 com tokens em `@theme`. Para todo o resto (pastas, aliases, lint, formatação, testes, scripts, CI, hooks, commits, env), adote as convenções do Confere Nota, exceto onde conflitarem com este brief (vale o brief).
- Fontes (next/font/google): UnifrakturMaguntia (letreiro), Bodoni Moda SC (manchetes, pesos 800 e 700, eixo opsz), Pathway Gothic One (menu, etiquetas, botões; maiúsculas, mínimo 19px), PT Serif Caption (texto; só regular e itálico, não usar bold).
- Paleta: papel #F5F3EC, tinta #111111, link visitado #555555, cinzas #F2F0E8 #E6E3D8 #D9D6CB #CFCCC0, fundo escuro #161616. Sem cor de destaque; destaque por inversão (papel sobre tinta), filetes duplos e hachuras.
- Rotas reais e indexáveis: `/`, `/sobre`, `/experiencia`, `/projetos`, `/tecnologias`, `/linha-do-tempo`, `/contato`, e o mesmo em `/en/*` e `/de/*` (slugs iguais nos 3 idiomas; manter os atuais em pt ou usar slugs neutros em inglês: decidir no PLAN). Sequência da orelha: Início(1) > Sobre(2) > Experiência(3) > Projetos(4) > Tecnologias(5) > Linha do tempo(6) > Contato(7) > Início.
- Conteúdo em MDX/JSON no repo, com schema Zod, sem CMS. Textos em pt-BR, en e de (seção 6, i18n).
- Linha do tempo: versões antigas vêm de TAGS deste mesmo repo (seção 7).
- Analytics: SÓ Umami. Não migrar Microsoft Clarity, Vercel Analytics nem Speed Insights.
- Música e xadrez: Spotify como placeholder no lançamento (API depois, sem bloquear o cutover); não migrar os widgets de terceiros (imagens que recarregam a cada 5 s). Chess.com: API pública, via proxy com cache no Worker.

# 4. Componentes e comportamentos (seguir ./design)

Masthead, Dateline, NavBar (item atual invertido, `aria-current`), PageStack (4 folhas deslocadas e levemente inclinadas sobre fundo escuro com hachura), PaperTexture (no protótipo é SVG feTurbulence; em produção, WebP repetido de ~256px com `mix-blend-mode: multiply`), PageEar, PageTurn, MacViewer, LeaderRow (linha pontilhada), HatchPlaceholder, Button, Pullquote.

- PageEar: `<a>` real para a próxima página. Arrastar na diagonal descola o canto; soltar com deslocamento diagonal somado (dx+dy) de ~280px ou mais completa a virada; antes disso o canto volta. Clique, toque e Enter também viram a página. Pulso discreto no repouso. `touch-action: none` na área de arraste. No celular, fixa no canto da tela. `aria-label` "Virar a página: <seção>, página N".
- PageTurn: View Transitions API; a página atual gira de rotateY 0 a -180deg, origem na esquerda, 1s ease-in, com sombra na dobra. Sem suporte ou com `prefers-reduced-motion`, a troca é imediata. As rotas continuam funcionando sem JavaScript.
- MacViewer: modelo .glb em `design/3d/` (de terceiros): NÃO commitar nem publicar antes de eu confirmar fonte e licença (CC-BY exige atribuição); adicionar `design/3d/` ao .gitignore até lá e usar o cubo CSS 3D. Carregar só ao entrar na tela (IntersectionObserver), com imagem de espera (poster). Arrastar e setas do teclado giram; botões Girar e Reiniciar. Enquanto não houver modelo, usar o cubo CSS 3D do protótipo. O three.js nunca entra no carregamento inicial.

# 5. Plano de execução

## 5.1 Grafo de dependências e paralelismo

G0 > G1 > { G2 > G3 > G4 } em paralelo com { G5 Umami } e { G7 Linha do tempo } > G6 SEO > G8 Cutover.
Depois do G1, G5 e G7 não dependem do design; rode-os em subagentes com worktree próprio enquanto a trilha G2 > G3 > G4 avança. G6 consolida tudo.

## 5.2 Fases e portões

**G0 Descoberta e plano (sem código)**. Em paralelo, subagentes SOMENTE LEITURA:

- A) Legado (`../portfolio-legacy`): inventário de conteúdo, textos, imagens, rotas, dependências, integrações (Spotify, xadrez), env vars. Saída: docs/LEGACY.md.
- B) Confere Nota (`../confere-nota`): estrutura de pastas, aliases, tsconfig, lint e formatação, testes, scripts, CI, hooks, padrão de commits, env vars, README. Saída: docs/CONVENTIONS.md, com adotar/adaptar/descartar e uma linha de motivo por item.
- C) Design (`./design`): catálogo de componentes, tokens, estados, interações, rotas e placeholders. Saída: docs/DESIGN-SPEC.md.
- D) Infra (somente leitura): `dig NS raphaelsena.com +short`; `whois raphaelsena.com` (registrador, DNSSEC); registros DNS atuais, destacando MX e TXT; configuração do projeto na Vercel (quando eu fornecer). Saída: docs/INFRA.md.
- E) Histórico git: confirmar que a tag da versão atual existe (pré-condição da seção 1), analisar `git log` e propor a tabela das versões ANTERIORES (ano, SHA, justificativa). Saída: docs/ARCHIVE.md. NÃO criar as demais tags ainda.
  Entregas: docs/PLAN.md (arquitetura, estrutura de pastas, riscos, ordem, estimativa por fase), docs/INPUTS-NEEDED.md (UMAMI_HOST e website ID por secret, credenciais de Spotify e xadrez, currículo em PDF e textos, modelo 3D, lista de URLs antigas, status da zona na Cloudflare) e as perguntas que bloqueiam o G1. Aceite: eu aprovo PLAN.md, CONVENTIONS.md e a tabela de versões.

**G1 Fundação** (branch `g1-fundacao`, PR para o `main`, só depois de eu confirmar as pré-condições da seção 1). Remover `code/`; scaffold na raiz; tokens e fontes; layout base; lint, formatação, typecheck e hooks conforme CONVENTIONS; Playwright configurado (primeiro teste: home 200 + title); CI (lint, typecheck, build, testes); `wrangler.jsonc` e Worker "hello"; deploy automático do `main` APENAS em workers.dev (NUNCA no domínio de produção antes do G8). Aceite: CI verde e URL workers.dev servindo.

**G2 Design system**. Componentes da seção 4 numa rota `/design-system` (noindex, fora do sitemap) para revisão. Aceite: screenshots lado a lado com ./design e a11y básica.

**G3 Páginas e conteúdo**. 7 rotas × 3 idiomas, conteúdo tipado (Zod), header e footer compartilhados, sequência da orelha, 404 real. Conteúdo vem do legado; o que faltar vira placeholder + CONTENT-TODO.md. Aceite: build estático sem erros e todas as rotas gerando HTML.

**G4 Interações**. PageEar, PageTurn e MacViewer lazy. Aceite: testes e2e de interação verdes (seção 9).

**G5 Umami** (paralelo). Seção 8. Aceite: suíte tests/umami verde e docs/umami.md.

**G6 SEO e confiabilidade**. Seção 9. Aceite: suítes seo, a11y e Lighthouse verdes; checklist do Search Console; CI bloqueando merge em falha.

**G7 Linha do tempo por tags** (paralelo). Seção 7. Aceite: /2022/ e /2024/ (ou os anos reais) respondendo 200 com noindex, e os cartões de /linha-do-tempo lendo archives.json.

**G8 Hardening e cutover**. Seção 11. Aceite: produção em raphaelsena.com via Workers, smoke de produção verde antes e depois, rollback ensaiado.

## 5.3 Riscos a tratar no plano

- Versões antigas que não buildam mais (dependências removidas, Node antigo): guardar a saída já construída em `archive/<ano>/`.
- Export estático do Next: sem route handlers nem middleware, e `next/image` sem otimizador; as partes dinâmicas ficam no Worker.
- CSP com scripts inline do Next: usar hashes SHA-256 gerados no build (ou outra abordagem documentada); começar em Report-Only e promover só depois dos testes.
- View Transitions com suporte desigual entre navegadores: progressive enhancement, sempre com fallback.
- E-mail do domínio: copiar MX e TXT para a nova zona antes de trocar nameservers.
- Proxy do Umami: IP real do visitante via `cf-connecting-ip` e CORS.
- Vercel ainda conectada ao repo: builds do `main` podem falhar ou publicar uma versão intermediária em raphaelsena.com. É aceitável (manutenção); me avise se isso acontecer.
- Tamanho dos assets: .glb, texturas e snapshots; orçamento de peso e compressão (Draco ou meshopt).

# 6. Conteúdo

Reaproveite o conteúdo do legado. Não invente números, cargos, datas, projetos ou depoimentos. Tudo que faltar vira placeholder visível e entra em docs/CONTENT-TODO.md, com o texto sugerido por página.

## i18n (pt-BR, en, de)

- Abordagem: dicionários tipados próprios, SEM biblioteca de i18n: segmento `[locale]` + `generateStaticParams`; o idioma vem sempre da URL (nunca de `localStorage`); sem middleware (incompatível com `output: "export"`). Dados neutros de idioma (datas ISO, links, tecnologias, empresas) em `src/content/data`; textos em `src/content/{pt,en,de}`; tipo `Dictionary` derivado do pt + schema Zod; helper `t()` só no servidor; datas e números com `Intl` por idioma.
- Traduções: `pnpm i18n:translate` (DeepL ou LLM; confirmar a ferramenta no G1), de pt-BR para en e de, com glossário de termos que não se traduzem (nomes próprios, tecnologias, empresas, projetos) e hash por chave (retraduz só o que mudou). Sementes: os textos do legado (`code/services/translations.ts`), registrando as divergências em docs/CONTENT-TODO.md. Nada de tradução em runtime nem widgets de tradução.
- Revisão do alemão: eu (Raphael) falo alemão e reviso os textos de `de` no diff do PR. O script marca `reviewed: false`; só passe para `true` quando eu disser que revisei. Registro [CONFIRMAR]: neutro e profissional, sem "du" nem "Sie" (frases impessoais ou "ich"). Termos do glossário a me propor: "bilhetagem eletrônica" (ex.: "elektronisches Fahrgeldmanagement (EFM)" ou "E-Ticketing") e "Software Engineer" (ex.: "Softwareentwickler"; o legado usa "Softwaretechniker").
- CI: toda chave existe nos 3 idiomas; sem string vazia nem placeholder `[...]` nas páginas finais.
- SEO: hreflang pt-BR, en, de e x-default recíprocos em todas as páginas e no sitemap; `html lang` e `og:locale` (+ alternates); `inLanguage` no JSON-LD; imagens OG por idioma; SEM redirecionamento automático por idioma do navegador (só um aviso dispensável, no cliente, sugerindo o idioma); seletor de idioma com links reais.
- Playwright: as suítes seo, e2e e a11y rodam para os 3 idiomas; testar a reciprocidade de hreflang e a troca de idioma preservando a rota.

# 7. Linha do tempo: versões antigas por tags retroativas (G0.E e G7)

Anos reais: `site/2024` (8303d12), `site/2025` (8235c76) e `site/2026` (d30b96f). Os protótipos mostram 2022, 2024 e 2026 só como exemplo: usar os anos reais e as entradas de `archives.json`. Se no G7 duas versões não forem visualmente distintas, me avise; eu decido se removo uma tag.

Fonte de verdade: tags `site/<ANO>` e `archives.json`.

- Tags: depois do meu OK na tabela de versões, criar retroativamente, no commit proposto, tags anotadas com a data original do commit, e enviá-las:
  `GIT_COMMITTER_DATE="$(git log -1 --format=%aI <SHA>)" git tag -a site/<ANO> <SHA> -m "Portfólio versão <ANO>" && git push origin site/<ANO>`
  A tag da versão atual de produção já deve existir ANTES do primeiro commit no `main` (pré-condição da seção 1). Nunca apagar nem mover tags `site/*`. Antes de criar cada tag, validar o SHA com `git worktree add` em pasta temporária e tentar o build com o Node da época.
- `archives.json`: `[{ "year": 2024, "tag": "site/2024", "sha": "...", "label": "[O QUE MUDOU]", "node": "[VERSÃO]", "build": "next-export | static-html", "basePath": "/2024" }]`.
- `scripts/build-archives.ts`: para cada entrada, `git worktree add .worktrees/<ano> <tag>`; instalar e construir com o Node da época (fnm, nvm ou container); aplicar `archive/patches/<ano>.patch` quando precisar do basePath; copiar a saída para `archive/<ano>/` e registrar o SHA em `archive/<ano>/.source`. Comandos: `pnpm archive:build` (só o que falta) e `pnpm archive:rebuild <ano>`. O CI NÃO reconstrói versões antigas: só copia `archive/<ano>/` para os assets em `/<ano>/`.
- `_headers`: `/<ano>/*` com `X-Robots-Tag: noindex`; fora do sitemap; sem canonical para a home.
- Se uma versão não puder ser realocada para `/<ano>/`, proponha em docs/DECISIONS.md um subdomínio com Worker separado, antes de mudar. Se alguma versão não existir no histórico deste repo, avise e proponha alternativas (outro repo antigo, Wayback Machine) em vez de inventar.
- `/linha-do-tempo` lê `archives.json` para gerar os cartões (ano, legenda, link `/<ano>/`).
- Playwright: cada `/<ano>/` responde 200, com noindex, assets sem 404 e link de volta funcionando.
- Documentar em docs/ARCHIVE.md como arquivar uma nova versão no futuro: criar a tag `site/<ANO>`, acrescentar a entrada em archives.json e rodar `pnpm archive:build`.

# 8. Umami (reutilizar o servidor existente)

- Env: `NEXT_PUBLIC_UMAMI_WEBSITE_ID` e `UMAMI_HOST` (secret do Worker). Proxy first-party no Worker: `/stats/u.js` (cache curto) e `/stats/api/send`. `/api/health` consulta o Umami e NÃO vaza o host.
- Tag: `defer`; `data-website-id`; `data-host-url="/stats"`; `data-domains="raphaelsena.com,www.raphaelsena.com"`; `data-do-not-track="true"`; `data-tag="prod"` ou `"preview"`; `data-performance="true"` (confirmar suporte na versão do meu Umami). Não bloquear a renderização; falha do Umami não pode gerar erro visível.
- Eventos, sem PII e sem `umami.identify`: `page_turn {from,to,via: ear|menu|keyboard}`, `ear_pull {completed}`, `menu_click {item}`, `lang_switch {to}`, `mac_rotate` (1 por sessão), `project_open {slug}`, `resume_download`, `contact_click {channel}`, `outbound_click {host}`, `not_found {path}`, `js_error {route, mensagem truncada}` (máx. 3 por sessão).
- Funis e metas documentados em docs/umami.md: Home > page_turn > /contato; resume_download; contact_click. Incluir um checklist semanal de 10 minutos: referrers (Google, Bing, LinkedIn), páginas de entrada, países e UTM.
- Página `/privacidade`: analytics sem cookies, Do Not Track respeitado.
- Conferir no servidor Umami (me orientar, sem acessar): domínio novo em Websites (ou novo website ID), `TRACKER_SCRIPT_NAME` e `COLLECT_API_ENDPOINT` opcionais, e IP real chegando via `cf-connecting-ip`.

# 9. SEO, Playwright e qualidade

## SEO

- Metadata por rota e idioma: title único (até 60 caracteres) e description única (até 155), canonical absoluto, hreflang pt-BR, en, de e x-default (proposta: /en/).
- Open Graph e Twitter, com imagem 1200x630 por página gerada em build (satori).
- JSON-LD: Person (name, jobTitle, alumniOf PUC Minas, sameAs GitHub e LinkedIn, url), WebSite e BreadcrumbList.
- `sitemap.xml` e `robots.txt` no build. `/<ano>/` e `/design-system` com noindex e fora do sitemap.
- HTML semântico: um h1 por página, landmarks, `alt` em toda imagem, links descritivos.
- Redirecionamentos 301: URLs antigas [LISTA], host secundário para o principal, sem cadeias.
- Orçamentos (mobile, 4G): LCP < 2,0s, CLS < 0,05, INP < 200ms; JS inicial da home < 150 KB gzip (sem o 3D lazy); fontes com subset latin e `display: swap`.
- Search Console: manter a propriedade atual; copiar o TXT de verificação para a zona nova ANTES da troca de DNS; reenviar o sitemap depois.

## Playwright (rodar contra `wrangler dev` com o build real, nunca `next dev`)

Stack: `@playwright/test` + `@axe-core/playwright`. Projetos: seo (chromium, JavaScript DESLIGADO), e2e (chromium, firefox, webkit), mobile (Pixel 7, iPhone 14), a11y. Retries só no CI; trace e vídeo só em falha; `baseURL` via `PLAYWRIGHT_BASE_URL`.

- tests/seo, por rota e idioma, sem JS: status 200; `html[lang]`; um h1; landmarks; title e description únicos e sem placeholder "[...]"; canonical igual à própria URL; hreflang recíproco; OG completo e imagem respondendo 200 com 1200x630; JSON-LD válido; noindex só onde previsto; sitemap válido com todas as URLs respondendo 200; robots; redirects com 1 salto 301; 404 real com status 404 e noindex; sem link interno quebrado; cabeçalhos de segurança e cache.
- tests/e2e: sequência da orelha (1>2>...>7>1) por clique, Enter e arraste com `page.mouse` (soltar antes de ~300px volta; depois completa); reduced-motion via `emulateMedia` (troca imediata); sem JS o conteúdo e a navegação funcionam; troca de idioma preserva a rota; sem erros no console; o chunk do three.js só é pedido quando o MacViewer entra na tela; setas giram; fallback se o .glb falhar; mobile sem rolagem horizontal; regressão visual com `toHaveScreenshot` (`animations: "disabled"`).
- tests/umami: `/stats/u.js` do próprio domínio com 200; POST para `/stats/api/send` com website id e URL certos (interceptar com `page.route`; NUNCA enviar dados de teste ao servidor real); eventos com nome e props certos; com Do Not Track, nenhum envio e nenhum cookie; com o Umami fora (`route.abort`) a página funciona; `/api/health` não vaza `UMAMI_HOST`.
- tests/a11y: axe em todas as rotas e idiomas, zero violações serious ou critical; foco por teclado na orelha e no menu.
- tests/archive: cada `/<ano>/` responde 200, tem noindex, assets sem 404 e link de volta.
- Lighthouse CI mobile: Performance >= 95, Acessibilidade 100, SEO 100, Boas práticas >= 95.

## CI e monitoramento

- No PR: lint, typecheck, build, `wrangler dev` + Playwright e Lighthouse; bloquear o merge em caso de falha.
- Pós-deploy: smoke de produção somente leitura (suíte seo e rotas principais, Umami interceptado). Se falhar: `wrangler rollback` e abrir issue.
- Agendado: o mesmo smoke diário e um crawl completo semanal. Publicar relatórios do Playwright e do Lighthouse como artefatos do CI.

# 10. Cloudflare e cabeçalhos

- `wrangler.jsonc`: `name`, `main`, `compatibility_date`, `assets` { `directory`, `binding: "ASSETS"`, `not_found_handling: "404-page"`, `run_worker_first: ["/stats/*", "/api/*"]` }. Custom domains só no G8.
- Cabeçalhos e redirects via `_headers` e `_redirects` nos assets (confirmar suporte na versão atual) ou no Worker: CSP (ver riscos), HSTS, Referrer-Policy, X-Content-Type-Options, Permissions-Policy; cache imutável para assets com hash e curto para HTML.
- Deploy: GitHub Actions ou Workers Builds (decidir no PLAN). Preview por PR com `wrangler versions upload`; cada merge no `main` publica o Worker em workers.dev; o custom domain só é anexado no G8, e a partir daí o `main` verde é a produção.

# 11. Cutover (G8)

Estado atual: registrador e DNS na Namecheap (nameservers dns1/dns2.registrar-servers.com); hospedagem na Vercel (A 76.76.21.21 no apex e CNAME cname.vercel-dns.com no www); e-mail por Namecheap Email Forwarding; sem DNSSEC. NÃO altere DNS sem minha confirmação explícita em cada passo marcado. Os nameservers são trocados no painel da Namecheap. 0. Confirmar que o `main` está verde e que o smoke de workers.dev passa. Como a manutenção é aceitável, os passos 2 a 5 podem ser agrupados numa única janela curta, desde que eu confirme antes. As confirmações de DNS continuam obrigatórias, e MX e TXT precisam estar copiados para a zona nova ANTES de trocar os nameservers (o e-mail não pode cair sem eu saber).

1. Diagnóstico (somente leitura): nameservers, registrador, DNSSEC, MX e TXT; anotar os nameservers atuais para rollback.
2. Criar a zona na Cloudflare e recriar TODOS os registros, conferindo um a um (não confiar só na importação automática): os 5 MX (eforward1..5, prioridades 10, 10, 10, 15, 20), o TXT SPF `v=spf1 include:spf.efwd.registrar-servers.com ~all` e o resto da zona (a lista completa só aparece no painel Advanced DNS da Namecheap; eu a forneço). Confirmar na documentação da Namecheap que o encaminhamento continua funcionando com DNS externo; plano B: Cloudflare Email Routing. Apex e www continuam apontando para a Vercel com "DNS only" (nuvem cinza): o proxy laranja na frente da Vercel causa `err_too_many_redirects`. Conferir com `dig A raphaelsena.com +short @<ns-da-zona>`.
3. Validar tudo em workers.dev: site, SEO, Umami, cabeçalhos e 404.
4. [CONFIRMAÇÃO] Conferir de novo que não há DNSSEC (hoje não há). Trocar os nameservers para os da Cloudflare no painel da Namecheap. Esperar a zona ficar Active. Testar o encaminhamento de e-mail enviando uma mensagem real.
5. [CONFIRMAÇÃO] Anexar raphaelsena.com e www como custom domains do Worker e confirmar o certificado.
6. Manter o projeto na Vercel por 48h como plano B; depois desconectar o repo, remover o domínio dele e arquivá-lo. Remover do código: `vercel.json`, `@vercel/*` e `.vercel`.
7. Rollback: restaurar no Namecheap os nameservers dns1/dns2.registrar-servers.com (a propagação em .com pode levar até 48h) e reapontar os registros para a Vercel; ou `wrangler rollback` se o problema for só do Worker.
8. Rodar o smoke de produção antes e depois do cutover e reverificar o Search Console.

# 12. Definição de pronto

Site novo em produção em raphaelsena.com via Cloudflare Workers; CI com todas as suítes verdes; Lighthouse dentro das metas; Umami recebendo eventos pelo proxy; Search Console com sitemap enviado e sem erros; linha do tempo funcionando a partir das tags; rollback ensaiado; docs/ completa (BRIEF, PLAN, PROGRESS, DECISIONS, CONVENTIONS, DESIGN-SPEC, LEGACY, INFRA, ARCHIVE, CONTENT-TODO, umami).

# 13. Comece agora

1. Criar o CLAUDE.md e a estrutura de docs/ (BRIEF.md já existe). 2) Lançar em paralelo os subagentes A, B, C, D e E do G0. 3) Entregar docs/PLAN.md, docs/INPUTS-NEEDED.md e as perguntas que bloqueiam o G1. NÃO escreva código, não crie tags e não faça commit no `main` antes do meu OK.
