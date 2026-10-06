import { Button, PageHeader } from '@/components/gazeta';
import { archives } from '@/content/data';
import type { Locale } from '@/i18n/config';
import { fill, t } from '@/i18n/dictionary';
import { LateImage } from '@/components/site/LateImage';
import { pageNumber } from '@/i18n/routes';

interface Card {
  key: string;
  year: number | null;
  heading: string;
  stack: string;
  changed: string;
  learned: string;
  shot: string;
  figureAlt: string;
  current: boolean;
  /** `/<ano>/` só existe depois do G7 (archived: true). */
  href: string | null;
}

export function TimelinePage({ locale }: { locale: Locale }) {
  const dict = t(locale);
  const { timeline } = dict.pages;
  const kicker = `${dict.common.nav.timeline} · ${dict.common.dateline.page} ${pageNumber('timeline')}`;

  // Fonte de verdade: archives.json (uma entrada por tag site/<ANO>) mais a edição atual (este site, na raiz).
  const cards: Card[] = [
    ...archives.map<Card>((a) => ({
      key: String(a.year),
      year: a.year,
      heading: String(a.year),
      stack: a.label,
      changed: (timeline.changedByYear as Record<string, string>)[a.year] ?? timeline.placeholderChanged,
      learned: timeline.placeholderLearned,
      shot: `/timeline/${a.year}.jpg`,
      figureAlt: fill(timeline.figureAlt, { year: a.year }),
      current: false,
      href: a.archived ? `${a.basePath}/` : null,
    })),
    {
      key: 'current',
      year: null,
      heading: timeline.now,
      stack: timeline.currentStack,
      changed: timeline.currentChanged,
      learned: timeline.currentLearned,
      shot: '/timeline/atual.jpg',
      figureAlt: timeline.figureAltCurrent,
      current: true,
      href: null,
    },
  ];

  return (
    <>
      <PageHeader kicker={kicker} title={timeline.title} lead={timeline.lead} />
      <ul className="mt-8 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <li key={card.key}>
            <article>
              <h2 className="font-headline text-[3.5rem] leading-none font-extrabold max-md:text-[2.5rem]">
                {card.heading}
              </h2>
              {card.current && (
                <p className="mt-2 inline-block bg-ink px-3 py-0.5 font-label text-xl tracking-[0.2em] text-paper uppercase">
                  {timeline.current}
                </p>
              )}
              <div className="mt-4 max-md:hidden">
                {/* Capturas geradas por scripts/capturar-arquivos.mjs; em tons de cinza, como o resto da Gazeta. */}
                <LateImage
                  src={card.shot}
                  alt={card.figureAlt}
                  width={560}
                  height={448}
                  className="frame-outline block h-auto w-full border-[3px] border-ink grayscale"
                />
              </div>
              <dl className="mt-4 space-y-2">
                <div>
                  <dt className="font-label text-[1.3125rem] tracking-[0.12em] uppercase">{timeline.stack}:</dt>
                  <dd>{card.stack}</dd>
                </div>
                <div>
                  <dt className="font-label text-[1.3125rem] tracking-[0.12em] uppercase">{timeline.changed}:</dt>
                  <dd>{card.changed}</dd>
                </div>
                <div>
                  <dt className="font-label text-[1.3125rem] tracking-[0.12em] uppercase">{timeline.learned}:</dt>
                  <dd>{card.learned}</dd>
                </div>
              </dl>
              {card.year !== null && (
                <p className="mt-4">
                  {card.href ? (
                    <Button href={card.href} prefetch={false}>
                      {fill(timeline.open, { year: card.year })}
                    </Button>
                  ) : (
                    <span className="inline-flex min-h-12 items-center border-2 border-ink px-5 font-label text-[1.375rem] tracking-[0.14em] uppercase">
                      {timeline.soon}
                    </span>
                  )}
                </p>
              )}
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
