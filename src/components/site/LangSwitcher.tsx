import Link from 'next/link';
import { HREFLANG, LANGUAGE_NAMES, LOCALES, type Locale } from '@/i18n/config';
import { pathFor, localesOf, type AnyPageId } from '@/i18n/routes';

/** Links reais para a mesma página nos outros idiomas (a troca preserva a rota). */
export function LangSwitcher({
  locale,
  id,
  label,
  currentLabel,
}: {
  locale: Locale;
  id: AnyPageId;
  label: string;
  currentLabel: string;
}) {
  const available = LOCALES.filter((l) => localesOf(id).includes(l));
  if (available.length < 2) return null;
  return (
    <nav aria-label={label} className="flex justify-end gap-x-1 font-label text-xl tracking-[0.14em] uppercase">
      <ul className="flex flex-wrap items-center">
        {available.map((l, i) => (
          <li key={l} className="flex items-center">
            {i > 0 && (
              <span aria-hidden="true" className="px-1">
                ·
              </span>
            )}
            {l === locale ? (
              <span aria-current="true" className="inline-flex min-h-11 items-center bg-ink px-3 text-paper">
                {LANGUAGE_NAMES[l]}
                <span className="sr-only"> ({currentLabel})</span>
              </span>
            ) : (
              <Link
                href={pathFor(l, id)}
                lang={HREFLANG[l]}
                hrefLang={HREFLANG[l]}
                data-track="lang_switch"
                data-track-to={l}
                className="inline-flex min-h-11 items-center px-3 no-underline visited:text-ink hover:bg-ink hover:text-paper"
              >
                {LANGUAGE_NAMES[l]}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
