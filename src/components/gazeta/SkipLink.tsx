/** Primeiro elemento focável da página: pula para o conteúdo principal (`<main id="conteudo">`). */
export function SkipLink({ label = 'Pular para o conteúdo' }: { label?: string }) {
  return (
    <a
      href="#conteudo"
      className="absolute top-2 left-2 z-50 -translate-y-24 border-2 border-transparent bg-ink px-4 py-2 font-label text-xl tracking-[0.14em] text-paper uppercase no-underline visited:text-paper focus:translate-y-0 focus:border-paper"
    >
      {label}
    </a>
  );
}
