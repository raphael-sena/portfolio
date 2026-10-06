import type { Metadata } from 'next';
import { HREFLANG, LOCALES, OG_LOCALE, SITE_URL, X_DEFAULT_LOCALE, type Locale } from './config';
import { t } from './dictionary';
import { localesOf, urlFor, type AnyPageId } from './routes';

/** Metadata por rota e idioma: title e description únicos, canonical absoluto, hreflang recíproco e x-default (/en/). */
export function buildMetadata(locale: Locale, id: AnyPageId): Metadata {
  if (id === 'design-system') {
    return {
      title: 'Guia de estilo | Raphael Sena',
      description: 'Paleta, tipografia e componentes da Gazeta de 1900 (página interna de revisão).',
      robots: { index: false, follow: false },
    };
  }

  const { title, description } = t(locale).meta[id];
  const canonical = urlFor(locale, id);
  // Imagem 1200x630 por página e idioma, gerada no build (scripts/gerar-og.mjs).
  const ogImage = `${SITE_URL}/og/${locale}/${id}.png`;
  const available = localesOf(id);

  const languages: Record<string, string> = {};
  for (const l of LOCALES) if (available.includes(l)) languages[HREFLANG[l]] = urlFor(l, id);
  if (available.includes(X_DEFAULT_LOCALE)) languages['x-default'] = urlFor(X_DEFAULT_LOCALE, id);

  return {
    metadataBase: new URL(SITE_URL),
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '48x48' },
        { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      ],
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type: 'website',
      url: canonical,
      siteName: t(locale).common.siteName,
      title,
      description,
      locale: OG_LOCALE[locale],
      alternateLocale: available.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
    },
    twitter: { card: 'summary_large_image', title, description, images: [{ url: ogImage, alt: title }] },
  };
}
