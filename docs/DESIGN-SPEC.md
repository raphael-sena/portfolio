# DESIGN-SPEC: "Gazeta de 1900" (extraída dos protótipos)

Fonte: `design/design-gazeta/` (`LEIAME.md` + 8 `.dc.html`), subagente C do G0. Os protótipos usam um runtime (`support.js`) que não está na pasta; tudo vem do CSS inline e do script. O modelo `design/3d/cortland_256k_personal_computer_system.glb` existe, mas não foi inspecionado. **[REAL]** = texto aparentemente definitivo, **[EXEMPLO]** = placeholder. Os protótipos são ESPECIFICAÇÃO VISUAL: reimplementar em React + Tailwind, sem copiar HTML.

## 1. Componentes

Os protótipos não têm componentes nomeados, só HTML repetido; os nomes abaixo são os do BRIEF/sugeridos.

**PageStack** (cenário escuro com a pilha de folhas)

- Fundo: `#161616` + `repeating-linear-gradient(45deg, rgba(255,255,255,.045) 0 1px, transparent 1px 8px)`; padding `28px 44px 52px 24px`; `overflow:hidden`. Contêiner da folha: `max-width:1180px`, centralizado, `perspective:2200px` na home.
- 4 folhas decorativas (`aria-hidden`, `inset:0`, `border:1px solid #111`, `box-shadow:0 1px 2px rgba(0,0,0,.5)`), de trás para frente:

| Folha | Cor     | translate  | rotate   |
| ----- | ------- | ---------- | -------- |
| 1     | #CFCCC0 | 26px, 24px | -0.35deg |
| 2     | #D9D6CB | 19px, 17px | +0.4deg  |
| 3     | #E6E3D8 | 12px, 11px | -0.25deg |
| 4     | #EFEDE3 | 6px, 5px   | +0.2deg  |

- Folha principal: `#F5F3EC`, `border:1px solid #111`, `box-shadow:0 6px 18px rgba(0,0,0,.55)`, `padding-bottom:96px`. Páginas internas: `z-index:5`, `overflow:hidden`, gradiente de lombada `linear-gradient(to right, rgba(0,0,0,.10), rgba(0,0,0,0) 28px)`. Home: `z-index:2`, `transform-origin:left center`, `backface-visibility:hidden`, sem lombada. Conteúdo interno: `max-width:1120px`, `padding:20px 20px 0`.

**PaperTexture** (SVG, `inset:0`, `pointer-events:none`, `mix-blend-mode:multiply`, `z-index:3`, `aria-hidden`). No protótipo: filtro `paperGrain` (`feTurbulence fractalNoise`, `baseFrequency .85`, 2 oitavas, seed 4, tile 300×300, opacidade .7), `paperMottle` (`baseFrequency .006`, 3 oitavas, seed 11, tile 900×900, opacidade .3) e vinheta radial (0 a 0,2 de opacidade preta em 60% a 100%). **Em produção: WebP repetido de ~256px com `mix-blend-mode: multiply`** (BRIEF). IDs de SVG são globais; usar `useId` ou um único SVG.

**Masthead**: home em flex wrap, `gap:12px 28px`, `padding:18px 0`: título "Raphael Sena" em UnifrakturMaguntia `clamp(52px,9vw,112px)`, `line-height:1.05`; subtítulo itálico 20px "Gazeta de um desenvolvedor de software"; duas caixas laterais (`flex:0 1 150px`) "Engenharia de Software / PUC Minas" e "Belo Horizonte / Minas Gerais". Páginas internas: centralizado, `padding:14px 0`, título como link para o início, `clamp(44px,6.5vw,72px)`, subtítulo 19px; sem caixas.

**Dateline**: flex wrap, `justify-content:space-between`, `padding-bottom:6px`, `border-bottom:1px solid #111`; Pathway Gothic One 19px, `letter-spacing:.14em`, caixa alta. "Belo Horizonte, Minas Gerais" | "Edição de 2026" | terceiro item (home: "Preço: um clique"; internas: "{Seção} · Página N").

**NavBar** (`<nav aria-label="Principal">`): `border-top` e `border-bottom` de `4px double #111`; itens `min-height:48px`, `padding:0 16px`, Pathway 23px, `.14em`, caixa alta. Itens: Sobre, Experiência, Projetos, Tecnologias, Linha do tempo, Contato (**Início fora da barra**; acessível pelo letreiro e pelo rodapé). Estados: hover e atual (`aria-current="page"`) invertidos (`#111` com texto `#F5F3EC`); visitado continua `#111`; foco `outline:3px solid #111; outline-offset:3px`.

**PageEar** (canto inferior direito)

