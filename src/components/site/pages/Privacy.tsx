import Link from 'next/link';
import { PageHeader } from '@/components/gazeta';
import type { Locale } from '@/i18n/config';
import { t } from '@/i18n/dictionary';
import { pathFor } from '@/i18n/routes';

export function PrivacyPage({ locale }: { locale: Locale }) {
  const dict = t(locale);
  const { privacy } = dict.pages;
  return (
    <>
      <PageHeader kicker={dict.common.footer.privacy} title={privacy.title} lead={privacy.lead} />
      <div className="mx-auto mt-8 max-w-[70ch] space-y-4">
        <p>{privacy.intro}</p>
        <ul className="list-disc space-y-1 pl-5">
          {privacy.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>
          <Link href={pathFor(locale, 'home')} className="inline-flex min-h-11 items-center">
            {dict.common.backHome}
          </Link>
        </p>
      </div>
    </>
  );
}
