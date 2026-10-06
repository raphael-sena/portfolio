# Prompt para o Claude web: design mobile do portfólio "Gazeta de 1900"

Cole tudo abaixo no Claude web (anexe prints do desktop atual e 2–3 capturas do app mobile do The New York Times, se puder).

---

Você é um designer editorial sênior, especialista em jornais digitais mobile. Preciso do **design completo da versão MOBILE (320–480 px)** do meu portfólio, que é uma "gazeta de 1900". O desktop já está pronto e aprovado; o mobile atual é só o desktop empilhado e ficou fraco: informação dispersa, tudo com o mesmo peso, sem hierarquia, rolagem infinita sem pontos de referência.

## Referência principal

O **app/site mobile do The New York Times**: faixa do título compacta, menu em seções, manchete forte seguida de lista densa de chamadas com filetes finos, rótulos de seção em caixa alta (kickers), bylines, hierarquia clara de peso, módulos horizontais de rolagem para itens secundários, barra de navegação fixa, e muito conteúdo por tela sem parecer apertado. Quero esse **ritmo e densidade**, mas com a minha identidade de 1900. Não copie logotipo, marca nem texto do NYT.

## Identidade que deve ser mantida

- Papel `#F5F3EC`, tinta `#111111`, cinzas `#F2F0E8 #E6E3D8 #D9D6CB #CFCCC0`, visitado `#555`. **Sem cor de destaque**; só preto sobre papel, filetes, hachuras e texturas de gravura.
- Fontes: UnifrakturMaguntia (letreiro), Bodoni Moda SC (manchetes), Pathway Gothic One (menu, rótulos, botões; sempre caixa alta com tracking), PT Serif Caption (texto, sem negrito).
- Vocabulário visual: filetes duplos (`4px double`), filete fino, linhas pontilhadas de índice ("leader rows"), capitular, citação em destaque, ornamento com losango, placeholders hachurados para imagens, caixas de anúncio com contorno duplo.
- Metáfora: cada seção é uma "página" do jornal; no desktop há uma **orelha** no canto inferior direito que se puxa para virar a página, e a transição vira a folha em 3D.

## Conteúdo (7 páginas, em 3 idiomas: pt, en, de; textos do alemão são ~30% mais longos)

1. **Início**: letreiro "Raphael Sena", subtítulo "Gazeta de um desenvolvedor de software", caixas "Engenharia de Software / PUC Minas" e "Belo Horizonte / Minas Gerais"; manchete e resumo; chamadas para as outras seções; **visualizador 3D de um Apple II** (arrastar para girar, botões girar esquerda/reiniciar/direita, legenda "Fig. 1", crédito CC BY obrigatório).
2. **Sobre**: texto longo com capitular, frase de destaque (pullquote), retrato, links (LinkedIn, GitHub, e-mail, currículo em PDF).
3. **Experiência**: 4 empregos (New Energy, Modaxo, Avaso, PUC Minas) como artigos de jornal: cargo, empresa, período, 3–5 marcadores de conquistas; formação e cursos extras.
4. **Projetos**: cartões com título, descrição curta, stack (tags), linguagens, link do repositório.
5. **Tecnologias**: 12 grupos (linguagens, frameworks, bancos, cloud, etc.) em formato de índice com filetes pontilhados.
6. **Linha do tempo**: edições por ano (2024, 2025, 2026 atual); cada cartão leva ao site antigo daquele ano.
7. **Contato**: e-mail, LinkedIn, GitHub, currículo, formulário ou botões.
   Rodapé com links para todas as seções, seletor de idioma (PT/EN/DE) e crédito.

## O que quero que você projete

1. **Arquitetura de navegação mobile**: faixa superior compacta (letreiro reduzido + data/edição + idioma + botão de menu), **menu de seções** (gaveta ou barra horizontal rolável com a seção atual invertida) e **barra inferior fixa** com "Página anterior / N de 7 / Próxima" que substitui a orelha no toque. Diga como a metáfora de virar a página funciona no mobile (gesto de deslizar horizontal? toque na barra? animação curta?).
2. **A Home como primeira página de jornal mobile**: manchete única dominante, 3D como "foto de capa" em proporção controlada (não 500 px de altura fixa), depois lista densa de chamadas das 6 seções com kicker, título em Bodoni, uma linha de resumo e filete. Mostre a hierarquia (manchete > subchamadas > itens).
3. **Cada uma das outras 6 páginas**, com módulos específicos: Experiência como lista de artigos com "ler mais" expansível; Projetos como carrossel horizontal de cartões E lista; Tecnologias em acordeão ou índice compacto; Linha do tempo como coluna vertical com marcos; etc. Não repita o mesmo layout em todas.
4. **Sistema tipográfico mobile**: escala completa em px (letreiro, manchete, subchamada, kicker, corpo, legenda, botão), com `line-height` e tracking. Corpo entre **15 e 16 px** (o desktop atual está grande demais; quero mais conteúdo por tela). Alvos de toque ≥ 44 px.
5. **Componentes**, cada um com estados (repouso, foco, atual, pressionado): faixa superior, menu, barra inferior, kicker, chamada (ArticleRow), cartão de projeto, linha de índice, acordeão, botão, pullquote, caixa de anúncio, rodapé.
6. **Microinterações** sóbrias: transição de página curta (≤ 400 ms) que sugira folha virando, respeitando `prefers-reduced-motion`.
7. **Acessibilidade e desempenho**: contraste AA (tinta sobre papel já passa), foco visível, landmarks, ordem de leitura lógica, sem depender de gestos (sempre há botão equivalente). Sem imagens pesadas; texturas em CSS/SVG. Cada tela precisa renderizar rápido em 4G.

## Formato da entrega

- Um **protótipo HTML/CSS/JS único e autocontido** por tela (ou um arquivo com as 7 telas navegáveis) em largura 390 px, mais variações em 360 e 430 px, usando as fontes do Google Fonts acima.
- Uma **especificação** em markdown: tokens, escala tipográfica, espaçamentos, grid, lista de componentes com medidas, regras de comportamento, e o que muda em cada breakpoint (≤ 480 mantém o mobile; ≥ 768 volta ao desktop atual).
- Justifique em 1–2 linhas cada decisão que se afasta do desktop.

## Restrições

- Implementação será em Next.js + Tailwind v4 (estático), então prefira layouts em flex/grid simples e CSS padrão, sem bibliotecas de UI.
- Nenhum texto inventado: use os do conteúdo acima; onde faltar, deixe `[...]`.
- Mantenha as 7 páginas e os 3 idiomas; não adicione seções novas.
