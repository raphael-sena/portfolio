import { describe, expect, it } from 'vitest';
import reviewed from '../src/content/reviewed.json';
import { DICTIONARIES, dictionarySchema, flatten } from '../src/content/schema';
import { LOCALES } from '../src/i18n/config';
import {
  PAGE_IDS,
  allRoutes,
  nextPage,
  pageNumber,
  pathFor,
  resolveSegments,
  segmentsFor,
  type PageId,
} from '../src/i18n/routes';

describe('dicionários', () => {
  it.each(LOCALES)('%s tem exatamente as chaves do pt (schema Zod)', (locale) => {
    const resultado = dictionarySchema.safeParse(DICTIONARIES[locale]);
    expect(resultado.success, resultado.success ? '' : JSON.stringify(resultado.error.issues.slice(0, 3))).toBe(true);
  });

  it.each(LOCALES)('%s não tem string vazia', (locale) => {
    const vazias = flatten(DICTIONARIES[locale]).filter(([, v]) => v.trim() === '');
    expect(vazias).toEqual([]);
  });

  it.each(LOCALES)('%s: title ≤ 60, description ≤ 155 e sem placeholder', (locale) => {
    for (const [id, meta] of Object.entries(DICTIONARIES[locale].meta)) {
      expect(meta.title.length, `${locale}.${id}.title`).toBeLessThanOrEqual(60);
      expect(meta.description.length, `${locale}.${id}.description`).toBeLessThanOrEqual(155);
      expect(`${meta.title} ${meta.description}`, `${locale}.${id}`).not.toMatch(/\[[^\]]*\]/);
    }
  });

  it.each(LOCALES)('%s: titles e descriptions únicos entre as páginas', (locale) => {
    const metas = Object.values(DICTIONARIES[locale].meta);
    expect(new Set(metas.map((m) => m.title)).size).toBe(metas.length);
    expect(new Set(metas.map((m) => m.description)).size).toBe(metas.length);
  });

  it('o texto em de/en não é cópia do pt (exceto nomes próprios)', () => {
    const ptPlano = new Map(flatten(DICTIONARIES.pt));
    const iguais = flatten(DICTIONARIES.de).filter(([k, v]) => v === ptPlano.get(k) && v.length > 40);
    expect(iguais).toEqual([]);
  });

  it('en e de começam como não revisados; só o pt é fonte revisada', () => {
    expect(reviewed.pt).toBe(true);
    expect(typeof reviewed.en).toBe('boolean');
    expect(reviewed.de).toBe(false);
  });
});

describe('rotas', () => {
  it('pt na raiz; en e de com prefixo; slugs iguais nos três idiomas', () => {
    expect(pathFor('pt', 'home')).toBe('/');
    expect(pathFor('pt', 'about')).toBe('/sobre/');
    expect(pathFor('en', 'home')).toBe('/en/');
    expect(pathFor('en', 'about')).toBe('/en/sobre/');
    expect(pathFor('de', 'timeline')).toBe('/de/linha-do-tempo/');
  });

  it('a orelha percorre 1>2>3>4>5>6>7>1', () => {
    const sequencia: string[] = [];
    let id: PageId = PAGE_IDS[0];
    for (let i = 0; i < PAGE_IDS.length + 1; i++) {
      sequencia.push(`${pageNumber(id)}`);
      id = nextPage(id);
    }
    expect(sequencia.join('>')).toBe('1>2>3>4>5>6>7>1');
  });

  it('resolveSegments é o inverso de segmentsFor para todas as rotas', () => {
    for (const { locale, id } of allRoutes()) {
      expect(resolveSegments(segmentsFor(locale, id))).toEqual({ locale, id });
    }
    expect(resolveSegments(['nao-existe'])).toBeNull();
    expect(resolveSegments(['en', 'about'])).toBeNull();
    expect(resolveSegments(['en', 'design-system'])).toBeNull();
  });

  it('gera 7 páginas × 3 idiomas + privacidade × 3 + o guia (só pt)', () => {
    expect(allRoutes()).toHaveLength(7 * 3 + 3 + 1);
  });
});
