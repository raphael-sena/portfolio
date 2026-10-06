// Rotas do site para as suítes (espelha src/i18n/routes.ts sem importar código do app).
export const LOCALES = ['pt', 'en', 'de'] as const;
export type Locale = (typeof LOCALES)[number];

export const PAGES = [
  { id: 'home', slug: '' },
  { id: 'about', slug: 'sobre' },
  { id: 'experience', slug: 'experiencia' },
  { id: 'projects', slug: 'projetos' },
  { id: 'technologies', slug: 'tecnologias' },
  { id: 'timeline', slug: 'linha-do-tempo' },
  { id: 'contact', slug: 'contato' },
] as const;

export const HTML_LANG: Record<Locale, string> = { pt: 'pt-BR', en: 'en', de: 'de' };
export const SITE = 'https://www.raphaelsena.com';

export function path(locale: Locale, slug: string): string {
  const prefix = locale === 'pt' ? '' : `/${locale}`;
  return slug ? `${prefix}/${slug}/` : `${prefix}/`;
}

/** 7 páginas × 3 idiomas, mais privacidade × 3 (todas indexáveis). */
export const INDEXABLE = [...PAGES.map((p) => p.slug), 'privacidade'].flatMap((slug) =>
  LOCALES.map((locale) => ({ locale, slug, path: path(locale, slug) })),
);
