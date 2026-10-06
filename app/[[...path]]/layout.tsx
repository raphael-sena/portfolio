import type { Viewport } from 'next';
import { AnalyticsClient } from '@/components/analytics/AnalyticsClient';
import { UmamiScript } from '@/components/analytics/UmamiScript';
import { SkipLink } from '@/components/gazeta';
import { PageTurnRouter } from '@/components/site/PageTurnRouter';
import { DEFAULT_LOCALE, HTML_LANG } from '@/i18n/config';
import { t } from '@/i18n/dictionary';
import { resolveSegments } from '@/i18n/routes';
import { fontClassName } from '@/lib/fonts';
import '../globals.css';

export const viewport: Viewport = {
  themeColor: '#161616',
};

/**
 * Layout raiz único: o idioma vem sempre da URL (`/`, `/en/...`, `/de/...`), nunca de localStorage nem de middleware
 * (incompatível com `output: "export"`). O 404 de rotas desconhecidas fica em app/global-not-found.tsx.
 */
export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ path?: string[] }> }>) {
  const { path } = await params;
  const locale = resolveSegments(path)?.locale ?? DEFAULT_LOCALE;
  return (
    <html lang={HTML_LANG[locale]} className={fontClassName}>
      <head>
        <UmamiScript />
      </head>
      <body>
        <SkipLink label={t(locale).common.skipLink} />
        <AnalyticsClient />
        <PageTurnRouter />
        {children}
      </body>
    </html>
  );
}
