import { DropCap, HatchPlaceholder, LeaderRow, PageHeader, Pullquote, SectionTitle } from '@/components/gazeta';
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
            <DropCap letter={about.p1.charAt(0)} />
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
            <HatchPlaceholder label={about.portrait} height={300} alt={about.portraitAlt} />
            <figcaption className="mt-2 text-base italic">{about.portraitCaption}</figcaption>
          </figure>
          <div className="mt-8">
            <SectionTitle>{about.sheet.title}</SectionTitle>
            <div className="mt-3">
              <LeaderRow label={about.sheet.city}>{about.sheet.cityValue}</LeaderRow>
              <LeaderRow label={about.sheet.education}>{about.sheet.educationValue}</LeaderRow>
              <LeaderRow label={about.sheet.interests}>{about.sheet.interestsValue}</LeaderRow>
              <LeaderRow label={about.sheet.outside}>{about.sheet.outsideValue}</LeaderRow>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
