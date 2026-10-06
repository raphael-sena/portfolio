'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics';

/** Dispara `not_found {path}` quando a página 404 é exibida (sem query string nem fragmento). */
export function TrackNotFound() {
  useEffect(() => {
    track('not_found', { path: window.location.pathname });
  }, []);
  return null;
}
