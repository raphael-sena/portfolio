# LEGACY: inventário do portfólio atual (tag `site/2026`)

Fonte: subagente A do G0, somente leitura, sobre `../portfolio-legacy` (worktree da tag `site/2026`, d30b96f). O app está em `code/`. Valores de segredos não foram copiados. O texto integral dos idiomas fica em `code/services/translations.ts` (279 linhas); a migração deve ler dele, não deste resumo.

## 0. Achados que mudam o escopo

- O site tem **3 idiomas: en, pt e de**. O brief prevê pt-BR e en. **Decisão pendente: o alemão sai?**
- O site é uma **SPA de página única** (`/`). Não há outras URLs de página, então não há redirects de páginas, só de estáticos.
- Idioma em `localStorage` (padrão `en`), `<html lang="en">` fixo, sem SSR localizado, sem hreflang.
- **`code/.env` está versionado** (com `NEXT_PUBLIC_CLARITY_PROJECT_ID`, variável pública por natureza). Decidir se sai do versionamento.
- Não há Umami no código legado (hoje há Vercel Analytics, Speed Insights e Microsoft Clarity).

## 1. Rotas e URLs públicas

| Item                                                                   | Detalhe                                                                                                                                                                                                            |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Páginas                                                                | Só `/` (`code/app/page.tsx`: `Header` + `MainContent`)                                                                                                                                                             |
| API própria (`route.ts`), `robots`, `sitemap`, `vercel.json`, `.nvmrc` | Não existem                                                                                                                                                                                                        |
| Âncoras                                                                | `#intro #about #experience #featured-projects #education #extracurricular #technologies #wrapped #resume #hobbies` (ids de `experience` e `extracurricular` duplicados no DOM por causa de versões mobile/desktop) |
| Estáticos possivelmente linkados                                       | `/Resume_Raphael_Sena.pdf`, `/Currículo_Raphael_Sena.pdf` (acento: `%C3%A9`), `/images/avatar.png` (og:image), `/images/*`, `/extracurricular/*`, `/favicon.ico`                                                   |
| Domínio                                                                | `raphaelsena.com`; o README cita `www`. O host canônico real hoje é `www` (ver INFRA.md)                                                                                                                           |

Redirects 301 a considerar: os dois PDFs de currículo (para o novo caminho) e `/images/avatar.png` e demais imagens, se mudarem de caminho. Âncoras (`/#experience` etc.) não chegam ao servidor.

## 2. Conteúdo (onde mora e o que há)

Textos i18n: `code/services/translations.ts` (chaves idênticas em en/pt/de). Dados factuais hardcoded nos componentes de `code/components/sections/*.tsx`.

### Intro e contatos

Nome "Raphael Sena"; profissão "Software Engineer" / "Engenheiro de Software" / "Softwaretechniker"; foto `/images/profile.jpg`; avatar `/images/avatar.png`.

| Rede                                                           | Destino                                                                    |
| -------------------------------------------------------------- | -------------------------------------------------------------------------- |
| LinkedIn                                                       | `https://www.linkedin.com/in/raphael-sena/`                                |
| GitHub                                                         | `https://github.com/raphael-sena`                                          |
| E-mail                                                         | `rsenares1@gmail.com`                                                      |
| Instagram                                                      | `raphasenab` (link com parâmetro `igsh`)                                   |
| WhatsApp                                                       | `components/WhatsAppButton.tsx` (número e mensagem pré-pronta em en/pt/de) |
| Decidir quais canais continuam públicos (Instagram, WhatsApp). |

### Sobre

Chave `about_text` (en/pt/de). Resumo factual: dev que evoluiu do suporte de TI para sistemas de mobilidade e ERP; intercâmbio em Sydney; Fullstack/Software Engineer na Modaxo (Empresa 1) em bilhetagem eletrônica e gestão de receita; apps móveis; modernização com Flutter e Java/Spring; Engenharia de Software na PUC Minas (2023–2027); projetos pessoais (Java, Angular, PostgreSQL, Docker).

### Experiência (datas hardcoded no JSX)

