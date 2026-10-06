import Link from 'next/link';

export interface FooterLink {
  href: string;
  label: string;
}

/** Nome e links do rodapé, separados por `|` (decorativo, escondido de leitores de tela). */
export function Footer({
  siteName,
  links,
  credits = [],
}: {
  siteName: string;
  links: FooterLink[];
  credits?: Array<{ text: string; source: string; href: string }>;
}) {
  return (
    <footer className="mt-11 border-t-4 border-double border-ink pt-3.5 text-center text-base leading-8 max-md:mt-8 max-md:flex max-md:flex-wrap max-md:justify-start max-md:gap-x-4 max-md:text-left">
      <span>{siteName}</span>
      {links.map((link) => (
        <span key={link.href}>
          <span aria-hidden="true" className="mx-2 max-md:hidden">
            |
          </span>
          <Link prefetch={false} href={link.href} className="inline-flex min-h-11 items-center">
            {link.label}
          </Link>
        </span>
      ))}
      {credits.map((credit) => (
        <p key={credit.href} className="mt-3 basis-full text-sm italic max-md:text-left">
          {credit.text}{' '}
          <a href={credit.href} rel="noopener">
            {credit.source}
          </a>
          .
        </p>
      ))}
    </footer>
  );
}
