import Link from 'next/link';

export interface FooterLink {
  href: string;
  label: string;
}

/** Nome e links do rodapé, separados por `|` (decorativo, escondido de leitores de tela). */
export function Footer({ siteName, links }: { siteName: string; links: FooterLink[] }) {
  return (
    <footer className="mt-11 border-t-4 border-double border-ink pt-3.5 text-center text-base leading-8">
      <span>{siteName}</span>
      {links.map((link) => (
        <span key={link.href}>
          <span aria-hidden="true" className="mx-2">
            |
          </span>
          <Link href={link.href} className="inline-flex min-h-11 items-center">
            {link.label}
          </Link>
        </span>
      ))}
    </footer>
  );
}
