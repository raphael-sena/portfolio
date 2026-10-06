import Link from 'next/link';

export interface NavItem {
  href: string;
  label: string;
}

/** Seis itens: o início fica no letreiro e no rodapé (decisão do usuário, 2026-10-05). */
export const NAV_ITEMS: NavItem[] = [
  { href: '/sobre/', label: 'Sobre' },
  { href: '/experiencia/', label: 'Experiência' },
  { href: '/projetos/', label: 'Projetos' },
  { href: '/tecnologias/', label: 'Tecnologias' },
  { href: '/linha-do-tempo/', label: 'Linha do tempo' },
  { href: '/contato/', label: 'Contato' },
];

interface NavBarProps {
  items?: NavItem[];
  /** href do item atual (recebe `aria-current="page"` e fica invertido). */
  current?: string;
}

export function NavBar({ items = NAV_ITEMS, current }: NavBarProps) {
  return (
    <nav aria-label="Principal" className="rule-double">
      <ul className="flex flex-wrap justify-center gap-x-1.5">
        {items.map((item) => {
          const isCurrent = item.href === current;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isCurrent ? 'page' : undefined}
                className={`flex min-h-12 items-center px-4 font-label text-[23px] tracking-[0.14em] uppercase no-underline visited:text-ink hover:bg-ink hover:text-paper ${
                  isCurrent ? 'bg-ink !text-paper' : ''
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
