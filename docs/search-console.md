# Search Console: checklist de SEO e migração

Objetivo: manter a propriedade atual, não perder indexação na troca de hospedagem (Vercel para Cloudflare) e confirmar que o novo site (pt, en, de) é lido corretamente. Os itens "(você)" dependem do usuário; o agente não acessa o Search Console.

## O que o site já entrega (G6)

- `sitemap.xml` com as 24 URLs indexáveis (7 páginas + privacidade × 3 idiomas), cada uma com `hreflang` pt-BR, en, de e `x-default` (versão `/en/`). Exclui `/design-system/` e as futuras `/<ano>/`.
- `robots.txt`: em produção libera tudo e aponta o sitemap; no workers.dev fica fechado (`Disallow: /`) e as respostas têm `X-Robots-Tag: noindex`.
- `<link rel="canonical">` absoluto em `https://www.raphaelsena.com/...`, `hreflang` recíproco, Open Graph e Twitter com imagem 1200×630 por página e idioma, JSON-LD (Person, WebSite, BreadcrumbList).
- Host canônico: `www.raphaelsena.com`. O apex precisa de um único 301 para o www (Redirect Rule da Cloudflare, ver `docs/INFRA.md`).

## Antes do cutover (G8)

1. **(você)** Descobrir como a propriedade atual foi verificada. O legado não tem `google-site-verification` no `<head>` e não há arquivo `google*.html` em `public/`, e o apex só tem o TXT do SPF; então pode ser registro TXT em outro nome, Google Analytics/Tag Manager, ou propriedade de prefixo de URL (www) ainda sem verificação. Abra _Search Console > Configurações > Verificação da propriedade_.
2. Conforme o método:
   - **TXT de DNS:** copiar o TXT para a zona nova da Cloudflare ANTES de trocar os nameservers (junto com os MX e o SPF).
   - **Arquivo HTML:** colocar o arquivo em `public/` (o agente faz, com o nome e o conteúdo que você mandar).
   - **Meta tag:** informar o valor; vai em `metadata.verification.google` (o agente faz).
3. **(você)** Anotar quais propriedades existem (domínio `raphaelsena.com` ou prefixo `https://www.raphaelsena.com/`) e o desempenho atual (cliques, impressões, consultas principais) para comparar depois.
4. Validar o sitemap no workers.dev: `https://portfolio.raphael-116.workers.dev/sitemap.xml` (mostra as URLs de produção).

## Depois do cutover

1. **(você)** Confirmar que a propriedade continua verificada (_Configurações_). Se for propriedade de prefixo, adicionar também `https://www.raphaelsena.com/` se ainda não existir.
2. **(você)** _Sitemaps_: enviar `https://www.raphaelsena.com/sitemap.xml` e conferir o status "Sucesso" com 24 páginas descobertas.
3. **(você)** _Inspeção de URL_: pedir indexação de `/`, `/en/`, `/de/` e de `/sobre/`, `/projetos/`, `/contato/`. Conferir "Página indexada", canonical escolhido pelo Google igual ao declarado e que o `hreflang` foi lido.
4. **(você)** _Páginas_: acompanhar por 4 semanas "Descobertas, não indexadas" e erros 404/redirect. O legado só tinha `/` (SPA), então as URLs novas são adições e não há páginas antigas a redirecionar além dos PDFs (`/Resume_Raphael_Sena.pdf`, `/Currículo_Raphael_Sena.pdf`).
5. **(você)** _Experiência de página / Core Web Vitals_: os dados de campo levam cerca de 28 dias; meta LCP < 2,0 s, CLS < 0,05, INP < 200 ms.
6. **(você)** Conferir no Umami (`docs/umami.md`, checklist semanal) as entradas pelo Google, Bing e LinkedIn.
7. Rodar `pnpm test:publicado` com `PLAYWRIGHT_BASE_URL=https://www.raphaelsena.com SMOKE_APEX=https://raphaelsena.com` para confirmar o redirect do apex e o smoke completo em produção.

## Monitoramento contínuo

- O CI roda o smoke depois de cada deploy, com rollback automático e issue se falhar (`.github/workflows/ci.yml`).
- `.github/workflows/publicado.yml`: smoke diário e crawl semanal (seo e a11y) contra o site publicado, ligados pela variável de repositório `SMOKE_DIARIO=true`; a URL vem de `SMOKE_BASE_URL`.
