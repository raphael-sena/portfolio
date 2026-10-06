import type { NavItem } from '@/components/gazeta/NavBar';
import type { FooterLink } from '@/components/gazeta/Footer';
import type { Dictionary } from '@/content/dictionary';
import type { Locale } from './config';
import { pathFor, type PageId } from './routes';

const MENU: PageId[] = ['about', 'experience', 'projects', 'technologies', 'timeline', 'contact'];

/** Seis itens: o início fica no letreiro e no rodapé. */
export function navItems(locale: Locale, dict: Dictionary): NavItem[] {
  return MENU.map((id) => ({ id, href: pathFor(locale, id), label: dict.common.nav[id] }));
}

export function footerLinks(locale: Locale, dict: Dictionary): FooterLink[] {
  return [
    { href: pathFor(locale, 'home'), label: dict.common.nav.home },
    ...navItems(locale, dict).map(({ href, label }) => ({ href, label })),
    { href: pathFor(locale, 'privacy'), label: dict.common.footer.privacy },
  ];
}
