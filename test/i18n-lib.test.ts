import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
// @ts-expect-error módulo .mjs sem tipos
import { buildLock, flatten, hashOf, staleKeys } from '../scripts/i18n-lib.mjs';
import { de } from '../src/content/de';
import { en } from '../src/content/en';
import { pt } from '../src/content/pt';

describe('i18n-lib', () => {
  it('flatten usa caminhos estáveis, inclusive para arrays', () => {
    expect(flatten({ a: { b: 'x' }, c: ['y', 'z'] })).toEqual([
      ['a.b', 'x'],
      ['c[0]', 'y'],
      ['c[1]', 'z'],
    ]);
  });

  it('staleKeys detecta só o que mudou no pt', () => {
    const antigo = { a: 'um', b: 'dois' };
    const lock = buildLock(antigo, { en: { a: 'one', b: 'two' } });
    expect(staleKeys(antigo, lock, 'en')).toEqual([]);
    expect(staleKeys({ a: 'um', b: 'dois!' }, lock, 'en')).toEqual([{ chave: 'b', texto: 'dois!' }]);
    expect(staleKeys({ a: 'um', b: 'dois', c: 'três' }, lock, 'en')).toEqual([{ chave: 'c', texto: 'três' }]);
  });

  it('hashOf é determinístico', () => {
    expect(hashOf('abc')).toBe(hashOf('abc'));
    expect(hashOf('abc')).not.toBe(hashOf('abd'));
  });

  it('o lock versionado está em dia com o pt atual (mesma regra do `pnpm i18n:check`)', () => {
    const lock = JSON.parse(readFileSync(new URL('../src/content/i18n.lock.json', import.meta.url), 'utf8'));
    expect(staleKeys(pt, lock, 'en')).toEqual([]);
    expect(staleKeys(pt, lock, 'de')).toEqual([]);
    expect(Object.keys(lock.en)).toHaveLength(flatten(en).length);
    expect(Object.keys(lock.de)).toHaveLength(flatten(de).length);
  });
});
