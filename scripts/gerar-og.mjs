// Gera as imagens Open Graph (1200x630) por página e idioma em public/og/<idioma>/<página>.png, no build, com satori + resvg.
// Fontes: pacotes @fontsource (woff local, sem rede). As imagens não são versionadas (public/og/ está no .gitignore).
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const fonte = (pacote, arquivo) => readFileSync(join(raiz, 'node_modules/@fontsource', pacote, 'files', arquivo));

const fontes = [
  {
    name: 'Unifraktur',
    data: fonte('unifrakturmaguntia', 'unifrakturmaguntia-latin-400-normal.woff'),
    weight: 400,
    style: 'normal',
  },
  {
    name: 'Bodoni',
    data: fonte('bodoni-moda-sc', 'bodoni-moda-sc-latin-800-normal.woff'),
    weight: 800,
    style: 'normal',
  },
  {
    name: 'Pathway',
    data: fonte('pathway-gothic-one', 'pathway-gothic-one-latin-400-normal.woff'),
    weight: 400,
    style: 'normal',
  },
  {
    name: 'PTSerif',
    data: fonte('pt-serif-caption', 'pt-serif-caption-latin-400-italic.woff'),
    weight: 400,
    style: 'italic',
  },
];

const { pt } = await import('../src/content/pt/index.ts');
const { en } = await import('../src/content/en/index.ts');
const { de } = await import('../src/content/de/index.ts');
const dicionarios = { pt, en, de };

const PAGINAS = ['home', 'about', 'experience', 'projects', 'technologies', 'timeline', 'contact', 'privacy'];
const NUMERO = { home: 1, about: 2, experience: 3, projects: 4, technologies: 5, timeline: 6, contact: 7 };

const PAPEL = '#F5F3EC';
const TINTA = '#111111';

const h = (type, style, children) => ({ type, props: { style: { display: 'flex', ...style }, children } });
const regra = () =>
  h('div', { flexDirection: 'column', width: '100%', gap: 4 }, [
    h('div', { height: 2, background: TINTA }, null),
    h('div', { height: 2, background: TINTA }, null),
  ]);

function titulo(locale, id) {
  const dict = dicionarios[locale];
  if (id === 'home') return dict.pages.home.headline;
  return dict.pages[id].title;
}

function cartao(locale, id) {
  const dict = dicionarios[locale];
  const principal = titulo(locale, id);
  const tamanho = principal.length > 48 ? 54 : principal.length > 32 ? 64 : 76;
  const secao =
    id === 'home'
      ? dict.common.dateline.price
      : id === 'privacy'
        ? dict.common.footer.privacy
        : `${dict.common.nav[id]} · ${dict.common.dateline.page} ${NUMERO[id]}`;
  return h('div', { width: 1200, height: 630, background: '#161616', padding: 36 }, [
    h(
      'div',
      {
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: PAPEL,
        border: `3px solid ${TINTA}`,
        padding: '28px 48px',
        justifyContent: 'space-between',
      },
      [
        h('div', { flexDirection: 'column', gap: 10 }, [
          h(
            'div',
            {
              justifyContent: 'space-between',
              fontFamily: 'Pathway',
              fontSize: 26,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: TINTA,
            },
            [h('div', {}, dict.common.dateline.place), h('div', {}, dict.common.dateline.edition), h('div', {}, secao)],
          ),
          regra(),
          h(
            'div',
            { justifyContent: 'center', fontFamily: 'Unifraktur', fontSize: 120, lineHeight: 1.05, color: TINTA },
            dict.common.siteName,
          ),
          h(
            'div',
            { justifyContent: 'center', fontFamily: 'PTSerif', fontStyle: 'italic', fontSize: 28, color: TINTA },
            dict.common.tagline,
          ),
        ]),
        h('div', { flexDirection: 'column', gap: 18 }, [
          regra(),
          h(
            'div',
            {
              justifyContent: 'center',
              textAlign: 'center',
              fontFamily: 'Bodoni',
              fontWeight: 800,
              fontSize: tamanho,
              lineHeight: 1.1,
              color: TINTA,
            },
            principal,
          ),
          regra(),
        ]),
        h(
          'div',
          { justifyContent: 'center', fontFamily: 'Pathway', fontSize: 26, letterSpacing: 4, color: TINTA },
          'RAPHAELSENA.COM',
        ),
      ],
    ),
  ]);
}

let total = 0;
for (const locale of Object.keys(dicionarios)) {
  const pasta = join(raiz, 'public/og', locale);
  mkdirSync(pasta, { recursive: true });
  for (const id of PAGINAS) {
    const svg = await satori(cartao(locale, id), { width: 1200, height: 630, fonts: fontes });
    const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
    writeFileSync(join(pasta, `${id}.png`), png);
    total++;
  }
}
console.log(`public/og: ${total} imagens 1200x630 geradas`);
