import { Bodoni_Moda_SC, Pathway_Gothic_One, PT_Serif_Caption, UnifrakturMaguntia } from 'next/font/google';

const unifraktur = UnifrakturMaguntia({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-unifraktur',
});
const bodoni = Bodoni_Moda_SC({
  weight: 'variable',
  axes: ['opsz'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bodoni',
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
  display: 'swap',
  variable: '--font-ptserif',
});

/** Classes que definem as quatro variáveis de fonte no `<html>`. */
export const fontClassName = `${unifraktur.variable} ${bodoni.variable} ${pathway.variable} ${ptSerif.variable}`;
