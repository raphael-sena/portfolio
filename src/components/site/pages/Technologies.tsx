import { DiamondBullet, PageHeader, SectionTitle } from '@/components/gazeta';
import { technologies, type TechGroupId } from '@/content/data';
import type { Locale } from '@/i18n/config';
import { t } from '@/i18n/dictionary';
import { pageNumber } from '@/i18n/routes';

export function TechnologiesPage({ locale }: { locale: Locale }) {
  const dict = t(locale);
  const { technologies: texts } = dict.pages;
  const kicker = `${dict.common.nav.technologies} · ${dict.common.dateline.page} ${pageNumber('technologies')}`;
  const groups = Object.keys(technologies) as TechGroupId[];
  return (
    <>
      <PageHeader kicker={kicker} title={texts.title} lead={texts.lead} />
      <div className="mt-8 grid gap-x-8 gap-y-9 max-md:gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <section key={group} aria-labelledby={`tech-${group}`}>
            <SectionTitle>
              <span id={`tech-${group}`}>{texts.groups[group]}</span>
            </SectionTitle>
            <ul className="mt-3 max-md:mt-2 max-md:flex max-md:flex-wrap">
              {[...technologies[group], ...((texts.extra as Record<string, string[]>)[group] ?? [])].map((name) => (
                <li
                  key={name}
                  className="flex min-h-11 items-center gap-3 text-xl max-md:min-h-0 max-md:text-base max-md:after:mx-1.5 max-md:after:content-['·'] max-md:last:after:content-none"
                >
                  <span className="max-md:hidden">
                    <DiamondBullet />
                  </span>
                  {name}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
