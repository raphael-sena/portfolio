import Link from 'next/link';
import { Callout, DropCap, MacViewer, Ornament, SectionTitle } from '@/components/gazeta';
import { RESUME_FILES } from '@/content/data';
import type { Locale } from '@/i18n/config';
import { t } from '@/i18n/dictionary';
import { pathFor } from '@/i18n/routes';

export function HomePage({ locale }: { locale: Locale }) {
  const dict = t(locale);
  const { home } = dict.pages;
  const body = home.body;
  return (
    <div className="flex flex-wrap gap-y-9">
      <article className="min-w-0 flex-[1_1_260px] lg:pr-7">
        <p className="font-label text-xl tracking-[0.22em] uppercase">{home.kicker}</p>
        <h2 className="font-headline text-[clamp(30px,3.4vw,40px)] leading-[1.1] font-extrabold">{home.headline}</h2>
        <p className="mt-3 text-xl italic">{home.lead}</p>
        <hr className="my-4 border-0 border-t border-ink" />
        <p className="prose-gazeta">
          <DropCap letter={body.charAt(0)} />
          {body.slice(1)}
        </p>
        <p className="mt-4">
          <Link href={pathFor(locale, 'about')} className="inline-flex min-h-11 items-center">
            {home.continue}
          </Link>
        </p>
      </article>

      <section aria-label="Computador" className="min-w-0 flex-[1.4_1_420px] lg:border-x lg:border-ink lg:px-7">
        <MacViewer labels={dict.common.mac} />
      </section>

      <aside aria-labelledby="destaque" className="min-w-0 flex-[1_1_240px] lg:pl-7">
        <SectionTitle>
          <span id="destaque">{home.aside.title}</span>
        </SectionTitle>
        <h3 className="mt-3 font-headline text-[26px] leading-[1.1] font-bold">{home.aside.timeline.title}</h3>
        <p className="prose-gazeta mt-1">{home.aside.timeline.text}</p>
        <p className="mt-2">
          <Link href={pathFor(locale, 'timeline')} className="inline-flex min-h-11 items-center">
            {home.aside.timeline.link}
          </Link>
        </p>
        <Ornament />
        <h3 className="font-headline text-[26px] leading-[1.1] font-bold">{home.aside.resume.title}</h3>
        <p className="prose-gazeta mt-1">{home.aside.resume.text}</p>
        <p className="mt-2">
          <a href={RESUME_FILES[locale]} data-track="resume_download" className="inline-flex min-h-11 items-center">
            {home.aside.resume.link}
          </a>
        </p>
        <div className="mt-6">
          <Callout title={home.aside.ad.title}>
            <p>{home.aside.ad.text}</p>
            <Link href={pathFor(locale, 'contact')} className="inline-flex min-h-11 items-center not-italic">
              {home.aside.ad.link}
            </Link>
          </Callout>
        </div>
      </aside>
    </div>
  );
}
