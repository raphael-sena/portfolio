export const LOCALES = ['pt', 'en', 'de'] as const;
export type Locale = (typeof LOCALES)[number];

/** pt-BR é a fonte de verdade e vive na raiz (`/sobre/`); en e de ganham prefixo (`/en/about`... com os mesmos slugs). */
export const DEFAULT_LOCALE: Locale = 'pt';

export const HTML_LANG: Record<Locale, string> = { pt: 'pt-BR', en: 'en', de: 'de' };
export const HREFLANG: Record<Locale, string> = { pt: 'pt-BR', en: 'en', de: 'de' };
export const OG_LOCALE: Record<Locale, string> = { pt: 'pt_BR', en: 'en_US', de: 'de_DE' };
export const LANGUAGE_NAMES: Record<Locale, string> = { pt: 'Português', en: 'English', de: 'Deutsch' };

/** `x-default` aponta para a versão em inglês de cada página (decisão de 2026-10-05). */
export const X_DEFAULT_LOCALE: Locale = 'en';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.raphaelsena.com').replace(/\/$/, '');

export function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && (LOCALES as readonly string[]).includes(value);
}
