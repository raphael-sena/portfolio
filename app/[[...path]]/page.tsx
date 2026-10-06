import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/site/JsonLd';
import { SiteShell } from '@/components/site/SiteShell';
import { AboutPage } from '@/components/site/pages/About';
import { ContactPage } from '@/components/site/pages/Contact';
import { DesignSystemPage } from '@/components/site/pages/DesignSystem';
import { ExperiencePage } from '@/components/site/pages/Experience';
import { HomePage } from '@/components/site/pages/Home';
import { PrivacyPage } from '@/components/site/pages/Privacy';
import { ProjectsPage } from '@/components/site/pages/Projects';
import { TechnologiesPage } from '@/components/site/pages/Technologies';
import { TimelinePage } from '@/components/site/pages/Timeline';
import { buildMetadata } from '@/i18n/metadata';
import { allRoutes, resolveSegments, segmentsFor, type AnyPageId } from '@/i18n/routes';
import type { Locale } from '@/i18n/config';

/** Só os caminhos gerados existem; qualquer outro vira o 404 global. */
export const dynamicParams = false;

export function generateStaticParams() {
  return allRoutes().map(({ locale, id }) => ({ path: segmentsFor(locale, id) }));
}

type Props = { params: Promise<{ path?: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const route = resolveSegments((await params).path);
  if (!route) return {};
  return buildMetadata(route.locale, route.id);
}

function Body({ locale, id }: { locale: Locale; id: AnyPageId }) {
  switch (id) {
    case 'home':
      return <HomePage locale={locale} />;
    case 'about':
      return <AboutPage locale={locale} />;
    case 'experience':
      return <ExperiencePage locale={locale} />;
    case 'projects':
      return <ProjectsPage locale={locale} />;
    case 'technologies':
      return <TechnologiesPage locale={locale} />;
    case 'timeline':
      return <TimelinePage locale={locale} />;
    case 'contact':
      return <ContactPage locale={locale} />;
    case 'privacy':
      return <PrivacyPage locale={locale} />;
    case 'design-system':
      return <DesignSystemPage />;
  }
}

export default async function Page({ params }: Props) {
  const route = resolveSegments((await params).path);
  if (!route) notFound();
  // O guia de estilo tem o próprio cabeçalho; as demais páginas usam o shell comum.
  if (route.id === 'design-system') return <Body locale={route.locale} id={route.id} />;
  return (
    <>
      <JsonLd locale={route.locale} id={route.id} />
      <SiteShell locale={route.locale} id={route.id}>
        <Body locale={route.locale} id={route.id} />
      </SiteShell>
    </>
  );
}
