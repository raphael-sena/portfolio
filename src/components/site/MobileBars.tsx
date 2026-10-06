import Link from 'next/link';
import { HREFLANG, LANGUAGE_NAMES, LOCALES, type Locale } from '@/i18n/config';
import { fill, t } from '@/i18n/dictionary';
import { PAGE_IDS, localesOf, nextPage, pageNumber, pathFor, type AnyPageId, type PageId } from '@/i18n/routes';
import { MobileMenu } from './MobileMenu';

const TAB = 'font-label tracking-[0.12em] uppercase no-underline visited:text-ink active:bg-grey-4';

/** Faixa superior fixa do mobile (abaixo de 768 px): menu de seções, letreiro e indicador "N/7". */
export function MobileTopBar({ locale, id, inSequence }: { locale: Locale; id: AnyPageId; inSequence: boolean }) {
  const dict = t(locale);
  const { common } = dict;
  const languages = LOCALES.filter((l) => localesOf(id).includes(l));
  return (
    <div className="sticky top-0 z-20 border-b-[3px] border-double border-ink bg-paper md:hidden">
      <div className="flex h-13 items-center justify-between px-1">
        <MobileMenu label={common.mobile.menu}>
          <nav
            aria-label={common.mobile.sections}
            className="absolute inset-x-0 top-13 max-h-[calc(100dvh-3.25rem)] overflow-y-auto border-b-[3px] border-double border-ink bg-paper"
          >
            <ul>
              {PAGE_IDS.map((page) => {
                const current = page === id;
                return (
                  <li key={page}>
                    <Link
                      prefetch={false}
                      href={pathFor(locale, page)}
                      aria-current={current ? 'page' : undefined}
                      data-track="menu_click"
                      data-track-item={page}
                      className={`flex min-h-13 items-baseline gap-2.5 border-b border-ink px-4 no-underline visited:text-ink ${
                        current ? 'bg-ink !text-paper' : 'active:bg-grey-4'
                      }`}
                    >
                      <span className="flex min-h-13 w-6 items-center font-headline text-[1.375rem] font-extrabold">
                        {pageNumber(page)}
                      </span>
                      <span className="flex min-h-13 items-center font-label text-[1.3125rem] tracking-[0.12em] uppercase">
                        {common.nav[page]}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            {languages.length > 1 && (
              <div className="p-4">
                <p className="mb-1.5 font-label text-[1.0625rem] tracking-[0.2em] uppercase">{common.language.label}</p>
                <ul className="flex">
                  {languages.map((l) => (
                    <li key={l} className="flex-1">
                      {l === locale ? (
                        <span
                          aria-current="true"
                          aria-label={`${LANGUAGE_NAMES[l]} (${common.language.current})`}
                          className="flex min-h-11 items-center justify-center border-2 border-ink bg-ink font-label text-[1.1875rem] tracking-[0.14em] text-paper"
                        >
                          {l.toUpperCase()}
                        </span>
                      ) : (
                        <Link
                          prefetch={false}
                          href={pathFor(l, id)}
                          lang={HREFLANG[l]}
                          hrefLang={HREFLANG[l]}
                          aria-label={LANGUAGE_NAMES[l]}
                          data-track="lang_switch"
                          data-track-to={l}
                          className="flex min-h-11 items-center justify-center border-2 border-ink font-label text-[1.1875rem] tracking-[0.14em] no-underline visited:text-ink active:bg-ink active:text-paper"
                        >
                          {l.toUpperCase()}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </nav>
        </MobileMenu>
        {id === 'home' ? (
          <span className="font-label text-[1.0625rem] tracking-[0.2em] uppercase">{common.dateline.edition}</span>
        ) : (
          <Link
            prefetch={false}
            href={pathFor(locale, 'home')}
            className="font-masthead text-[1.75rem] leading-none no-underline visited:text-ink"
          >
            {common.siteName}
          </Link>
        )}
        <span className="min-w-11 pr-2 text-right font-label text-lg tracking-[0.1em]">
          {inSequence ? `${pageNumber(id as PageId)}/${PAGE_IDS.length}` : ''}
        </span>
      </div>
    </div>
  );
}

/** Barra inferior fixa do mobile: página anterior, "N de 7" e próxima (links normais, sem depender de gesto). */
export function MobileTabs({ locale, id }: { locale: Locale; id: PageId }) {
  const { common } = t(locale);
  const n = pageNumber(id);
  const prev = PAGE_IDS[(n - 2 + PAGE_IDS.length) % PAGE_IDS.length] as PageId;
  const next = nextPage(id);
  return (
    <nav
      aria-label={common.mobile.sections}
      className="sticky bottom-0 z-20 flex min-h-14 items-stretch border-t-[3px] border-double border-ink bg-paper pb-[env(safe-area-inset-bottom,0px)] md:hidden"
    >
      <Link
        prefetch={false}
        href={pathFor(locale, prev)}
        aria-label={fill(common.mobile.prevAria, { section: common.nav[prev], n: pageNumber(prev) })}
        className={`${TAB} flex flex-1 items-center gap-2 px-4 text-[1.1875rem]`}
      >
        <span aria-hidden="true">‹</span>
        {common.mobile.prev}
      </Link>
      <div className="flex flex-none flex-col items-center justify-center px-2 text-center">
        <span className="font-label text-[1.1875rem] tracking-[0.12em] uppercase">
          {fill(common.mobile.of, { n, total: PAGE_IDS.length })}
        </span>
        <span className="text-[0.8125rem] leading-[1.1] italic">{common.nav[id]}</span>
      </div>
      <Link
        prefetch={false}
        href={pathFor(locale, next)}
        aria-label={fill(common.mobile.nextAria, { section: common.nav[next], n: pageNumber(next) })}
        className={`${TAB} flex flex-1 items-center justify-end gap-2 px-4 text-[1.1875rem]`}
      >
        {common.mobile.next}
        <span aria-hidden="true">›</span>
      </Link>
    </nav>
  );
}
