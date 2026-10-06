'use client';

import { useEffect } from 'react';

/** Depois do evento `load`, libera as fontes de uso raro (classe `late-fonts` no <html>): ver `.pullquote` em globals.css. */
export function LateFonts() {
  useEffect(() => {
    const liberar = () => document.documentElement.classList.add('late-fonts');
    if (document.readyState === 'complete') liberar();
    else window.addEventListener('load', liberar, { once: true });
    return () => window.removeEventListener('load', liberar);
  }, []);
  return null;
}
