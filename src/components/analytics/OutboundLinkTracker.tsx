'use client';

import { useEffect } from 'react';
import { hostExterno, track } from '@/lib/analytics';

/** Delegação de clique: links http(s) para outro host viram outbound_click {host}. Não renderiza nada. */
export function OutboundLinkTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const alvo = e.target instanceof Element ? e.target.closest('a[href]') : null;
      if (!alvo) return;
      const host = hostExterno(alvo.getAttribute('href') ?? '', window.location.href);
      if (host) track('outbound_click', { host });
    };
    // Captura: registra mesmo se algum handler parar a propagação.
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
