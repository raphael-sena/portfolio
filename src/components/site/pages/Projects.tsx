import { HatchPlaceholder, PageHeader } from '@/components/gazeta';
import { projects } from '@/content/data';
import type { Locale } from '@/i18n/config';
import { fill, t } from '@/i18n/dictionary';
import { pageNumber } from '@/i18n/routes';

export function ProjectsPage({ locale }: { locale: Locale }) {
  const dict = t(locale);
  const { projects: texts } = dict.pages;
  const kicker = `${dict.common.nav.projects} · ${dict.common.dateline.page} ${pageNumber('projects')}`;
  return (
    <>
      <PageHeader kicker={kicker} title={texts.title} lead={texts.lead} />
      <ul className="mt-8 flex flex-wrap gap-y-10">
        {projects.map((project, i) => (
          <li
            key={project.slug}
            className="min-w-0 flex-[1_1_280px] lg:px-5 lg:first:pl-0 lg:[&:not(:nth-child(3n+1))]:border-l lg:[&:not(:nth-child(3n+1))]:border-ink lg:[&:nth-child(3n)]:pr-0 lg:[&:nth-child(3n+1)]:pl-0"
          >
            <article>
              <figure>
                <HatchPlaceholder
                  label={fill(texts.figure, { n: i + 1 })}
                  height={200}
                  alt={fill(texts.figureAlt, { name: project.name })}
                />
              </figure>
              <h2 className="mt-4 font-headline text-[1.75rem] leading-[1.1] font-bold">{project.name}</h2>
              <p className="mt-1 font-label text-[1.3125rem] tracking-[0.14em] uppercase">
                {texts.stack}: {(project.stack ?? project.languages ?? []).join(' · ')}
              </p>
              <p className="prose-gazeta mt-2">{texts.descriptions[project.slug]}</p>
              {project.repo && (
                <p className="mt-2">
                  <a
                    href={project.repo}
                    rel="noopener"
                    data-track="project_open"
                    data-track-slug={project.slug}
                    className="inline-flex min-h-11 items-center"
                  >
                    {dict.common.openRepo}
                  </a>
                </p>
              )}
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
