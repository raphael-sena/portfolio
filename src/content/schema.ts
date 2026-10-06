import { z } from 'zod';
import { de } from './de';
import { en } from './en';
import { pt } from './pt';

/**
 * Schema derivado do dicionário pt-BR (fonte de verdade): toda string não pode ser vazia, e os arrays de en e de
 * precisam ter o mesmo tamanho do pt. Placeholders `[...]` são permitidos no conteúdo (listados em docs/CONTENT-TODO.md);
 * title e description das páginas são verificados à parte (sem placeholder, com limite de tamanho).
 */
export function schemaFrom(value: unknown): z.ZodType {
  if (typeof value === 'string') return z.string().min(1);
  if (Array.isArray(value)) {
    return z.array(value.length ? schemaFrom(value[0]) : z.never()).length(value.length);
  }
  if (value && typeof value === 'object') {
    return z.strictObject(Object.fromEntries(Object.entries(value).map(([k, v]) => [k, schemaFrom(v)])));
  }
  throw new Error(`Valor não suportado no dicionário: ${String(value)}`);
}

export const dictionarySchema = schemaFrom(pt);

export const DICTIONARIES = { pt, en, de } as const;

/** Todas as strings do dicionário, com o caminho da chave (`pages.home.kicker`). */
export function flatten(value: unknown, path = ''): Array<[string, string]> {
  if (typeof value === 'string') return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((v, i) => flatten(v, `${path}[${i}]`));
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => flatten(v, path ? `${path}.${k}` : k));
  }
  return [];
}
