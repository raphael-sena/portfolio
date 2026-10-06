import js from '@eslint/js';
import globals from 'globals';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const config = [
  {
    ignores: [
      'out/',
      '.next/',
      '.wrangler/',
      'node_modules/',
      'playwright-report/',
      'test-results/',
      'lighthouse/',
      '.lighthouseci/',
      'archive/',
      'design/',
      'docs/',
      'next-env.d.ts',
      '.claude/',
    ],
  },
  js.configs.recommended,
  ...nextVitals,
  ...nextTypescript,
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
];

export default config;