- `<a href=próxima aria-label="Virar a página: X, página N">` com área `96×96px`, `z-index:7`, `touch-action:none`, `cursor:grab`. Overlay visual `aria-hidden`, `z-index:6`, `pointer-events:none`.
- `.curl` quadrado de 44px em repouso, `transform-origin:100% 100%`. Face de baixo: `clip-path:polygon(100% 100%,0 100%,100% 0)`, `#E4E1D5` com hachura `repeating-linear-gradient(45deg, rgba(17,17,17,.3) 0 1px, transparent 1px 7px)` e sombra `linear-gradient(135deg, transparent 50%, rgba(0,0,0,.38) 50%, rgba(0,0,0,0) 78%)`. Rótulo: "Página N" em Pathway 22px (`.2em`) e nome da seção em Bodoni Moda SC 800 32px. Dobra: `clip-path:polygon(0 100%,100% 0,0 0)`, `linear-gradient(315deg,#A9A597 50%,#E7E4D8 72%,#F5F3EC 100%)`, `drop-shadow(-3px -3px 5px rgba(0,0,0,.35))`.
- Dica `aria-hidden` "Puxe a orelha · página N →" (Pathway 19px, `.16em`, `right:72px; bottom:16px`).
- Estados: repouso (44px, pulso `earHint` 3,2 s: escala 1 a 1,35 em 85%); arrastando (sem transição); concluindo (1800px, `.55s ease-in`).
- Sequência: 1 Início > 2 Sobre > 3 Experiência > 4 Projetos > 5 Tecnologias > 6 Linha do tempo > 7 Contato > 1.

**PageTurn** (só na home, pelo menu): `perspective:2200px`; folha atual `rotateY(0 a -180deg)`, origem esquerda, `backface-visibility:hidden`, 1 s `ease-in forwards`; overlay `.shade` `linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,.65))`, opacidade 0 a 1; folha de baixo com "Página N" (Pathway 26px, `.3em`), `hr` de `4px double` (máx. 420px), nome da seção em Bodoni 800 `clamp(48px,8vw,104px)` e "Virando a página…" (itálico 20px).

**MacViewer** (computador compacto)

