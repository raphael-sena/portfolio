import type { ReactNode } from 'react';
import { Dateline, Footer, Masthead, NavBar, PageStack } from '@/components/gazeta';
import type { Locale } from '@/i18n/config';
import { t } from '@/i18n/dictionary';
import { footerLinks, navItems } from '@/i18n/nav';
import { PAGE_IDS, pageNumber, pathFor, type AnyPageId, type PageId } from '@/i18n/routes';
import { LangSwitcher } from './LangSwitcher';
import { PageEarLink } from './PageEarLink';

function isSequencePage(id: AnyPageId): id is PageId {
  return (PAGE_IDS as readonly string[]).includes(id);
}

/** Estrutura comum de todas as páginas: pilha de folhas, datação, idioma, letreiro, menu, conteúdo, rodapé e orelha. */
export function SiteShell({ locale, id, children }: { locale: Locale; id: AnyPageId; children: ReactNode }) {
  const dict = t(locale);
  const { common } = dict;
  const inSequence = isSequencePage(id);
  const isHome = id === 'home';

  let right = common.dateline.price;
  if (inSequence && !isHome) right = `${common.nav[id]} · ${common.dateline.page} ${pageNumber(id)}`;
  if (id === 'privacy') right = dict.pages.privacy.title;

  return (
    <PageStack earSpace={inSequence} ear={inSequence ? <PageEarLink locale={locale} id={id} /> : undefined}>
      <Dateline left={common.dateline.place} center={common.dateline.edition} right={right} />
      <LangSwitcher locale={locale} id={id} label={common.language.label} currentLabel={common.language.current} />
      <Masthead
        variant={isHome ? 'home' : 'inner'}
        title={common.siteName}
        subtitle={common.tagline}
        boxes={{ left: common.mastheadBoxes.left, right: common.mastheadBoxes.right }}
        homeHref={pathFor(locale, 'home')}
      />
      <NavBar label={common.nav.label} items={navItems(locale, dict)} current={pathFor(locale, id)} />
      <main id="conteudo" tabIndex={-1} className="mt-6 outline-none">
        {children}
      </main>
      <Footer siteName={common.siteName} links={footerLinks(locale, dict)} />
    </PageStack>
  );
}
