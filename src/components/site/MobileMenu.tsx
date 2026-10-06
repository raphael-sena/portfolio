'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/**
 * Menu de seções do mobile: um <details> nativo (funciona sem JavaScript). A `key` é o caminho, então a navegação do
 * cliente remonta o elemento e o menu fecha sozinho.
 */
export function MobileMenu({ label, children }: { label: string; children: ReactNode }) {
  const pathname = usePathname();
  return (
    <details key={pathname} className="group w-11">
      <summary
        aria-label={label}
        className="flex h-11 w-11 cursor-pointer list-none items-center justify-center [&::-webkit-details-marker]:hidden"
      >
        <svg className="group-open:hidden" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 6H21M3 12H21M3 18H21" stroke="#111111" strokeWidth="2.5" fill="none" />
        </svg>
        <svg className="hidden group-open:block" width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
          <path d="M4 4L18 18M18 4L4 18" stroke="#111111" strokeWidth="2.5" fill="none" />
        </svg>
      </summary>
      {children}
    </details>
  );
}
