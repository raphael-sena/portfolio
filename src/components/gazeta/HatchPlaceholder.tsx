interface HatchPlaceholderProps {
  /** Rótulo visível, por exemplo "[FIG. 1]" ou "[RETRATO]". */
  label: string;
  height?: number;
  /** Texto alternativo; sem ele, o placeholder é decorativo. */
  alt?: string;
}

export function HatchPlaceholder({ label, height = 200, alt }: HatchPlaceholderProps) {
  return (
    <div
      {...(alt ? { role: 'img', 'aria-label': alt } : { 'aria-hidden': true })}
      className="bg-engraving frame-outline flex items-center justify-center border-[3px] border-ink p-3"
      style={{ height }}
    >
      <span className="bg-paper px-2.5 py-1 font-label text-xl tracking-[0.14em] uppercase">{label}</span>
    </div>
  );
}
