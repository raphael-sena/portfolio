import {
  Button,
  Callout,
  Dateline,
  DiamondBullet,
  DropCap,
  Footer,
  HatchPlaceholder,
  LeaderRow,
  MacViewer,
  Masthead,
  NavBar,
  Ornament,
  PageEarCurl,
  PageHeader,
  PageStack,
  PageTurnPreview,
  Pullquote,
  SectionTitle,
} from '@/components/gazeta';
import { footerLinks, navItems } from '@/i18n/nav';
import { pathFor } from '@/i18n/routes';
import { t } from '@/i18n/dictionary';

const PALETTE = [
  { hex: '#F5F3EC', name: 'Papel', swatch: 'bg-paper', dark: false },
  { hex: '#111111', name: 'Tinta', swatch: 'bg-ink', dark: true },
  { hex: '#555555', name: 'Link visitado', swatch: 'bg-visited', dark: true },
  { hex: '#F2F0E8', name: 'Cinza 1 (objeto)', swatch: 'bg-grey-1', dark: false },
  { hex: '#E6E3D8', name: 'Cinza 2 (objeto)', swatch: 'bg-grey-2', dark: false },
  { hex: '#D9D6CB', name: 'Cinza 3 (objeto)', swatch: 'bg-grey-3', dark: false },
  { hex: '#CFCCC0', name: 'Cinza 4 (objeto)', swatch: 'bg-grey-4', dark: false },
];

const EXTRA_TOKENS = [
  { hex: '#161616', name: 'Fundo escuro', swatch: 'bg-stage' },
  { hex: '#EFEDE3', name: 'Folha 4 da pilha', swatch: 'bg-sheet-4' },
  { hex: '#E4E1D5', name: 'Verso da orelha', swatch: 'bg-ear-back' },
  { hex: '#A9A597', name: 'Dobra (escuro)', swatch: 'bg-fold-dark' },
  { hex: '#E7E4D8', name: 'Dobra (claro)', swatch: 'bg-fold-light' },
];

function Swatch({ hex, name, swatch, dark }: { hex: string; name: string; swatch: string; dark?: boolean }) {
  return (
    <li className="w-[138px] border border-ink">
      <div
        className={`${swatch} flex h-16 items-end px-2 pb-1 font-label text-xl tracking-widest ${dark ? 'text-paper' : ''}`}
      >
        {hex}
      </div>
      <p className="bg-paper px-2 py-1 text-base">{name}</p>
    </li>
  );
}

function Sample({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2 font-label text-xl tracking-[0.14em] uppercase">{label}</h3>
      {children}
    </div>
  );
}

