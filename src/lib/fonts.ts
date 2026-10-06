import { Bodoni_Moda_SC, Pathway_Gothic_One, PT_Serif_Caption, UnifrakturMaguntia } from 'next/font/google';
import localFont from 'next/font/local';

// `optional` nas duas fontes que pintam o LCP (letreiro e texto corrido): são preload e chegam junto com o CSS, então
// entram na primeira pintura; em rede muito lenta, ficam para a próxima visita em vez de trocar a fonte no meio da leitura
// (o que também refaz o LCP e causa deslocamento).
const unifraktur = UnifrakturMaguntia({
  weight: '400',
  subsets: ['latin'],
  display: 'optional',
  variable: '--font-unifraktur',
});
const bodoni = Bodoni_Moda_SC({
  weight: 'variable',
  axes: ['opsz'],
  style: 'normal',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bodoni',
});
// O itálico só aparece na citação em destaque (Bodoni Moda SC itálico 600, como no protótipo). Em vez do variável do Google
// (62 KB, com opsz e todos os pesos), usa o arquivo estático do fontsource (20 KB), que pesa menos no caminho da primeira tela.
const bodoniItalic = localFont({
  src: '../../node_modules/@fontsource/bodoni-moda-sc/files/bodoni-moda-sc-latin-600-italic.woff2',
  weight: '600',
  style: 'italic',
  display: 'swap',
  preload: false,
  variable: '--font-bodoni-italic',
});

const pathway = Pathway_Gothic_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pathway',
});
const ptSerif = PT_Serif_Caption({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'optional',
  variable: '--font-ptserif',
});

/** Classes que definem as quatro variáveis de fonte no `<html>`. */
export const fontClassName = `${unifraktur.variable} ${bodoni.variable} ${bodoniItalic.variable} ${pathway.variable} ${ptSerif.variable}`;
