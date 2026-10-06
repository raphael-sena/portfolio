import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/i18n/config';

export const dynamic = 'force-static';

/** Em produção: tudo liberado e o sitemap indicado. Em preview (workers.dev): fechado, junto com o noindex do `_headers`. */
export default function robots(): MetadataRoute.Robots {
  if (process.env.SITE_ENV === 'production') {
    return { rules: [{ userAgent: '*', allow: '/' }], sitemap: `${SITE_URL}/sitemap.xml` };
  }
  return { rules: [{ userAgent: '*', disallow: '/' }] };
}