export function DesignSystemPage() {
  const dict = t('pt');
  return (
    <>
      <PageStack>
        <Dateline right="Guia de estilo · Página —" />
        <Masthead homeHref={pathFor('pt', 'home')} />
        <NavBar items={navItems('pt', dict)} label={dict.common.nav.label} />
        <main id="conteudo" tabIndex={-1} className="mt-6 outline-none">
          <PageHeader
            kicker="Guia de estilo · Página —"
            title="Guia de estilo"
            lead="Paleta, tipografia e componentes da Gazeta de 1900 em preto e branco."
          />

          <section aria-labelledby="paleta" className="mt-10">
            <SectionTitle align="left">
              <span id="paleta">Paleta</span>
            </SectionTitle>
            <ul className="mt-5 flex flex-wrap gap-3.5">
              {PALETTE.map((c) => (
                <Swatch key={c.hex} {...c} />
              ))}
            </ul>
            <p className="prose-gazeta mt-4 text-base">
              Contraste sobre o papel: tinta 17:1 e link visitado 6,7:1. Não há cor de destaque: o destaque vem de
              inversão (papel sobre tinta), filetes duplos e hachuras.
            </p>
            <h3 className="mt-6 mb-2 font-label text-xl tracking-[0.14em] uppercase">Tokens de apoio (do protótipo)</h3>
            <ul className="flex flex-wrap gap-3.5">
              {EXTRA_TOKENS.map((c) => (
                <Swatch key={c.hex} {...c} dark={c.hex === '#161616'} />
              ))}
            </ul>
          </section>

          <section aria-labelledby="tipografia" className="mt-10">
            <SectionTitle align="left">
              <span id="tipografia">Tipografia</span>
            </SectionTitle>
            <div className="mt-5 space-y-5">
              <Sample label="UnifrakturMaguntia · letreiro">
                <p className="font-masthead text-[56px] leading-[1.05]">Raphael Sena</p>
              </Sample>
              <Sample label="Bodoni Moda SC · manchetes e títulos (800 e 700)">
                <p className="font-headline text-[40px] leading-[1.1] font-extrabold">Obras publicadas ao público</p>
                <p className="font-headline text-[28px] leading-[1.1] font-bold">Como este site mudou</p>
              </Sample>
              <Sample label="Pathway Gothic One · menu, datas, etiquetas e botões (maiúsculas, a partir de 19px)">
                <p className="font-label text-[23px] tracking-[0.14em] uppercase">Sobre · Experiência · Projetos</p>
              </Sample>
              <Sample label="PT Serif Caption · texto corrido e legendas (regular e itálico, sem negrito)">
                <p className="prose-gazeta max-w-[60ch] text-lg">
                  <DropCap letter="R" />
                  aphael Sena estuda Engenharia de Software na PUC Minas e gosta de transformar requisitos em produto.{' '}
                  <em>Legenda em itálico.</em>
                </p>
              </Sample>
            </div>
          </section>

          <section aria-labelledby="componentes" className="mt-10">
            <SectionTitle align="left">
              <span id="componentes">Componentes</span>
            </SectionTitle>
            <div className="mt-5 grid gap-x-8 gap-y-8 md:grid-cols-3">
              <Sample label="Item do menu">
                <div className="flex flex-wrap items-center gap-3">
                  <NavBarState />
                </div>
              </Sample>
              <Sample label="Botão">
                <Button href="/curriculo-raphael-sena.pdf">Baixar currículo</Button>
              </Sample>
              <Sample label="Linha com pontilhado">
                <LeaderRow label="Cidade">Belo Horizonte, MG</LeaderRow>
              </Sample>
              <Sample label="Caixa lateral">
                <Callout title="Procura-se conversa">Sobre vagas, projetos e xadrez.</Callout>
              </Sample>
              <Sample label="Placeholder de imagem (gravura)">
                <HatchPlaceholder label="[FIG. 1]" height={140} />
              </Sample>
              <Sample label="Citação em destaque">
                <Pullquote size={24}>[UMA FRASE PARA DESTACAR]</Pullquote>
              </Sample>
              <Sample label="Ornamento e marcador">
                <Ornament />
                <p className="flex min-h-11 items-center gap-3 text-xl">
                  <DiamondBullet /> TypeScript
                </p>
              </Sample>
              <Sample label="Título de coluna">
                <SectionTitle as="h3">Em destaque</SectionTitle>
              </Sample>
            </div>
          </section>

          <section aria-labelledby="orelha" className="mt-10">
            <SectionTitle align="left">
              <span id="orelha">Orelha de página</span>
            </SectionTitle>
            <p className="prose-gazeta mt-4 max-w-[70ch] text-lg">
              A orelha é um link real para a próxima página. Abaixo, os estados visuais: repouso (44 px, com pulso
              discreto), arrastando e prestes a concluir. O arraste e o teclado entram no G4.
            </p>
            <div className="mt-5 flex flex-wrap gap-6">
              {[
                { size: 44, legend: 'Repouso (44 px)', pulse: true },
                { size: 140, legend: 'Arrastando (140 px)', pulse: false },
                { size: 280, legend: 'Perto de concluir (280 px)', pulse: false },
              ].map((s) => (
                <figure key={s.size}>
                  <div className="relative h-[300px] w-[320px] overflow-hidden border border-ink bg-paper">
                    <PageEarCurl size={s.size} nextLabel="Sobre" nextPage={2} pulse={s.pulse} />
                  </div>
                  <figcaption className="mt-1 text-base italic">{s.legend}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section aria-labelledby="virada" className="mt-10">
            <SectionTitle align="left">
              <span id="virada">Virada de página</span>
            </SectionTitle>
            <p className="prose-gazeta mt-4 max-w-[70ch] text-lg">
              A página atual gira em torno da borda esquerda, de 0 a −180°, em 1 s com aceleração, enquanto uma sombra
              escurece a dobra. Com preferência por menos movimento, ou sem suporte, a troca é imediata.
            </p>
            <div className="mt-5 flex flex-wrap gap-6">
              {[0, -60, -120].map((angle) => (
                <figure key={angle} className="w-[320px]">
                  <PageTurnPreview angle={angle} label="Sobre" page={2} />
                  <figcaption className="mt-1 text-base italic">{angle}°</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section aria-labelledby="computador" className="mt-10">
            <SectionTitle align="left">
              <span id="computador">Computador compacto</span>
            </SectionTitle>
            <div className="mx-auto mt-6 max-w-[460px]">
              <MacViewer />
            </div>
          </section>

          <section aria-labelledby="movimento" className="mt-10">
            <SectionTitle align="left">
              <span id="movimento">Movimento</span>
            </SectionTitle>
            <p className="prose-gazeta mt-4 max-w-[70ch] text-lg">
              Virada de página ao trocar de seção: a página atual gira em torno da borda esquerda, em 1 s com
              aceleração, enquanto uma sombra escurece a dobra e a próxima página aparece por baixo. Com preferência por
              menos movimento, a troca é imediata. O computador do início gira por arraste, por botões ou pelas setas do
              teclado.
            </p>
          </section>

          <Footer siteName={dict.common.siteName} links={footerLinks('pt', dict)} />
        </main>
      </PageStack>
    </>
  );
}

function NavBarState() {
  return (
    <>
      <span className="inline-flex min-h-12 items-center px-4 font-label text-[23px] tracking-[0.14em] uppercase">
        Normal
      </span>
      <span className="inline-flex min-h-12 items-center bg-ink px-4 font-label text-[23px] tracking-[0.14em] text-paper uppercase">
        Atual ou mouse
      </span>
    </>
  );
}