| #                                                                                                                                                                                                                                                                                                               | Empresa                         | Cargo                                                 | Período           | Skills                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ----------------------------------------------------- | ----------------- | ------------------------------------------------------------ |
| 1                                                                                                                                                                                                                                                                                                               | Modaxo - Empresa 1              | Software Engineer                                     | 05/2025 – atual   | Java 1.7/1.8, Spring Boot, AngularJS, Flutter, Xamarin, Dart |
| 2                                                                                                                                                                                                                                                                                                               | Experimental Software Agency    | (sem cargo; lidera o back-end do projeto "Cuido Bem") | 09/2024 – atual   | Java, Spring Boot, Mockito, Git, RestAPI                     |
| 3                                                                                                                                                                                                                                                                                                               | PUC Minas                       | IT Technician (ServiceDesk e HelpDesk)                | 09/2021 – 09/2023 | Service Desk, MS Office, Active Directory, Windows, suporte  |
| 4                                                                                                                                                                                                                                                                                                               | Avaso Technology Solutions LTDA | Field Support Engineer (Service Desk, freelance)      | 09/2023 – atual   | Hardware, manutenção de servidores, suporte                  |
| Projetos da Modaxo: **Sigom Cloud** (ERP SaaS; relatório PIX com "redução de 42,6%"), **SIGO** (bilhetagem; Guarulhos, Florianópolis, Uberlândia; "177K people"), **SIGO 2.0** (Flutter, integrações Moovit GTFS/GTFS-RT). As métricas vêm do texto original: **não reaproveitar números sem sua confirmação**. |
| Chaves sem uso aparente: `intern`/`intern_text`, `technician_assistant*`, `cuido_bem_projects`. Confirmar se esses cargos existiram.                                                                                                                                                                            |

### Formação

| Instituição                                                                                                                                                                                  | Curso                                                     | Período           |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ----------------- |
| PUC Minas                                                                                                                                                                                    | Bacharelado em Engenharia de Software (Belo Horizonte/MG) | 07/2023 – 07/2027 |
| Kogarah High School (Sydney, NSW)                                                                                                                                                            | Year 11 – intercâmbio                                     | 07/2017 – 01/2018 |
| Dentro da PUC: "Interdisciplinary Project Champion" e "Experimental Software Agency – PMMG" (Tech Lead, "mais de 40000 candidatos por concurso"). Erro a corrigir: pt de `sydney` diz "NGS". |

### Extracurricular

| Curso                                                                | Data     | Imagens                                              |
| -------------------------------------------------------------------- | -------- | ---------------------------------------------------- |
| Red Hat RH124 System Administration I                                | mai/2024 | `extracurricular/redhat/…`                           |
| Udemy, Java (completo)                                               | dez/2023 | `extracurricular/udemy/java_udemy_{pt,en}.jpg`       |
| Alura, Formação Java (POO)                                           | dez/2023 | `extracurricular/alura/alura_java_poo_{pt,en}.png`   |
| Alura, Formação JavaScript backend                                   | nov/2021 | `extracurricular/alura/alura_javascript_{pt,en}.png` |
| Links de certificado são do Google Drive (ids em `translations.ts`). |

### Projetos em destaque

Hoje vêm **ao vivo da API do GitHub, no cliente, sem token** (60 req/h por IP; loading infinito em erro): `remediar`, `dress-manager`, `recipes-and-flavors`, `portfolio`, `relatorio-fotografico`. Imagens em `public/images/projects/` (`default.png` referenciado e inexistente). Nomes, descrições e linguagens finais NÃO estão no código. **No novo site, congelar esses dados em JSON no build** (consultar a API uma vez; confirmar com você) e traduzir as descrições.

### Tecnologias (ícones do Devicon `@latest` via CDN)

Linguagens: Java, TypeScript, C#, Node.js, Dart, SQL. Frontend: HTML, CSS, React, Next.js, Angular, TailwindCSS. Mobile: Flutter, Xamarin. Backend: Spring Boot, Node.js. Bancos: Oracle, PostgreSQL, MySQL, SQLite. DevOps/Cloud: Docker, Cloudflare, Linux, GitHub Actions. Observabilidade: Prometheus, Grafana. Mensageria/cache: RabbitMQ, Redis. Ferramentas: Adobe Illustrator, Photoshop, Docker (duplicado), Figma, Git, GitHub, Insomnia, IntelliJ, Maven, Postman, VS Code. Corrigir: duplicatas e "Desevolvimento" no pt.

### Hobbies, Wrapped, Currículo, Rodapé

- Xadrez: texto `chess_text`; usuário chess.com `raphael-sena` (perfil e estatísticas Rapid, via `api.chess.com` no cliente).
- Música: texto `spotify_text`; widgets de terceiros (ver seção 5).
- Git Wrapped: link `git-wrapped.com/profiles/raphael-sena` e duas imagens em `public/images/`.
- Currículo: viewer PDF embutido (`@react-pdf-viewer`); en e de usam o PDF em inglês, pt usa `Currículo_Raphael_Sena.pdf` (128 KB cada).
- Rodapé: "Made with 🤙 by @raphael-sena", links para o perfil, o repo e o fork.
- UI: alternância de tema claro/escuro, seletor de idioma com bandeiras, botão voltar ao topo.

