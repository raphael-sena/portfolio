import Link from 'next/link';

export interface NavItem {
  href: string;
  label: string;
  /** Identificador estável do item, enviado em `menu_click {item}`. */
  id?: string;
}

interface NavBarProps {
  items: NavItem[];
  /** Nome acessível do `<nav>` (por idioma). */
  label?: string;
  /** href do item atual (recebe `aria-current="page"` e fica invertido). */
  current?: string;
}

export function NavBar({ items, label = 'Principal', current }: NavBarProps) {
  return (
    <nav aria-label={label} className="rule-double">
      <ul className="flex flex-wrap justify-center gap-x-1.5">
        {items.map((item) => {
          const isCurrent = item.href === current;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isCurrent ? 'page' : undefined}
                data-track="menu_click"
                data-track-item={item.id ?? item.label}
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
