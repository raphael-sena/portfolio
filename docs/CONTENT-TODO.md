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

| Página         | Placeholder                                                                                                                                                                                | Texto sugerido                                                                                                                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sobre          | `[PARÁGRAFO SOBRE VOCÊ...]`, `[UMA FRASE SUA PARA DESTACAR]`, `[SEGUNDO PARÁGRAFO...]`, `[RETRATO]`, `Fig. 1 — [LEGENDA DO RETRATO]`                                                       | Semente: o `about_text` do legado, em `../portfolio-legacy/code/services/translations.ts` (en, pt e de). Ele cita cargo e empresa atuais; só entra o que o usuário confirmar |
| Experiência    | `[CARGO]` e `[PERÍODO]` da Modaxo                                                                                                                                                          | Aguardam o usuário (cargo e data da Modaxo, 05/2025 no legado)                                                                                                               |
| Projetos       | `Fig. N — [CAPTURA DO PROJETO]` (5 projetos)                                                                                                                                               | Capturas de tela dos 5 repositórios                                                                                                                                          |
| Linha do tempo | `[UMA FRASE SOBRE O DESIGN E O CÓDIGO]` e `[UMA FRASE SOBRE O APRENDIZADO]` nas edições 2024, 2025 e 2026; `[UMA FRASE SOBRE O APRENDIZADO]` na edição atual; `[CAPTURA DA VERSÃO DE ANO]` | Dados reais em `archives.json`; as frases são do usuário                                                                                                                     |

## Do protótipo, a confirmar

Estes textos vieram do protótipo (`design/design-gazeta`) e foram publicados como estão. O usuário revisa:

- Home e Sobre, parágrafo de abertura: "Raphael Sena estuda Engenharia de Software na PUC Minas e trabalha com plataformas de bilhetagem eletrônica e gestão de receita de transporte...". Afirma o vínculo atual (Modaxo) sem citar cargo nem data.
- Manchete "Desenvolvedor de software apresenta suas obras ao público", ficha do redator (Interesses: "Arquitetura de software e requisitos").
- Contato: "As cartas à redação costumam ser respondidas com rapidez."

## Do legado, a confirmar que ainda valem

- Agência Experimental de Software (09/2024 até hoje) e Avaso (09/2023 até hoje) como vínculos atuais; PUC Minas, técnico de TI (09/2021 a 09/2023).
- Formação: PUC Minas 07/2023 a 07/2027; Kogarah High School 07/2017 a 01/2018.
- Cursos: Red Hat RH124 (mai/2024), Udemy Java (dez/2023), Alura Java POO (dez/2023), Alura JavaScript back-end (nov/2021), com os links de certificado do Google Drive do legado.
- **Removidos de propósito** (números que o usuário mandou não publicar sem confirmação): 42,6% (Sigom Cloud), 177K (SIGO), 40000 candidatos (PMMG), além de "mais de 100 usuários" (migração de telefonia). Também não entrou o cargo "Software Engineer" da Modaxo nem os projetos Sigom Cloud, SIGO e SIGO 2.0.
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
