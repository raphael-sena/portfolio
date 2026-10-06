# INPUTS-NEEDED: o que preciso que você forneça

Nunca envie segredos no chat. Use `wrangler secret put` ou `.dev.vars` (gitignored) quando eu pedir.

## Bloqueia o G1

| #   | Item                                                   | Observação                                       |
| --- | ------------------------------------------------------ | ------------------------------------------------ |
| 1   | Respostas às 5 perguntas de PLAN.md seção 8            | alemão, tags retroativas, deploy, Spotify, hooks |
| 2   | OK da tabela de versões (ARCHIVE.md)                   | só depois crio as tags                           |
| 3   | Confirmar que posso ler a doc oficial na web (versões) | feito pelo agente, só aviso                      |

## Conteúdo (CONTENT-TODO.md detalha por página)

| Item                                                                                           | Para quê                            | Estado                                                                 |
| ---------------------------------------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------- |
| Currículo definitivo em PDF (pt e en)                                                          | `resume_download`, `/curriculo.pdf` | existem 2 PDFs no legado (128 KB); confirmar qual é o definitivo       |
| Textos do protótipo marcados [EXEMPLO] (Sobre, projetos, tecnologias, linha do tempo, contato) | G3                                  | placeholders até você fornecer                                         |
| Cargo, data (05/2025) e bio da Modaxo; confirmar métricas (42,6%, 177K, 40000)                 | Experiência                         | só publico o que você confirmar                                        |
| Nome, descrição e linguagens dos 5 repositórios                                                | Projetos                            | posso consultar a API do GitHub uma vez para congelar; confirme        |
| Canais de contato públicos (e-mail, LinkedIn, GitHub, Instagram, WhatsApp)                     | Contato                             | legado expõe todos; quais ficam?                                       |
| Lista de URLs antigas para 301                                                                 | G6                                  | legado só tem os PDFs e imagens; sem outras páginas                    |
| Imagens (retrato, capturas de projetos)                                                        | HatchPlaceholder                    | legado tem `profile.jpg` 1,3 MB, avatar; capturas em `images/projects` |

## Modelo 3D

`design/3d/cortland_256k_personal_computer_system.glb` está no repo. **[LICENÇA e AUTORIA PENDENTES]**: preciso da fonte e licença (CC-BY exige atribuição). Antes disso, uso o cubo CSS 3D do protótipo.

## Umami

`UMAMI_HOST` (secret do Worker) e `NEXT_PUBLIC_UMAMI_WEBSITE_ID`. No servidor Umami, orientar: cadastrar o domínio novo, `TRACKER_SCRIPT_NAME` e `COLLECT_API_ENDPOINT` opcionais, IP real via `cf-connecting-ip`.

## APIs

- **Spotify:** client id, secret e refresh token por `wrangler secret put` (se a opção API for escolhida).
- **Chess.com:** API pública, sem credenciais (usuário `raphael-sena`).

## Infra e DNS (INFRA.md)

- Config do projeto na Vercel: domínio primário, regra apex para www, aliases, time.
- Status da zona na Cloudflare (existe? pending ou active? NS atribuídos?).
- Lista completa de registros no Namecheap (Advanced DNS) e regras do Email Forwarding.
- Como a propriedade do Search Console foi verificada (não há TXT no apex): meta tag, arquivo ou outro?
- Renovação automática do domínio (expira em 2026-12-20).
- Confirmação de que o repo GitHub `raphael-sena/portfolio` deve ter o `main` protegido (CI obrigatório) e as GitHub Actions habilitadas (só você configura as proteções).

## Segurança (urgente, independente do plano)

`code/.env` está versionado no repositório (público) desde `8235c76`. Contém `NEXT_PUBLIC_CLARITY_PROJECT_ID` (pública por natureza), mas **verifique se há mais alguma chave nele** e se quer removê-lo do histórico futuro (não reescrevo histórico sem sua ordem; as tags apontam para SHAs).

## Ações que só você pode fazer

Trocar nameservers no Namecheap, fornecer secrets, fornecer o modelo 3D e sua licença, configurar proteções de branch, qualquer ação na Vercel.
