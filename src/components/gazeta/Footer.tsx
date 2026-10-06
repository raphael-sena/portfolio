import Link from 'next/link';

const LINKS = [
  { href: '/', label: 'Início' },
  { href: '/sobre/', label: 'Sobre' },
  { href: '/experiencia/', label: 'Experiência' },
  { href: '/projetos/', label: 'Projetos' },
  { href: '/tecnologias/', label: 'Tecnologias' },
  { href: '/linha-do-tempo/', label: 'Linha do tempo' },
  { href: '/contato/', label: 'Contato' },
];

export function Footer() {
  return (
    <footer className="mt-11 border-t-4 border-double border-ink pt-3.5 text-center text-base leading-8">
      <span>Raphael Sena</span>
      {LINKS.map((link) => (
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