## 3. Assets (`code/public/`)

- Currículos: 2 PDFs (~128 KB). Favicon: `code/app/favicon.ico` e `app/favicon_io/*` (o `site.webmanifest` tem nome vazio e caminhos de ícone errados).
- Sem imagem OG dedicada (usa `avatar.png` 142 KB).
- Pesadas: `profile.jpg` 1,3 MB (usada), `profile_photo_2.JPEG` 3,1 MB e `profile_photo.JPEG` 771 KB (provavelmente sem uso), `spotify.gif` 662 KB, certificados 235–518 KB, `git-wrapped*.png` 140–293 KB, `agencia_de_software.png` 362 KB.
- Logos em `images/experience` e `images/education` (pequenos). Provavelmente sem uso: `avaso-technology-solutions.png`.
- Fontes legadas: Geist local (sem uso aparente), Google Fonts Oswald e Rubik via `<link>`. O redesign usa outras (ver BRIEF).

## 4. Dependências e configuração

- `code/package.json` 1.1.0, **Node 20.x**, npm. Next ^14.2.21, React ^18, Tailwind ^3.4.1, TypeScript ^5, ESLint ^8; axios, `@react-pdf-viewer/*`, `pdfjs-dist ^3.11.174`, react-icons, react-world-flags, `react-intersection-observer`, `@vercel/analytics`, `@vercel/speed-insights`, `@microsoft/clarity`; `ignore-loader` e `null-loader`. `react-github-btn` parece sem uso.
- `next.config.mjs`: `remotePatterns` para `avatars.githubusercontent.com` e `images.chesscomfiles.com`; fallbacks webpack para `canvas`, `fs`, `path`. Sem `vercel.json`. Sem testes nem CI.

## 5. Integrações

| Integração                                                                                                                                                                                                                                                                                                                                      | Endpoint                                                                                                                                  | Env                              |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| Chess.com                                                                                                                                                                                                                                                                                                                                       | `api.chess.com/pub/player/raphael-sena` (+`/stats`)                                                                                       | nenhuma                          |
| GitHub API                                                                                                                                                                                                                                                                                                                                      | `api.github.com/repos/raphael-sena/<repo>` (+`/languages`)                                                                                | nenhuma                          |
| Spotify (sem OAuth)                                                                                                                                                                                                                                                                                                                             | imagens de serviços de terceiros (`spotify-github-profile.kittinanx.com`, `spotify-recently-played-readme.vercel.app`), usuário `sena_31` | nenhuma                          |
| Last.fm                                                                                                                                                                                                                                                                                                                                         | `lastfm-recently-played.vercel.app/api?user=raphael_sena`                                                                                 | nenhuma                          |
| Microsoft Clarity                                                                                                                                                                                                                                                                                                                               | SDK                                                                                                                                       | `NEXT_PUBLIC_CLARITY_PROJECT_ID` |
| Vercel Analytics e Speed Insights                                                                                                                                                                                                                                                                                                               | gerenciado                                                                                                                                | nenhuma                          |
| Devicon / Google Fonts                                                                                                                                                                                                                                                                                                                          | CDN                                                                                                                                       | nenhuma                          |
| Não há rotas de API próprias. As três imagens de música recarregam a cada 5 s (tráfego contínuo).                                                                                                                                                                                                                                               |
| **Implicação para o BRIEF:** o brief prevê `/api/spotify` e `/api/chess` no Worker, mas o legado não tem credenciais Spotify (usa widgets de terceiros). Decidir: Worker com a API do Spotify (exige credenciais, ver INPUTS-NEEDED) ou manter widgets/placeholder. Chess.com é API pública sem chave, então o Worker pode fazer proxy e cache. |

## 6. Lacunas e dívidas (não replicar)

- **i18n/SEO:** tudo client-side, `layout.tsx` é client component, `metadata.tsx` é código morto, sem sitemap, robots, canonical, JSON-LD ou hreflang. Conteúdo só aparece após JS.
- **Qualidade:** `alt` incorreto em várias imagens, ids duplicados, "Github Wrapped" e "Hobbies" hardcoded, imagens sem otimização, sem tratamento de erro nos fetches.

## 7. A confirmar antes de reconstruir

1. Cargo, data (05/2025) e bio da Modaxo continuam atuais?
2. O alemão continua no escopo?
3. Nome, descrição e linguagens finais dos 5 repositórios; congelar via API?
4. Instagram e WhatsApp continuam públicos?
5. Qual currículo é o definitivo (pt/en) e o nome do arquivo sem acento (com 301 do antigo)?
6. As métricas (42,6%, 177K, 40000 candidatos) continuam válidas para publicar?
