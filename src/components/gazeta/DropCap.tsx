/** Capitular (Bodoni 800, 80px): envolve a primeira letra e deixa o resto do texto ao redor. */
export function DropCap({ letter }: { letter: string }) {
  return (
    <span
      aria-hidden="true"
      className="float-left pt-1.5 pr-2.5 font-headline text-[80px] leading-[0.78] font-extrabold"
    >
      {letter}
    </span>
  );
}
