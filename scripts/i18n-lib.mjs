// Funções puras do fluxo de i18n (testadas em test/i18n-lib.test.ts).
import { createHash } from 'node:crypto';

export function hashOf(texto) {
  return createHash('sha256').update(texto).digest('hex').slice(0, 12);
}

/** Todas as strings de um dicionário com o caminho da chave, ex.: `pages.home.kicker`, `pages.privacy.items[0]`. */
export function flatten(valor, caminho = '') {
  if (typeof valor === 'string') return [[caminho, valor]];
  if (Array.isArray(valor)) return valor.flatMap((v, i) => flatten(v, `${caminho}[${i}]`));
  if (valor && typeof valor === 'object') {
    return Object.entries(valor).flatMap(([k, v]) => flatten(v, caminho ? `${caminho}.${k}` : k));
  }
  return [];
}

/** Lock: para cada idioma e chave, o hash do texto pt do qual a tradução foi feita. */
export function buildLock(pt, outros) {
  const lock = {};
  const fonte = new Map(flatten(pt));
  for (const [locale, dict] of Object.entries(outros)) {
    lock[locale] = {};
    for (const [chave] of flatten(dict)) lock[locale][chave] = hashOf(fonte.get(chave) ?? '');
  }
  return lock;
}

/** Chaves cujo texto pt mudou desde a tradução (ou que ainda não constam do lock). */
export function staleKeys(pt, lock, locale) {
  const registro = lock?.[locale] ?? {};
  return flatten(pt)
    .filter(([chave, texto]) => registro[chave] !== hashOf(texto))
    .map(([chave, texto]) => ({ chave, texto }));
}
