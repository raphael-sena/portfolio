import Link from 'next/link';

interface MastheadProps {
  /** `home`: letreiro grande. `inner`: letreiro menor, centralizado e com link para o início. */
  variant?: 'home' | 'inner';
  title?: string;
  subtitle?: string;
  /** Destino do letreiro nas páginas internas (início no idioma atual). */
  homeHref?: string;
  /** Na home o letreiro é o único `h1`; nas internas ele é só um link. */
}

export function Masthead({
  variant = 'inner',
  title = 'Raphael Sena',
  subtitle = 'Gazeta de um desenvolvedor de software',
  homeHref = '/',
}: MastheadProps) {
  if (variant === 'home') {
    return (
      <header className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 py-4.5 text-center max-md:border-b-[3px] max-md:border-double max-md:border-ink max-md:py-5">
        <div>
          <h1 className="font-masthead text-[clamp(3.25rem,9vw,7rem)] leading-[1.05] font-normal max-md:text-[3.375rem] max-md:leading-none">
            {title}
          </h1>
          <p className="text-xl italic max-md:mt-1 max-md:text-[0.9375rem]">{subtitle}</p>
        </div>
      </header>
    );
  }
  return (
    <header className="py-3.5 text-center max-md:hidden">
      <p className="font-masthead text-[clamp(2.75rem,6.5vw,4.5rem)] leading-[1.05]">
        <Link prefetch={false} href={homeHref} className="no-underline visited:text-ink hover:bg-ink hover:text-paper">
          {title}
        </Link>
      </p>
      <p className="text-[1.1875rem] italic">{subtitle}</p>
    </header>
  );
}
