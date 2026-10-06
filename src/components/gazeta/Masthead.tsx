import Link from 'next/link';

interface MastheadProps {
  /** `home`: letreiro grande com as duas caixas laterais. `inner`: letreiro menor, centralizado e com link para o início. */
  variant?: 'home' | 'inner';
  title?: string;
  subtitle?: string;
}

function SideBox({ lines }: { lines: string[] }) {
  return (
    <p className="frame-outline mx-1 my-1 flex-[0_1_150px] border border-ink px-3 py-3 text-center font-label text-xl leading-8 tracking-[0.14em] uppercase">
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </p>
  );
}

export function Masthead({
  variant = 'inner',
  title = 'Raphael Sena',
  subtitle = 'Gazeta de um desenvolvedor de software',
}: MastheadProps) {
  if (variant === 'home') {
    return (
      <header className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 py-4.5 text-center">
        <SideBox lines={['Engenharia de Software', 'PUC Minas']} />
        <div>
          <h1 className="font-masthead text-[clamp(52px,9vw,112px)] leading-[1.05] font-normal">{title}</h1>
          <p className="text-xl italic">{subtitle}</p>
        </div>
        <SideBox lines={['Belo Horizonte', 'Minas Gerais']} />
      </header>
    );
  }
  return (
    <header className="py-3.5 text-center">
      <p className="font-masthead text-[clamp(44px,6.5vw,72px)] leading-[1.05]">
        <Link href="/" className="no-underline visited:text-ink hover:bg-ink hover:text-paper">
          {title}
        </Link>
      </p>
      <p className="text-[19px] italic">{subtitle}</p>
    </header>
  );
}
