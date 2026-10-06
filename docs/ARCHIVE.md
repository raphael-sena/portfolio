# ARCHIVE: histórico de versões e linha do tempo

Análise somente leitura (subagente E do G0). Nenhuma tag além de `site/2026` foi criada. Os SHAs abaixo são PROPOSTAS, aguardando OK do usuário.

## Tags existentes

- `site/2026`: anotada, aponta para `d30b96fd5270028b3344253b1af43db88c86cdc1` (2026-05-08, "docs: update Resumes"). Local e remota.
- `v1.0.0`: leve, aponta para `913fe9bf2227b9abc6da64c28ad3106a373b4c45` (2025-01-06, merge do PR #21). Local e remota. Não segue o padrão `site/*`.

## Estatísticas

143 commits, de 2024-09-13 (`1f05212`, "first commit") a 2026-05-08. Linha única de história (branch `dev` mergeada por PRs #1 a #25). Autoria: 137 "raphael sena" + 6 "Raphael Sena" (mesma pessoa).

## Conclusão principal

Não há versões visuais ou arquiteturais muito distintas. A stack nunca mudou: Next.js 14 App Router + React 18 + TypeScript + Tailwind 3. Nunca houve `output: 'export'` (build tipo servidor/Vercel, `next/image` com `remotePatterns`). A mudança é incremental:

- 2024-09-13: template create-next-app (esqueleto).
- 2024-12-20 a 12-30: construção do site inteiro (≈20 PRs em 10 dias).
- 2025-01: extracurricular e Resume.
- 2025-06/08: E1, Clarity, bandeiras.
- 2025-12-03/04: currículo LaTeX, tecnologias, projetos.
- 2026: analytics e currículos.
  `code/` não é marco de redesign, só reorganização (2fe9773, 2024-12-20). Diferenças visuais NÃO foram verificadas (sem checkout/build).

## Candidatas (app completo verificado com `git ls-tree`)

| Versão                             | SHA                                                       | Data       | Evidência                                                                                                                            | Node provável             | Risco de build hoje                            |
| ---------------------------------- | --------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- | ---------------------------------------------- |
| 2024 (primeiro site completo)      | `8303d121cc2bdaacdbf36fff23b5d3ae8ac4a360` (merge PR #20) | 2024-12-30 | 81 arquivos; Header, Intro, Experience, Education, Technologies, FeaturedProjects, Hobbies (Spotify/Chess), tema e idioma, PdfViewer | 18.17+/20 (sem `engines`) | Médio: `canvas ^3` (nativo), `pdfjs-dist ^3.4` |
| 2025-01 (= `v1.0.0`)               | `913fe9bf2227b9abc6da64c28ad3106a373b4c45`                | 2025-01-06 | 96 arquivos; extracurricular (Alura, Udemy, RedHat), Resume.tsx                                                                      | 18.17+/20                 | Médio: `canvas ^3`, next 14.2.21               |
| 2025 (antes do redesign de seções) | `8235c76e65a47d50b4e0748890e1088301d5c13c` (merge PR #24) | 2025-08-03 | Remove `canvas`, adiciona Clarity e `react-world-flags`; next 14.2.30; Node 20.x                                                     | 20.x (`engines`)          | Baixo                                          |
| 2025 (final do ano)                | `2e136ecf4c81b8237e33f85d57c00a57f42d5ec3`                | 2025-12-04 | Currículo LaTeX, TechIcon, remediar e dress-manager. Quase idêntico ao `site/2026`                                                   | 20.x                      | Baixo                                          |
| 2026                               | tag `site/2026` (`d30b96f`)                               | 2026-05-08 | Estado atual, + `@vercel/analytics`                                                                                                  | 20.x                      | Baixo                                          |

Descartadas (esqueletos sem conteúdo): `54b6852`, `a2e48e4`, `2fe9773`, `8c072cc`.

## Proposta de tags retroativas (aguardando OK; nada criado)

| Tag proposta | SHA                                        | Justificativa                                                                                                                            |
| ------------ | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `site/2024`  | `8303d121cc2bdaacdbf36fff23b5d3ae8ac4a360` | Primeiro site completo, 2024-12-30. Alternativa: `913fe9b` (`v1.0.0`, 2025-01-06), que já é uma marca do autor, mas cai em 2025.         |
| `site/2025`  | `8235c76e65a47d50b4e0748890e1088301d5c13c` | Último estado antes do redesign de seções de dezembro, com build mais seguro (sem `canvas`). Alternativa: `2e136ec`, quase igual à 2026. |

Recomendação do subagente: no máximo duas versões antigas. Se a ideia é mostrar evolução visual, o repo só sustenta "2024-12/2025-01" contra "2026". Decisão do usuário: quantas e quais. A `v1.0.0` permanece como está; não se mexe em tags existentes.

## Alternativas caso se queira mais versões (não verificadas)

Outro repositório do autor anterior a set/2024, Wayback Machine de raphaelsena.com, previews antigos de deploy na Vercel (se não expiraram).

## Cuidados de build para `archive/<ano>/`

- Raiz do app em `code/`, `npm ci` com Node 20. O lockfile é do npm.
- Nenhuma versão tem `output: 'export'`: o arquivamento exige patch (`archive/patches/<ano>.patch`) com `output: 'export'`, `images.unoptimized`, `basePath: /<ano>` e remover o que depende de servidor (rotas de API Spotify/xadrez). Esses trechos dependem de dados dinâmicos e precisarão de fallback.
- Versões com `canvas ^3.0.0` (de `8303d12` até `505149b`) exigem binário nativo; pode falhar em Node/arquitetura novos (`--ignore-scripts` ou aplicar o fallback do webpack).
- **ALERTA:** `code/.env` está versionado a partir de `8235c76`. O conteúdo NÃO foi lido. Verificar o que há nele (sem imprimir) antes de qualquer publicação em `archive/`, e considerar rotacionar eventuais chaves. O repo é público no GitHub.
- `next.config` referencia `ignore-loader`: conferir se está nas dependências.

## Como arquivar uma nova versão no futuro

1. Criar a tag `site/<ANO>` (anotada, com `GIT_COMMITTER_DATE` do commit).
2. Acrescentar a entrada em `archives.json`.
3. Rodar `pnpm archive:build` (só o que falta) ou `pnpm archive:rebuild <ano>`.
