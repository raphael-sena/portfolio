import { CONTACT } from '@/content/data';
import { HTML_LANG, SITE_URL, type Locale } from '@/i18n/config';
import { t } from '@/i18n/dictionary';
import { urlFor, type AnyPageId } from '@/i18n/routes';

/** Dados estruturados (JSON-LD): Person, WebSite e BreadcrumbList, ligados por @id. */
export function JsonLd({ locale, id }: { locale: Locale; id: AnyPageId }) {
  if (id === 'design-system') return null;
  const dict = t(locale);
  const personId = `${SITE_URL}/#person`;
  const siteId = `${SITE_URL}/#website`;
  const nome = (page: AnyPageId) =>
    page === 'home'
      ? dict.common.nav.home
      : page === 'privacy'
        ? dict.common.footer.privacy
        : ((dict.common.nav as Record<string, string>)[page] ?? page);

  const graph = [
    {
      '@type': 'Person',
      '@id': personId,
      name: dict.common.siteName,
      url: `${SITE_URL}/`,
      jobTitle: dict.common.jobTitle,
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'PUC Minas' },
      sameAs: [CONTACT.github, CONTACT.linkedin],
    },
    {
      '@type': 'WebSite',
      '@id': siteId,
      url: `${SITE_URL}/`,
      name: dict.common.siteName,
      description: dict.common.tagline,
      inLanguage: HTML_LANG[locale],
      publisher: { '@id': personId },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: nome('home'), item: urlFor(locale, 'home') },
        ...(id === 'home' ? [] : [{ '@type': 'ListItem', position: 2, name: nome(id), item: urlFor(locale, id) }]),
      ],
    },
  ];
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
