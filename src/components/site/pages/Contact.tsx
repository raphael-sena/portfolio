import { Callout, DropCap, LeaderRow, PageHeader } from '@/components/gazeta';
import { CONTACT, RESUME_FILES } from '@/content/data';
import type { Locale } from '@/i18n/config';
import { t } from '@/i18n/dictionary';
import { pageNumber } from '@/i18n/routes';

export function ContactPage({ locale }: { locale: Locale }) {
  const dict = t(locale);
  const { contact } = dict.pages;
  const kicker = `${dict.common.nav.contact} · ${dict.common.dateline.page} ${pageNumber('contact')}`;
  const linkClass = 'inline-flex min-h-11 items-center';
  return (
    <>
      <PageHeader kicker={kicker} title={contact.title} lead={contact.lead} />
      <div className="mt-8 flex flex-wrap gap-x-10 gap-y-9">
        <article className="min-w-0 flex-[2_1_420px]">
          <p className="prose-gazeta">
            <DropCap letter={contact.p1.charAt(0)} />
            {contact.p1.slice(1)}
          </p>
          <div className="mt-6">
            <LeaderRow label={contact.github}>
              <a
                href={CONTACT.github}
                rel="noopener me"
                data-track="contact_click"
                data-track-channel="github"
                className={linkClass}
              >
                github.com/raphael-sena
              </a>
            </LeaderRow>
            <LeaderRow label={contact.linkedin}>
              <a
                href={CONTACT.linkedin}
                rel="noopener me"
                data-track="contact_click"
                data-track-channel="linkedin"
                className={linkClass}
              >
                linkedin.com/in/raphael-sena
              </a>
            </LeaderRow>
            <LeaderRow label={contact.email}>
              <a
                href={`mailto:${CONTACT.email}`}
                data-track="contact_click"
                data-track-channel="email"
                className={linkClass}
              >
                {CONTACT.email}
              </a>
            </LeaderRow>
          </div>
        </article>
        <aside className="min-w-0 flex-[1_1_280px]">
          <Callout title={contact.ad.callout} label={contact.ad.title}>
            <p>{contact.ad.text}</p>
            <a href={RESUME_FILES[locale]} data-track="resume_download" className={`${linkClass} not-italic`}>
              {contact.ad.link}
            </a>
          </Callout>
        </aside>
      </div>
    </>
  );
}
