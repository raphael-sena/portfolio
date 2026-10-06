import { DropCapImage, LeaderRow, PageHeader, Pullquote, SectionTitle } from '@/components/gazeta';
import { LateImage } from '@/components/site/LateImage';
import type { Locale } from '@/i18n/config';
import { t } from '@/i18n/dictionary';
import { pageNumber } from '@/i18n/routes';

export function AboutPage({ locale }: { locale: Locale }) {
  const dict = t(locale);
  const { about } = dict.pages;
  const kicker = `${dict.common.nav.about} · ${dict.common.dateline.page} ${pageNumber('about')}`;
  return (
    <>
      <PageHeader kicker={kicker} title={about.title} lead={about.lead} />
      <div className="mt-8 flex flex-wrap gap-y-9">
        <article className="min-w-0 flex-[2_1_420px] lg:pr-8">
          <p className="prose-gazeta">
            <DropCapImage
              letter={about.p1.charAt(0)}
              src="/art/Printing_World_draped_dropcap_R.webp"
              width={284}
              height={628}
            />
            {about.p1.slice(1)}
          </p>
          <p className="prose-gazeta mt-4">{about.p2}</p>
          <div className="my-6">
            <Pullquote>{about.quote}</Pullquote>
          </div>
          <p className="prose-gazeta">{about.p3}</p>
        </article>
        <aside className="min-w-0 flex-[1_1_280px] lg:border-l lg:border-ink lg:pl-8">
          <figure>
            <LateImage
              src="/art/the-newspaper-correspondent.webp"
              alt={about.figureAlt}
              width={960}
              height={678}
              className="frame-outline block h-auto w-full border-[3px] border-ink mix-blend-multiply"
            />
            <figcaption className="mt-3 text-base italic">
              {about.figureCaption}{' '}
              <a href="https://commons.wikimedia.org/wiki/File:The_Newspaper_Correspondent.jpg" rel="noopener">
                {about.figureSource}
              </a>
              .
            </figcaption>
          </figure>
          <div className="mt-8">
            <SectionTitle>{about.sheet.title}</SectionTitle>
            <div className="mt-3">
              <LeaderRow label={about.sheet.city}>{about.sheet.cityValue}</LeaderRow>
              <LeaderRow label={about.sheet.education}>{about.sheet.educationValue}</LeaderRow>
              <LeaderRow label={about.sheet.interests}>{about.sheet.interestsValue}</LeaderRow>
              <LeaderRow label={about.sheet.outside}>{about.sheet.outsideValue}</LeaderRow>
              <LeaderRow label={about.sheet.languages}>{about.sheet.languagesValue}</LeaderRow>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
