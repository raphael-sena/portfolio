import Link from 'next/link';
import { Callout, DropCap, MacViewer, Ornament, SectionTitle } from '@/components/gazeta';
import { RESUME_FILES } from '@/content/data';
import type { Locale } from '@/i18n/config';
import { t } from '@/i18n/dictionary';
import { pageNumber, pathFor, type PageId } from '@/i18n/routes';

const EDITION_IDS = [
  'about',
  'experience',
  'projects',
  'technologies',
  'timeline',
  'contact',
] as const satisfies PageId[];

export function HomePage({ locale }: { locale: Locale }) {
  const dict = t(locale);
  const { home } = dict.pages;
  const body = home.body;
  return (
    <div className="flex flex-wrap gap-y-9 max-md:gap-y-6">
      <article className="min-w-0 flex-[1_1_260px] lg:pr-7">
        <p className="font-label text-xl tracking-[0.22em] uppercase max-md:text-[1.0625rem] max-md:tracking-[0.2em]">
          {home.kicker}
        </p>
        <h2 className="font-headline text-[clamp(1.5rem,2.5vw,2.125rem)] leading-[1.1] font-extrabold [overflow-wrap:anywhere] hyphens-auto max-md:text-[1.9375rem] max-md:leading-[1.1]">
          {home.headline}
        </h2>
        <p className="mt-3 text-xl italic max-md:text-[1.0625rem] max-md:leading-[1.4]">{home.lead}</p>
        <hr className="my-4 border-0 border-t border-ink max-md:hidden" />
        <p className="prose-gazeta max-md:hidden">
          <DropCap letter={body.charAt(0)} />
          {body.slice(1)}
        </p>
        <p className="mt-4 max-md:hidden">
          <Link prefetch={false} href={pathFor(locale, 'about')} className="inline-flex min-h-11 items-center">
            {home.continue}
          </Link>
        </p>
      </article>

      <section aria-label="Computador" className="min-w-0 flex-[1.4_1_420px] lg:border-x lg:border-ink lg:px-7">
        <MacViewer labels={dict.common.mac} />
      </section>

      <section aria-labelledby="edicao" className="min-w-0 flex-[1_0_100%] md:hidden">
        <SectionTitle>
          <span id="edicao">{home.edition.title}</span>
        </SectionTitle>
        <ul>
          {EDITION_IDS.map((id) => (
            <li key={id}>
              <Link
                prefetch={false}
                href={pathFor(locale, id)}
                className="block border-b border-ink py-3.5 no-underline visited:text-ink active:bg-grey-4"
              >
                <span className="mb-1 block font-label text-[1.0625rem] tracking-[0.2em] uppercase">
                  {dict.common.nav[id]} · {dict.common.dateline.page} {pageNumber(id)}
                </span>
                <span className="block font-headline text-[1.375rem] leading-[1.15] font-bold">
                  {home.edition.items[id].title}
                </span>
                <span className="mt-1 block text-[0.9375rem] leading-[1.4]">{home.edition.items[id].text}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-5">
          <a
            href={RESUME_FILES[locale]}
            data-track="resume_download"
            className="flex min-h-13 items-center justify-between border-2 border-ink px-4 font-label text-xl tracking-[0.14em] uppercase no-underline visited:text-ink active:bg-ink active:text-paper"
          >
            <span>{home.aside.resume.link.replace(/\s*→$/, '')}</span>
            <span aria-hidden="true">→</span>
          </a>
        </p>
      </section>

      <aside aria-labelledby="destaque" className="min-w-0 flex-[1_1_240px] max-md:hidden lg:pl-7">
        <SectionTitle>
          <span id="destaque">{home.aside.title}</span>
        </SectionTitle>
        <h3 className="mt-3 font-headline text-[1.625rem] leading-[1.1] font-bold">{home.aside.timeline.title}</h3>
        <p className="prose-gazeta mt-1">{home.aside.timeline.text}</p>
        <p className="mt-2">
          <Link prefetch={false} href={pathFor(locale, 'timeline')} className="inline-flex min-h-11 items-center">
            {home.aside.timeline.link}
          </Link>
        </p>
        <Ornament />
        <h3 className="font-headline text-[1.625rem] leading-[1.1] font-bold">{home.aside.resume.title}</h3>
        <p className="prose-gazeta mt-1">{home.aside.resume.text}</p>
        <p className="mt-2">
          <a href={RESUME_FILES[locale]} data-track="resume_download" className="inline-flex min-h-11 items-center">
            {home.aside.resume.link}
          </a>
        </p>
        <div className="mt-6">
          <Callout title={home.aside.ad.title}>
            <p>{home.aside.ad.text}</p>
            <Link
              prefetch={false}
              href={pathFor(locale, 'contact')}
              className="inline-flex min-h-11 items-center not-italic"
            >
              {home.aside.ad.link}
            </Link>
          </Callout>
        </div>
      </aside>
    </div>
  );
}
