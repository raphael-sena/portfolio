/** Grão do papel (WebP de 256px repetido) mais vinheta. Decorativo: fica por cima da folha, sem capturar cliques. */
export function PaperTexture() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[3] mix-blend-multiply">
      <div
        className="absolute inset-0 opacity-70"
        style={{ backgroundImage: 'url(/textures/paper-grain.webp)', backgroundSize: '256px 256px' }}
      />
      <div className="bg-vignette absolute inset-0" />
    </div>
  );
}
