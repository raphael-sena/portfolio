/** Quadro estático da virada de página (rotateY de 0 a -180deg, origem à esquerda, sombra na dobra). A animação por View Transitions entra no G4. */
export function PageTurnPreview({ angle, label, page }: { angle: number; label: string; page: number }) {
  return (
    <div className="relative h-56 w-full overflow-hidden border border-ink bg-paper" style={{ perspective: 900 }}>
      <div aria-hidden="true" className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <p className="font-label text-[22px] tracking-[0.3em] uppercase">Página {page}</p>
        <hr className="my-2 w-3/4 border-0 border-t-4 border-double border-ink" />
        <p className="font-headline text-[34px] leading-[1.05] font-extrabold">{label}</p>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 origin-left border border-ink bg-paper backface-hidden"
        style={{ transform: `rotateY(${angle}deg)` }}
      >
        <div className="absolute inset-0 flex items-center justify-center font-label text-xl tracking-widest uppercase">
          Página atual
        </div>
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgb(0 0 0 / 0), rgb(0 0 0 / 0.65))',
            opacity: Math.abs(angle) / 180,
          }}
        />
      </div>
    </div>
  );
}
