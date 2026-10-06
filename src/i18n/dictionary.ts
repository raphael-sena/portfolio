import { de } from '@/content/de';
import { en } from '@/content/en';
import { pt } from '@/content/pt';
import type { Dictionary } from '@/content/dictionary';
import type { Locale } from './config';

const DICTIONARIES: Record<Locale, Dictionary> = { pt, en, de };

/** Só para uso no servidor (Server Components e geração de metadata): o dicionário não vai para o bundle do cliente. */
export function t(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

/** Substitui `{chave}` no texto. */
export function fill(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}
