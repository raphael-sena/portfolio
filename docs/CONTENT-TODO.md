# CONTENT-TODO

Placeholders visíveis e textos a confirmar, por página. Regra do BRIEF: não inventar números, cargos, datas, projetos nem depoimentos. Textos em `src/content/{pt,en,de}/index.ts`; dados neutros em `src/content/data/`.
Os textos em `en` e `de` foram traduzidos do pt (revisão: `src/content/reviewed.json`; `de` só vira `true` quando o usuário disser que revisou).

## Decisões do usuário ainda abertas

| Item                                                   | Estado                                                                                                                                                                             |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Instagram e WhatsApp no Contato                        | **Não publicados** (o usuário não respondeu "manter ou remover"). O site novo mostra GitHub, LinkedIn e e-mail, o que também faz a frase "Três maneiras de falar..." ficar correta |
| Imagens (retrato, capturas dos projetos e das versões) | Placeholders de gravura. O legado tem capturas em `../portfolio-legacy/code/public/images/projects/` (coloridas); decidir se entram em preto e branco                              |
| Nome de terceira pessoa em Projetos                    | A descrição do repositório `dress-manager` cita "Renata Senna" (texto público do GitHub, mantido). Confirmar se deve ficar                                                         |

## Placeholders por página

| Página         | Placeholder                                                                                                                                                                                                              | Texto sugerido                                                 |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| Sobre          | O retrato do autor (opcional): hoje a figura da página é a gravura "The Newspaper Correspondent" (Edwin Forbes, 1876, domínio público, via Wikimedia Commons). A frase de destaque é paráfrase do legado e vale conferir | Retrato do autor (se quiser)                                   |
| Experiência    | `[CARGO]` e `[PERÍODO]` da Modaxo                                                                                                                                                                                        | Aguardam o usuário (cargo e data da Modaxo, 05/2025 no legado) |
| Projetos       | `Fig. N — [CAPTURA DO PROJETO]` (5 projetos)                                                                                                                                                                             | Capturas de tela dos 5 repositórios                            |
| Linha do tempo | `[UMA FRASE SOBRE O DESIGN E O CÓDIGO]` e `[UMA FRASE SOBRE O APRENDIZADO]` nas edições 2024, 2025 e 2026; `[UMA FRASE SOBRE O APRENDIZADO]` na edição atual; `[CAPTURA DA VERSÃO DE ANO]`                               | Dados reais em `archives.json`; as frases são do usuário       |

## Do protótipo, a confirmar

Estes textos vieram do protótipo (`design/design-gazeta`) e foram publicados como estão. O usuário revisa:

- Home e Sobre, parágrafo de abertura: "Raphael Sena estuda Engenharia de Software na PUC Minas e trabalha com plataformas de bilhetagem eletrônica e gestão de receita de transporte...". Afirma o vínculo atual (Modaxo) sem citar cargo nem data.
- Manchete "Desenvolvedor de software apresenta suas obras ao público", ficha do redator (Interesses: "Arquitetura de software e requisitos").
- Contato: "As cartas à redação costumam ser respondidas com rapidez."

## Do legado, a confirmar que ainda valem

- Agência Experimental de Software (09/2024 até hoje) e Avaso (09/2023 até hoje) como vínculos atuais; PUC Minas, técnico de TI (09/2021 a 09/2023).
- Formação: PUC Minas 07/2023 a 07/2027; Kogarah High School 07/2017 a 01/2018.
- Cursos: Red Hat RH124 (mai/2024), Udemy Java (dez/2023), Alura Java POO (dez/2023), Alura JavaScript back-end (nov/2021), com os links de certificado do Google Drive do legado.
- Chaves do legado sem uso aparente (`intern`, `technician_assistant`): não migradas.

## Corrigido ao migrar (erros do legado)

Docker e Node.js duplicados em Tecnologias; "Desevolvimento"; "Sydney/NGS" (agora NSW); `alt` incorretos (os placeholders têm `role="img"` e `alt` próprios); ids duplicados no DOM; "Intellij" para "IntelliJ IDEA"; "Github Actions" para "GitHub Actions"; o alemão apontava para o currículo em inglês (mantido, mas agora declarado em `RESUME_FILES`).

## Alemão: glossário e registro (proposta para o usuário)

Registro neutro e profissional, sem "du" nem "Sie". Termos propostos (em `src/content/glossary.json`):

