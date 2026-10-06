import { DEFAULT_LOCALE, LOCALES, SITE_URL, type Locale } from './config';

/** As 7 páginas da sequência da orelha, na ordem: Início(1) > Sobre(2) > ... > Contato(7) > Início. */
export const PAGE_IDS = ['home', 'about', 'experience', 'projects', 'technologies', 'timeline', 'contact'] as const;
export type PageId = (typeof PAGE_IDS)[number];

/** Páginas fora da sequência da orelha. */
export const EXTRA_PAGE_IDS = ['privacy', 'design-system'] as const;
export type ExtraPageId = (typeof EXTRA_PAGE_IDS)[number];
export type AnyPageId = PageId | ExtraPageId;

/** Slugs em português nos três idiomas (decisão de 2026-10-05). */
export const SLUGS: Record<AnyPageId, string> = {
  home: '',
  about: 'sobre',
  experience: 'experiencia',
  projects: 'projetos',
  technologies: 'tecnologias',
  timeline: 'linha-do-tempo',
  contact: 'contato',
  privacy: 'privacidade',
  'design-system': 'design-system',
};

/** Idiomas em que cada página existe. O guia de estilo é interno e só existe em pt. */
export function localesOf(id: AnyPageId): readonly Locale[] {
  return id === 'design-system' ? [DEFAULT_LOCALE] : LOCALES;
}

/** Caminho com barra final (`trailingSlash: true`): `/`, `/sobre/`, `/en/`, `/de/sobre/`. */
export function pathFor(locale: Locale, id: AnyPageId): string {
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  const slug = SLUGS[id];
  return slug ? `${prefix}/${slug}/` : `${prefix}/`;
}

export function urlFor(locale: Locale, id: AnyPageId): string {
  return `${SITE_URL}${pathFor(locale, id)}`;
}

/** Número da página (1 a 7) na sequência da orelha. */
export function pageNumber(id: PageId): number {
  return PAGE_IDS.indexOf(id) + 1;
}

/** Próxima página da orelha; a última volta ao início. */
export function nextPage(id: PageId): PageId {
  return PAGE_IDS[(PAGE_IDS.indexOf(id) + 1) % PAGE_IDS.length] as PageId;
}

/** Segmentos de `[[...path]]` de uma rota (para generateStaticParams). */
export function segmentsFor(locale: Locale, id: AnyPageId): string[] {
  const prefix = locale === DEFAULT_LOCALE ? [] : [locale];
  const slug = SLUGS[id];
  return slug ? [...prefix, slug] : prefix;
}

export interface ResolvedRoute {
  locale: Locale;
  id: AnyPageId;
}

/** Inverso de `segmentsFor`: devolve null para qualquer caminho desconhecido (vira 404). */
export function resolveSegments(segments: string[] | undefined): ResolvedRoute | null {
  const parts = segments ?? [];
  for (const id of [...PAGE_IDS, ...EXTRA_PAGE_IDS]) {
    for (const locale of localesOf(id)) {
      const alvo = segmentsFor(locale, id);
      if (alvo.length === parts.length && alvo.every((p, i) => p === parts[i])) return { locale, id };
    }
  }
  return null;
}

/** Todas as rotas estáticas, para generateStaticParams. */
export function allRoutes(): ResolvedRoute[] {
  return [...PAGE_IDS, ...EXTRA_PAGE_IDS].flatMap((id) => localesOf(id).map((locale) => ({ locale, id })));
}
