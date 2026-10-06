import type { Metadata } from 'next';
import Link from 'next/link';
import { AnalyticsClient } from '@/components/analytics/AnalyticsClient';
import { TrackNotFound } from '@/components/analytics/TrackNotFound';
import { UmamiScript } from '@/components/analytics/UmamiScript';
import { SkipLink } from '@/components/gazeta';
import { pt } from '@/content/pt';
import { fontClassName } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: pt.notFound.title,
};

/** 404 de qualquer URL desconhecida (sem layout, sem idioma conhecido): em pt-BR, com saídas para os três idiomas. */
export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" className={fontClassName}>
      <head>
        <UmamiScript />
      </head>
      <body>
        <SkipLink label={pt.common.skipLink} />
        <AnalyticsClient />
        <TrackNotFound />
        <main id="conteudo" tabIndex={-1} className="mx-auto max-w-295 px-6 py-7 outline-none">
          <div className="border border-ink bg-paper px-5 py-8 text-center text-ink shadow-sheet">
            <h1 className="font-headline text-[clamp(34px,5vw,60px)] leading-[1.1] font-extrabold">
              {pt.notFound.heading}
            </h1>
            <p className="mt-3">{pt.notFound.text}</p>
            <p className="mt-4 font-label text-xl tracking-[0.14em] uppercase">
              <Link href="/" className="inline-flex min-h-11 items-center px-3">
                Português
              </Link>
              <Link href="/en/" hrefLang="en" lang="en" className="inline-flex min-h-11 items-center px-3">
                English
              </Link>
              <Link href="/de/" hrefLang="de" lang="de" className="inline-flex min-h-11 items-center px-3">
                Deutsch
              </Link>
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