| pt                                                                                                            | de                                      | en                         |
| ------------------------------------------------------------------------------------------------------------- | --------------------------------------- | -------------------------- |
| bilhetagem eletrônica                                                                                         | elektronisches Fahrgeldmanagement (EFM) | electronic ticketing       |
| gestão de receita de transporte                                                                               | Einnahmenverwaltung im Nahverkehr       | transit revenue management |
| Engenharia de Software                                                                                        | Softwaretechnik                         | Software Engineering       |
| desenvolvedor de software                                                                                     | Softwareentwickler                      | software developer         |
| Alternativa para "bilhetagem": "E-Ticketing". O legado usava "Softwaretechniker", que sugere técnico; evitei. |

## Pendências de tradução

Sem provedor definido para `pnpm i18n:translate`: DeepL ou um modelo de linguagem (decisão do usuário). Hoje o script lista as chaves defasadas por hash; en e de foram traduzidos nesta fase e o lock está em dia.

## Currículo novo (2026-10-06): aplicado ao site

O currículo em inglês (`public/resume-raphael-sena.pdf`) virou a fonte do conteúdo de **Experiência, Formação, Projetos, Tecnologias, Sobre e Home**, em pt (fonte), en (texto do próprio currículo) e de (tradução, `reviewed: false`). O autor liberou o uso dos números e datas que constam do currículo.

| Tema         | Aplicado                                                                                                                                                                                                                                                              |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Experiência  | New Energy Soluções Elétricas (freelance, mar/2026 a hoje), Modaxo (Software Engineer, mai/2025 a hoje), AVASO (set/2023 a mai/2025, encerrado), Sociedade Mineira de Cultura / PUC Minas (técnico de TI, set/2021 a set/2023), cada um com os destaques do currículo |
| Formação     | PUC Minas com Agência Experimental de Software (PMMG, Tech Lead), Campeão de Projeto Interdisciplinar (2x) e projeto de pesquisa; Kogarah High School agora set/2017 a dez/2017, como no currículo                                                                    |
| Projetos     | Remediar (texto e stack do currículo) e **Rural ERP + AI Copilot** (TCC, sem link de código); os outros quatro seguem dos repositórios do GitHub                                                                                                                      |
| Tecnologias  | 12 grupos a partir da seção "Skills" do currículo (acrescentados Arquitetura, Autenticação e integração, Testes e qualidade, Práticas e Domínio)                                                                                                                      |
| Sobre e Home | Perfil do currículo; ficha ganhou "Idiomas" (português nativo, inglês C1, espanhol A2, alemão B1); JSON-LD ganhou `knowsLanguage`                                                                                                                                     |
| Removido     | "Agência Experimental de Software (Cuido Bem)" como emprego atual e "Cursos extras" continuam como estavam (os cursos não aparecem no currículo novo, mas também não o contradizem). O **telefone** do cabeçalho do PDF não foi levado para o site                    |

### Ainda a confirmar com o autor

- Se a Agência Experimental (set/2024, projeto Cuido Bem, do legado) deve voltar como experiência: o currículo novo só a cita na formação.
- Os números do currículo estão no ar (177 mil usuários, 47 cidades, 695 mil downloads, 120 sistemas, 40 mil candidatos, 95% de SLA, 100+ usuários, 20 milhões a 1 trilhão para 1 milhão de operações). Qualquer ajuste deve ser feito no currículo e nos dicionários.
- A Profa. Lucila Ishitani é citada pelo nome no projeto de pesquisa (como no currículo).
- Versão em português do currículo em PDF (`curriculo-raphael-sena.pdf` ainda é a antiga).

## Atualização de 2026-10-06 (versões do currículo em `public/`)

- Fonte do texto em português: `raphael_sena_resume-12.pdf` (agora publicado como `curriculo-raphael-sena.pdf`). Inglês e alemão acompanham o pt. Novidades: levantamento de requisitos (perfil, New Energy, PMMG, Interdisciplinar, Remediar, ERP Rural) e o grupo "Requisitos e produto" em Tecnologias.
- O PDF em inglês (`resume-raphael-sena.pdf`) ainda é a versão sem as linhas de requisitos: falta uma versão em inglês do 12. Não há PDF em alemão (o alemão usa o inglês).
- `raphael_sena_resume-5` a `-11` são variantes de currículo (IA, mobile, Java legado, backend/AWS, português anterior). Não estão no git nem publicadas.
- Linha do tempo: "O que mudou" de 2024, 2025 e 2026 vem do diff das tags `site/*`; "O que aprendi" continua placeholder.
