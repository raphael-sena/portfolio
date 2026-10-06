# Protótipos da "Gazeta de 1900" (especificação visual)

Estes arquivos são protótipos de design, não código de produção. Leia o HTML e o CSS inline como especificação (layout, espaçamentos, cores, comportamentos). O arquivo `./support.js` citado no <head> não está incluído; ignore-o.

| Arquivo | Rota no site | Página |
|---|---|---|
| Gazeta.dc.html | / | 1 (início, com computador 3D giratório e virada de página no menu) |
| Sobre.dc.html | /sobre | 2 |
| Experiencia.dc.html | /experiencia | 3 |
| Projetos.dc.html | /projetos | 4 |
| Tecnologias.dc.html | /tecnologias | 5 |
| LinhaDoTempo.dc.html | /linha-do-tempo | 6 |
| Contato.dc.html | /contato | 7 |
| GuiaGazeta.dc.html | (interno) | guia de estilo: paleta, fontes, componentes e movimento |

Textos entre colchetes, como [NOME DO PROJETO 1], são placeholders de conteúdo.

## Tokens
- Papel #F5F3EC; tinta #111111; link visitado #555555; cinzas #F2F0E8 #E6E3D8 #D9D6CB #CFCCC0; fundo escuro #161616.
- Fontes (Google Fonts): UnifrakturMaguntia (letreiro), Bodoni Moda SC (manchetes, pesos 800 e 700), Pathway Gothic One (menu, etiquetas, botões; maiúsculas, mínimo 19px), PT Serif Caption (texto; sem negrito).

## Comportamentos
- Pilha de 4 folhas deslocadas e levemente inclinadas atrás da página, sobre fundo escuro com hachura.
- Textura de papel (grão, manchas, vinheta) por cima da folha de cima.
- Orelha de página no canto inferior direito: arrastar na diagonal; soltar após cerca de 300px completa a virada; antes disso volta. Clique, toque e Enter também viram a página.
- Virada de página: rotateY de 0 a -180deg, origem na esquerda, 1s ease-in, com sombra na dobra.
- Sequência: 1 > 2 > 3 > 4 > 5 > 6 > 7 > 1.
