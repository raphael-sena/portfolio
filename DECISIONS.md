## 2026-10-06 — Currículo, textos do legado e arte de jornal envelhecido

- **Currículo**: `raphael_sena_resume-12.pdf` (pt, com New Energy e levantamento de requisitos) é a fonte do texto e passou a ser o `curriculo-raphael-sena.pdf`. Inglês e alemão acompanham o pt. As variantes `-5` a `-11` ficam fora do git e da publicação.
- **Sobre**: parágrafos 2 e 3 e a frase de destaque vêm do `about_text`, do texto de xadrez e do de música do portfólio legado (tag `site/2026`); a frase de destaque é paráfrase do legado.
- **Linha do tempo**: "O que mudou" de 2024/2025/2026 saiu do diff das tags `site/*`.
- **Arte**: papel de `#F5F3EC` para `#F3EEDF` (e cinzas um pouco mais quentes), vinheta marrom com manchas de oxidação na textura e anúncios (`Callout`) com moldura dupla e ornamento, por referência a uma página de anúncios de jornal antigo. Mudança deliberadamente sutil; `docs/DESIGN-SPEC.md` mantém os valores originais do protótipo.
- **Figura da página Sobre**: gravura "The Newspaper Correspondent" (Edwin Forbes, 1876, Missouri Historical Society; domínio público, via Wikimedia Commons), redimensionada para 960 px em WebP (`public/art/the-newspaper-correspondent.webp`), no lugar do placeholder de retrato. Crédito e link na legenda.

## 2026-10-06 — Vinhetas, capitulares, linha do tempo e giro do computador

- **Vinheta do letreiro**: diagrama de linotipo (De Vinne, 1904; domínio público, Wikimedia Commons) como traço transparente (`public/art/linotype-mark.webp`, 240 px) entre "Raphael" e "Sena", com o centro na linha de base e as palavras coladas (`em`, acompanha o tamanho do título). Crédito no rodapé de todas as páginas. Os selos "Engenharia de Software / PUC Minas" e "Belo Horizonte / Minas Gerais" foram removidos da capa.
- **Capitulares ilustradas**: `R` (Printing World) em "Raphael Sena é…" e a cena de "The Last Chronicle of Barset" como `S` em "Sou/Software/Softwareentwickler…" no Sobre. Largura e altura fixas (sem CLS); a letra continua no texto para leitores de tela (a capitular de texto também ganhou a letra `sr-only`).
- **Linha do tempo**: 2024 deixa de ser cartão (`"timeline": false` em `archives.json`; `/2024/` continua no ar, noindex). "O que aprendi" removido. Gravura do homem com relógio (Popular Science Monthly, vol. 88, 1916) na quarta coluna.
- **Projetos**: removidos Recipes & Flavors e Relatório Fotográfico.
- **Computador**: gira sozinho a 8°/s e o quadriculado no sentido oposto, no celular e no desktop; sem giro com `prefers-reduced-motion`; arrasto só com mouse. No celular o 3D começa na primeira interação ou 5 s após o `load` (a versão sem adiamento derrubava a home para 0,88–0,91 no Lighthouse). Poster `eager` (está na primeira tela do celular).

## 2026-10-06 — Fundo da página: o navegador decide

- O fundo escuro `#161616` com listras (`.bg-stage-hatch`) foi removido de `html`, `body` e da pilha de folhas: o fundo passa a ser o do navegador (transparente). Também saíram o token `--color-stage`, o `themeColor` escuro do `<head>` e o "Fundo escuro" da paleta do `/design-system/`; o `manifest` usa o papel (`#F3EEDF`). A imagem OG e o resto do conteúdo não mudam.