- Moldura `role="group"` com `aria-label` "Computador compacto em 3D: arraste para girar ou use os botões abaixo": `height:500px`, `border:3px solid #111`, `box-shadow:0 0 0 6px #F5F3EC, 0 0 0 8px #111`, `touch-action:pan-y`, cursor grab/grabbing. Fundo de raios (`repeating-conic-gradient #111/#F5F3EC 6deg`) com `repeating-radial-gradient` em `mix-blend-mode:difference`, disco central 330px `#F5F3EC` com bordas duplas.
- Objeto: `perspective:1000px`, caixa 200×240, `preserve-3d`, `rotateX(rx) rotateY(ry)`, transição `.45s ease` (nenhuma no arraste). 6 faces SVG à mão (cinzas #F2F0E8, #CFCCC0, #D9D6CB, #E6E3D8; traço `#111` 4px). Inicial `rx -10`, `ry 30`.
- Arraste: `ry = base + dx*0.6`, `rx = clamp(base - dy*0.6, -80, 80)`. Botões "Girar à esquerda" (−45), "Reiniciar", "Girar à direita" (+45): `min-height:44px`, Pathway 21px, `border:2px solid #111`, hover invertido. Legenda "Fig. 1 — Computador compacto, em vista giratória. Arraste para examinar."
- Não há rotação automática nem setas do teclado no protótipo (o texto do Guia as cita).
- Em produção: `.glb` com three.js sob demanda; enquanto não houver modelo, o cubo CSS 3D acima.

**LeaderRow**: flex, `align-items:baseline`, `gap:8px`, `min-height:44px`; rótulo Pathway 22px (`.1em`, caixa alta); espaçador `flex:1 1 16px; border-bottom:2px dotted #111`; valor à direita (pode ser link).
**HatchPlaceholder**: `border:3px solid #111; outline:1px solid #111; outline-offset:4px; padding:12px`; fundo `repeating-linear-gradient(45deg,#111 0 1px,#F5F3EC 1px 8px)`; rótulo central em caixa de papel (Pathway 20px, `.14em`). Alturas: 140 a 300. Hoje sem `alt`.
**Button** (link): `inline-flex`, `min-height:48px`, `padding:0 22px`, `border:2px solid #111`, Pathway 22px (`.14em`), hover invertido.
**Pullquote**: `border-top` e `border-bottom` de `4px double #111`, centralizado, Bodoni Moda SC itálico 600, 24px (Guia) ou 28px (Sobre), `line-height:1.25`.
**Outros**: DropCap (Bodoni 800, 80px, `line-height:.78`, `float:left`); título de coluna (`border-top:4px double`, `border-bottom:1px solid`, Pathway 30px, `.16em`); PageHeader (kicker Pathway 20px `.22em`; h1 Bodoni 800 `clamp(34px,5vw,60px)`; sublinha itálica 20px; `hr` `4px double`); Callout/anúncio (`border:1px solid`, `outline:1px offset 4px`); Ornament (SVG 200×24 com losango); DiamondBullet; ArticleRow (Experiência); ProjectCard; EditionCard (Linha do tempo, selo "Edição atual" invertido); Footer (`border-top:4px double`, links separados por `|`: Raphael Sena, Início, Sobre, Experiência, Projetos, Tecnologias, Linha do tempo, Contato).
**Links de texto**: `#111` sublinhado (`offset:3px`), visitado `#555`, hover invertido, alvo mínimo 44px.

## 2. Tokens

- Cores: papel `#F5F3EC`, tinta `#111111`, visitado `#555555`, cinzas `#F2F0E8 #E6E3D8 #D9D6CB #CFCCC0`, fundo escuro `#161616`. **Usadas no código mas fora da lista do BRIEF:** `#EFEDE3` (folha 4), `#E4E1D5` (face da orelha), `#A9A597` e `#E7E4D8` (dobra); sombras `rgba(0,0,0,.10/.2/.35/.38/.5/.55/.65)`. Sem cor de destaque. Contraste: tinta 17:1; visitado 6,7:1.
- Fontes (Google Fonts): UnifrakturMaguntia 400 (letreiro); Bodoni Moda SC 800/700 com eixo `opsz` 6..96 (manchetes; o Pullquote usa 600 itálico); Pathway Gothic One (menu, etiquetas, botões; maiúsculas; **mínimo 19px**); PT Serif Caption regular e itálico, **sem negrito** (texto, 18px base, `line-height:1.6`, `text-align:justify; hyphens:auto` em parágrafos longos). Fallbacks do protótipo: `Old English Text MT`, `Bodoni 72`/`Didot`, `Arial Narrow`, `Georgia` (não carregados). Tracking: menu/datas `.14em`, kicker `.22em`, botões `.12–.14em`, títulos de coluna `.16em`.
- Tamanhos: letreiro `clamp(52px,9vw,112px)` (home) e `clamp(44px,6.5vw,72px)` (interno); H1 `clamp(34px,5vw,60px)`; bloco 26/28px; menu 23px; etiquetas 21–24px; texto 16–20px.
- Filetes: `1px solid #111`, `2px dotted #111` (leader), `3px solid` + `outline 1px` offset 4px (gravura/caixa), `4px double #111` (menu, título de coluna, rodapé, pullquote, `hr`). Hachuras 45° a cada 8px (gravura), 7px (orelha) e 8px a 4,5% (fundo escuro); padrão SVG `hatchB` 6×6 nas faces do computador.
- Layout: folha 1180px, conteúdo 1120px, padding 20px; gaps de coluna 36–40px.
- **Breakpoints: nenhum `@media` de largura.** Responsividade por `flex-wrap`, `flex-basis` e `clamp()`; só `@media (prefers-reduced-motion: no-preference)`.

## 3. Interações (parâmetros exatos)

- **Virada pelo menu (só na home):** clique faz `preventDefault`, aplica `pageTurn` 1 s `ease-in forwards` (0 a -180deg) e `shade`; em 1000 ms navega; em 1900 ms `back` (`.5s ease-out`, opacidade 0 a 1); em 2500 ms limpa. Dentro de `prefers-reduced-motion: no-preference`.
- **Orelha (todas as páginas):** pointerdown com `setPointerCapture`; `v = max(0, (sx − clientX) + (sy − clientY))`; moveu se `v > 8`; tamanho `earD = min(700, 44 + 0.9·v)`; ao soltar, se moveu e `earD >= 300` conclui (`v ≈ 284`), senão volta a 44 (`.25s ease`). Concluir: `size=1800`, `.55s ease-in`, navega em 650 ms. Clique ou Enter sem arraste também conclui; clique logo após arraste curto é engolido. **Nas páginas internas não há `rotateY`:** a orelha cresce cobrindo a folha e navega.
- **Foco/hover:** `a:hover{background:#111; color:#F5F3EC}`; `:focus-visible{outline:3px solid #111; outline-offset:3px}`.

## 4. Rotas e layout

Estrutura comum: PageStack > folha > Dateline > Masthead > NavBar > `<main>` > Footer > PageEar (o Guia não tem orelha).

| Rota                                                                                                                | Página         | Layout do `<main>`                                                                    |
| ------------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------- |
| `/` (1)                                                                                                             | Gazeta         | 3 colunas wrap: Manchete (260), Centro com MacViewer (420), Aside "Em destaque" (240) |
| `/sobre` (2)                                                                                                        | Sobre          | texto (420) + aside retrato e "Ficha do redator" (280)                                |
| `/experiencia` (3)                                                                                                  | Experiência    | lista de 3 ArticleRow (460) + aside (240)                                             |
| `/projetos` (4)                                                                                                     | Projetos       | 3 cards (280) com filetes entre colunas                                               |
| `/tecnologias` (5)                                                                                                  | Tecnologias    | 4 colunas (220) com DiamondBullet                                                     |
| `/linha-do-tempo` (6)                                                                                               | Linha do tempo | 3 cards de edição (280)                                                               |
| `/contato` (7)                                                                                                      | Contato        | texto e LeaderRows (420) + anúncio (280)                                              |
| (guia)                                                                                                              | GuiaGazeta     | Paleta, Tipografia, Componentes, Movimento (base para `/design-system`)               |
| Os protótipos linkam arquivos relativos; a produção usa as rotas acima e `/curriculo.pdf` (a definir) em `public/`. |

## 5. Conteúdo dos protótipos

- Já fixado como [REAL]: dateline e masthead; manchete da home ("Desenvolvedor de software apresenta suas obras ao público", com lead e parágrafo sobre PUC Minas e bilhetagem); aside "Em destaque" (linha do tempo, currículo, "Procura-se conversa"); ficha do redator (Belo Horizonte, MG; Engenharia de Software, PUC Minas; Arquitetura de software e requisitos; Xadrez); formação 2023–2027; títulos e sublinhas de cada página ("Quem escreve esta gazeta", "Experiência e formação", "Obras publicadas", "Ferramentas do ofício", "Edições anteriores", "Cartas à redação").
- Tudo o mais é [EXEMPLO] e vira placeholder visível e linha em CONTENT-TODO.md: parágrafos de Sobre, pullquote, cargos/períodos, os 3 projetos inteiros, listas de tecnologias (a lista do protótipo é provisória e contém uma instrução ao autor), capturas da linha do tempo, LinkedIn, e-mail e WhatsApp.
- **Cuidado:** os textos "[REAL]" do protótipo ainda precisam da sua revisão e NÃO substituem o conteúdo do legado. Onde divergirem do legado (cargos, datas), vale o que você confirmar.

## 6. Responsividade

- Ordem móvel = ordem do DOM. Ao empilhar, colunas mantêm `border-left` e padding lateral (filetes soltos): remover abaixo de um breakpoint a definir.
- Cenário consome 68px horizontais no celular; folhas de trás (deslocamento até 26px) são cortadas. MacViewer tem altura fixa de 500px e disco de 330px (apertado a ~320px). `touch-action:pan-y` no computador e `none` na orelha.
- Alvos de toque 44–48px. Sem menu móvel específico: 6 itens ocupam 2 a 3 linhas. A orelha fixa no canto da tela no celular (BRIEF).

## 7. Acessibilidade

- Bom: `lang="pt-BR"`, landmarks, `aria-current`, 1 `h1` por página, decoração `aria-hidden`, foco visível, alvos ≥ 44px, orelha como link real, botões equivalentes ao arraste, `prefers-reduced-motion` desliga animações.
- **Lacunas a corrigir na implementação:**
  1. Sem skip link.
  2. O menu da home e a orelha esperam 1 s e 650 ms antes de navegar mesmo com movimento reduzido (o BRIEF pede troca imediata).
  3. Sem `aria-live` nem gestão de foco após a troca de página.
  4. Placeholders de gravura sem `alt` nem `role="img"`.
  5. Foco da orelha praticamente invisível (área transparente; o anel de 3px pode ser recortado).
  6. Sem setas do teclado no MacViewer (o BRIEF exige).
  7. Links `href="#"` sem destino.
  8. Justificado com hifenização pode gerar "rios" em colunas estreitas.

## 8. Discrepâncias (protótipo, BRIEF e arquivos)

1. NavBar sem Início (6 itens) × sequência da orelha com 7. O BRIEF lista Início na sequência: confirmar se o menu deve ter Início ou só o letreiro.
2. Paleta com 4 tons e várias transparências além dos 8 valores do BRIEF: promover a tokens em `@theme`.
3. MacViewer é cubo SVG/CSS, sem `.glb`, rotação automática ou teclado; o BRIEF quer `.glb` lazy com teclado.
4. PageTurn real só na home; nas internas só a orelha cresce. O BRIEF quer virada entre rotas (View Transitions): unificar.
5. Limiar de ~300px corresponde ao tamanho da orelha, não ao deslocamento do ponteiro (≈284px somados).
6. Textos inconsistentes: "quatro parágrafos" (Sobre) e "três maneiras" (Contato, com 4 canais); Linha do tempo cita 2022, 2024, 2026 (as tags reais propostas são outras, ver ARCHIVE.md).
7. IDs de SVG globais repetidos; `/curriculo.pdf` referenciado em 3 páginas.
8. Fontes de fallback não carregadas; tudo em valores arbitrários (mapear para tokens Tailwind v4).
