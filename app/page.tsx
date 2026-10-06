export default function HomePage() {
  return (
    <main id="conteudo" tabIndex={-1} className="mx-auto max-w-295 px-6 py-7">
      <div className="border border-ink bg-paper px-5 py-8 text-center text-ink shadow-sheet">
        <p className="font-label text-[19px] tracking-[0.14em] uppercase">Belo Horizonte, Minas Gerais</p>
        <h1 className="font-masthead text-[clamp(52px,9vw,112px)] leading-[1.05]">Raphael Sena</h1>
        <p className="text-xl italic">Gazeta de um desenvolvedor de software</p>
        <p className="mt-6 font-label text-[19px] tracking-[0.14em] uppercase">Edição em construção (fundação do G1)</p>
      </div>
    </main>
  );
}
