import Link from 'next/link';
import { PageEarCurl } from '@/components/gazeta';
import type { Locale } from '@/i18n/config';
import { fill } from '@/i18n/dictionary';
import { t } from '@/i18n/dictionary';
import { nextPage, pageNumber, pathFor, type PageId } from '@/i18n/routes';

/**
 * Orelha de página: um link real para a próxima página da sequência (1 > 2 > ... > 7 > 1).
 * Esta versão é o link e o visual em repouso; o arraste na diagonal e a virada animada entram no G4.
 */
export function PageEarLink({ locale, id }: { locale: Locale; id: PageId }) {
  const dict = t(locale);
  const next = nextPage(id);
  const nextNumber = pageNumber(next);
  const section = dict.common.nav[next];
  return (
    <>
      <PageEarCurl nextLabel={section} nextPage={nextNumber} pageLabel={dict.common.dateline.page} pulse />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[72px] bottom-4 z-[3] hidden font-label text-xl tracking-[0.16em] uppercase sm:block"
      >
        {fill(dict.common.ear.hint, { n: nextNumber })}
      </span>
      <Link
        href={pathFor(locale, next)}
        aria-label={fill(dict.common.ear.aria, { section, n: nextNumber })}
        data-track="page_turn"
        data-track-from={id}
        data-track-to={next}
        data-track-via="ear"
        draggable={false}
        className="absolute right-0 bottom-0 z-[7] block h-24 w-24 cursor-grab touch-none select-none focus-visible:outline-3 focus-visible:outline-offset-[-6px]"
      />
    </>
  );
}
