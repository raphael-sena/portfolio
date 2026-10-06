import type { ReactNode } from 'react';
import { PaperTexture } from './PaperTexture';

/** As 4 folhas de trás, da mais distante para a mais próxima (docs/DESIGN-SPEC.md seção 1). */
const BACK_SHEETS = [
  { color: 'bg-grey-4', transform: 'translate(26px, 24px) rotate(-0.35deg)' },
  { color: 'bg-grey-3', transform: 'translate(19px, 17px) rotate(0.4deg)' },
  { color: 'bg-grey-2', transform: 'translate(12px, 11px) rotate(-0.25deg)' },
  { color: 'bg-sheet-4', transform: 'translate(6px, 5px) rotate(0.2deg)' },
] as const;

interface PageStackProps {
  children: ReactNode;
  /** Gradiente de lombada à esquerda (páginas internas). */
  spine?: boolean;
  /** Reserva espaço no rodapé para a orelha de página. */
  earSpace?: boolean;
  className?: string;
}

/** Cenário escuro com hachura e a pilha de folhas inclinadas atrás da folha principal. */
export function PageStack({ children, spine = true, earSpace = true, className = '' }: PageStackProps) {
  return (
    <div className="bg-stage-hatch overflow-hidden py-7 pr-11 pb-13 pl-6">
      <div className="relative mx-auto max-w-295">
        {BACK_SHEETS.map((sheet) => (
          <div
            key={sheet.color}
            aria-hidden="true"
            className={`${sheet.color} absolute inset-0 border border-ink shadow-sheet-back`}
            style={{ transform: sheet.transform }}
          />
        ))}
        <div
          className={`relative z-[5] overflow-hidden border border-ink bg-paper text-ink shadow-sheet ${earSpace ? 'pb-24' : 'pb-8'} ${className}`}
        >
          {spine && <div aria-hidden="true" className="bg-spine pointer-events-none absolute inset-0" />}
          <div className="relative mx-auto max-w-280 px-5 pt-5">{children}</div>
          <PaperTexture />
        </div>
      </div>
    </div>
  );
}
