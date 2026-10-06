import type { ReactNode } from 'react';
import { Callout, PageHeader, SectionTitle } from '@/components/gazeta';
import { education, extraCourses, formatMonth, jobs, RESUME_FILES } from '@/content/data';
import type { Locale } from '@/i18n/config';
import { t } from '@/i18n/dictionary';
import { pageNumber } from '@/i18n/routes';

function Highlights({ items }: { items: Array<{ title: string; text: string }> }) {
  return (
    <ul className="mt-2 space-y-2">
      {items.map((item) => (
        <li key={item.title}>
          <span className="font-label text-[1.3125rem] tracking-[0.1em] uppercase">{item.title}.</span>{' '}
          <span className="prose-gazeta">{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

function Row({
  period,
  title,
  subtitle,
  children,
  last,
}: {
  period: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  last?: boolean;
}) {
  return (
    <article className={`flex flex-wrap gap-x-6 gap-y-1.5 py-5 ${last ? '' : 'border-b border-ink'}`}>
      <p className="flex-[0_0_150px] font-label text-2xl tracking-widest uppercase">{period}</p>
      <div className="min-w-0 flex-[1_1_260px]">
        <h3 className="font-headline text-[1.625rem] leading-[1.15] font-bold">{title}</h3>
        {subtitle && <p className="italic">{subtitle}</p>}
        {children}
      </div>
    </article>
  );
}

export function ExperiencePage({ locale }: { locale: Locale }) {
  const dict = t(locale);
  const { experience } = dict.pages;
  const { common } = dict;
  const kicker = `${common.nav.experience} · ${common.dateline.page} ${pageNumber('experience')}`;

  const range = (from: string, to: string | null, current: boolean) => {
    const end = to ? formatMonth(locale, to) : current ? common.present : '';
    return end ? `${formatMonth(locale, from)} – ${end}` : formatMonth(locale, from);
  };

  return (
    <>
      <PageHeader kicker={kicker} title={experience.title} lead={experience.lead} />
      <div className="mt-6 flex flex-wrap gap-x-8 gap-y-9">
        <div className="min-w-0 flex-[3_1_460px]">
          <SectionTitle align="left">{experience.jobsTitle}</SectionTitle>
          {jobs.map((job, i) => {
            const text = experience.jobs[job.id];
            return (
              <Row
                key={job.id}
                period={range(job.from, job.to, job.current)}
                title={job.company}
                subtitle={job.id === 'puc' ? `${text.role} · ${experience.pucNote}` : text.role}
                last={i === jobs.length - 1}
              >
                <Highlights items={text.items} />
              </Row>
            );
          })}

          <div className="mt-8">
            <SectionTitle align="left">{experience.educationTitle}</SectionTitle>
          </div>
          {education.map((item, i) => {
            const text = experience.education[item.id];
            return (
              <Row
                key={item.id}
                period={`${formatMonth(locale, item.from)} – ${formatMonth(locale, item.to)}`}
                title={item.institution}
                subtitle={`${text.title} · ${text.place}`}
                last={i === education.length - 1}
              >
                {'items' in text ? <Highlights items={text.items} /> : <p className="prose-gazeta mt-1">{text.text}</p>}
              </Row>
            );
          })}

          <div className="mt-8">
            <SectionTitle align="left">{experience.coursesTitle}</SectionTitle>
          </div>
          <ul>
            {extraCourses.map((course, i) => (
              <li
                key={course.id}
                className={`flex flex-wrap gap-x-6 gap-y-1 py-3 ${i === extraCourses.length - 1 ? '' : 'border-b border-ink'}`}
              >
                <span className="flex-[0_0_150px] font-label text-2xl tracking-widest uppercase">
                  {formatMonth(locale, course.date)}
                </span>
                <span className="min-w-0 flex-[1_1_260px]">
                  <strong className="font-headline text-[1.375rem] font-bold">{course.provider}</strong>
                  <span> · {experience.courses[course.id]}</span>
                  <br />
                  <a href={course.certificate[locale]} rel="noopener" className="inline-flex min-h-11 items-center">
                    {experience.certificate}
                  </a>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <aside aria-labelledby="exp-destaque" className="mt-5 min-w-0 flex-[1_1_240px]">
          <SectionTitle>
            <span id="exp-destaque">{experience.aside.title}</span>
          </SectionTitle>
          <p className="prose-gazeta mt-3">{experience.aside.text}</p>
          <div className="mt-6">
            <Callout title={experience.aside.callout}>
              <a
                href={RESUME_FILES[locale]}
                data-track="resume_download"
                className="inline-flex min-h-11 items-center not-italic"
              >
                {experience.aside.link}
              </a>
            </Callout>
          </div>
        </aside>
      </div>
    </>
  );
}
