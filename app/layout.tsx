import type { Metadata, Viewport } from 'next';
import { Bodoni_Moda_SC, Pathway_Gothic_One, PT_Serif_Caption, UnifrakturMaguntia } from 'next/font/google';
import './globals.css';

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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.raphaelsena.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Raphael Sena | Gazeta de um desenvolvedor de software',
  description:
    'Portfólio de Raphael Sena, desenvolvedor de software em Belo Horizonte: sobre, experiência, projetos e tecnologias.',
};

export const viewport: Viewport = {
  themeColor: '#161616',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${unifraktur.variable} ${bodoni.variable} ${pathway.variable} ${ptSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
