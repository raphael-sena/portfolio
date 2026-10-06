import Link from 'next/link';

/** "Raphael [linotipo] Sena": a vinheta é decorativa e proporcional ao tamanho do letreiro (em `em`); o centro dela fica na linha de base do título e as palavras chegam perto dela. */
function TitleWithMark({ title }: { title: string }) {
  const [first = title, ...rest] = title.split(' ');
  const last = rest.join(' ');
  if (!last) return <>{title}</>;
  return (
    <span className="[word-spacing:-0.2em]">
      <span>{first}</span> {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/art/linotype-mark.webp"
        alt=""
        aria-hidden="true"
        width={240}
        height={280}
        decoding="async"
        className="inline-block h-[1.05em] w-auto align-[-0.525em] group-hover:invert"
      />{' '}
      <span>{last}</span>
    </span>
  );
}

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
          <h1 className="font-masthead text-[clamp(3.25rem,9vw,7rem)] leading-[1.05] font-normal max-md:text-[2.75rem] max-md:leading-none max-md:whitespace-nowrap">
            <TitleWithMark title={title} />
          </h1>
          <p className="text-xl italic max-md:mt-1 max-md:text-[0.9375rem]">{subtitle}</p>
        </div>
      </header>
    );
  }
  return (
    <header className="py-3.5 text-center max-md:hidden">
      <p className="font-masthead text-[clamp(2.75rem,6.5vw,4.5rem)] leading-[1.05]">
        <Link
          prefetch={false}
          href={homeHref}
          className="group no-underline visited:text-ink hover:bg-ink hover:text-paper"
        >
          <TitleWithMark title={title} />
        </Link>
      </p>
      <p className="text-[1.1875rem] italic">{subtitle}</p>
    </header>
  );
}
