import type { Locale } from '@/i18n/config';
import { fill, t } from '@/i18n/dictionary';
import { nextPage, pageNumber, pathFor, type PageId } from '@/i18n/routes';
import { PageEar } from './PageEar';

/** Calcula os textos da orelha no servidor (idioma da página) e entrega ao componente interativo. */
export function PageEarLink({ locale, id }: { locale: Locale; id: PageId }) {
  const dict = t(locale);
  const next = nextPage(id);
  const nextNumber = pageNumber(next);
  const section = dict.common.nav[next];
  return (
    <PageEar
      href={pathFor(locale, next)}
      ariaLabel={fill(dict.common.ear.aria, { section, n: nextNumber })}
      nextLabel={section}
      nextPage={nextNumber}
      pageLabel={dict.common.dateline.page}
      hint={fill(dict.common.ear.hint, { n: nextNumber })}
    />
  );
}
