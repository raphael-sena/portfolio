import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// wrangler.jsonc aceita comentários de linha inteira e vírgula final; removemos antes do parse.
const bruto = readFileSync(new URL('../wrangler.jsonc', import.meta.url), 'utf8');
const config = JSON.parse(
  bruto
    .split('\n')
    .filter((l) => !l.trim().startsWith('//'))
    .join('\n')
    .replace(/,(\s*[}\]])/g, '$1'),
);

describe('wrangler.jsonc', () => {
  it('serve os assets do export estático', () => {
    expect(config.assets.directory).toBe('./out');
    expect(config.assets.binding).toBe('ASSETS');
    expect(config.assets.not_found_handling).toBe('404-page');
  });

  it('roda o Worker primeiro só para /stats/* e /api/*', () => {
    expect(config.assets.run_worker_first).toEqual(['/stats/*', '/api/*']);
  });

  it('não tem rotas nem domínio customizado antes do G8', () => {
    expect(config.routes).toBeUndefined();
    expect(config.route).toBeUndefined();
  });
});
