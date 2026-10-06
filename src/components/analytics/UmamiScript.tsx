// Server component. Sem NEXT_PUBLIC_UMAMI_WEBSITE_ID não renderiza nada (dev e CI sem analytics).
// O script vem do próprio domínio (/stats/u.js, proxy do Worker) e não bloqueia a renderização (defer).
export function UmamiScript() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  if (!websiteId) return null;

  const tag = process.env.SITE_ENV === 'production' ? 'prod' : 'preview';

  return (
    <script
      defer
      src="/stats/u.js"
      data-website-id={websiteId}
      data-host-url="/stats"
      data-domains="raphaelsena.com,www.raphaelsena.com"
      data-do-not-track="true"
      data-tag={tag}
      data-performance="true"
    />
  );
}
