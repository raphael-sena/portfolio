import type { MetadataRoute } from 'next';
import { HREFLANG, LOCALES, X_DEFAULT_LOCALE } from '@/i18n/config';
import { PAGE_IDS, EXTRA_PAGE_IDS, localesOf, urlFor, type AnyPageId } from '@/i18n/routes';

export const dynamic = 'force-static';

/** Só páginas indexáveis, com os alternates hreflang e x-default. `/design-system/` e `/<ano>/` ficam de fora (noindex). */
export default function sitemap(): MetadataRoute.Sitemap {
  const ids: AnyPageId[] = [...PAGE_IDS, ...EXTRA_PAGE_IDS.filter((id) => id !== 'design-system')];
  return ids.flatMap((id) =>
    localesOf(id).map((locale) => ({
      url: urlFor(locale, id),
      alternates: {
        languages: {
          ...Object.fromEntries(
            LOCALES.filter((l) => localesOf(id).includes(l)).map((l) => [HREFLANG[l], urlFor(l, id)]),
          ),
          'x-default': urlFor(X_DEFAULT_LOCALE, id),
        },
      },
    })),
  );
}
