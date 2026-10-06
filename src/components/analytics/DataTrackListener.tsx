'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics';

/**
 * Cliques rastreados por atributos: `<a data-track="menu_click" data-track-item="about">`.
 * Os componentes de servidor só declaram os dados; este listener é o único ponto que chama `track`.
 * Só nomes e chaves da lista abaixo são enviados (sem PII, sem texto livre).
 */
const ALLOWED: Record<string, readonly string[]> = {
  menu_click: ['item'],
  lang_switch: ['to'],
  contact_click: ['channel'],
  project_open: ['slug'],
  page_turn: ['from', 'to', 'via'],
  resume_download: [],
};

export function DataTrackListener() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const alvo = e.target instanceof Element ? e.target.closest<HTMLElement>('[data-track]') : null;
      const nome = alvo?.dataset.track;
      if (!alvo || !nome) return;
      const chaves = ALLOWED[nome];
      if (!chaves) return;
      const dados: Record<string, string> = {};
      for (const chave of chaves) {
        const valor = alvo.getAttribute(`data-track-${chave}`);
        if (valor) dados[chave] = valor;
      }
      (track as (name: string, props?: Record<string, string>) => void)(nome, chaves.length ? dados : undefined);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
