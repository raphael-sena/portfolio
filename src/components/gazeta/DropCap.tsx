/** Capitular (Bodoni 800, 80px): envolve a primeira letra e deixa o resto do texto ao redor. A letra também vai para leitores de tela. */
export function DropCap({ letter }: { letter: string }) {
  return (
    <>
      <span className="sr-only">{letter}</span>
      <span
        aria-hidden="true"
        className="float-left pt-1.5 pr-2.5 font-headline text-[5rem] leading-[0.78] font-extrabold"
      >
        {letter}
      </span>
    </>
  );
}
