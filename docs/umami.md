# Umami

Analytics: só Umami, servidor próprio já existente, sem cookies, sem PII, sem `umami.identify`. Decisões e fontes: seção "Umami" de `docs/DECISIONS.md`.

## Arquitetura

```
navegador ── GET  /stats/u.js ────► Worker ──► ${UMAMI_HOST}/script.js     (cache público 300 s)
navegador ── POST /stats/api/send ► Worker ──► ${UMAMI_HOST}/api/send      (corpo, User-Agent e IP repassados)
monitor   ── GET  /api/health ────► Worker ──► ${UMAMI_HOST}/api/heartbeat
```

- First-party: o visitante só fala com o próprio domínio. O host do Umami fica no secret `UMAMI_HOST` e nunca aparece em resposta, cabeçalho ou erro.
- Código: `worker/umami.ts` (módulo puro, `fetch` injetável) e `worker/index.ts` (roteamento). `run_worker_first` em `wrangler.jsonc` cobre só `/stats/*` e `/api/*`.
- IP real: o Worker copia `cf-connecting-ip` para `x-forwarded-for` e `x-real-ip` do envio ao Umami.
- CORS do `/stats/api/send`: `raphaelsena.com`, `www.raphaelsena.com`, `https://*.workers.dev` e `http://localhost`/`127.0.0.1` (dev). Origem fora da lista: 204 silencioso, sem repasse. `OPTIONS` responde 204. Corpo limitado a 16 KB.
- Falhas: rede ou 5xx do Umami geram 204 sem corpo no envio e um JS vazio (200, sem cache) no script. Nunca há erro visível. Sem `UMAMI_HOST`, `/stats/*` responde 404 limpo.
- `/api/health`: `{ "status": "ok", "umami": "ok" | "degraded" | "unconfigured" }`.
- Os cabeçalhos das respostas do Worker (`nosniff`, `x-robots-tag`) vêm do próprio Worker, pois `_headers` não se aplica a elas.

## Variáveis de ambiente

| Nome                           | Onde                   | Observação                                                                 |
| ------------------------------ | ---------------------- | -------------------------------------------------------------------------- |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Build (variável do CI) | Não é secret. Sem ela, `<UmamiScript />` não renderiza nada                |
| `UMAMI_HOST`                   | Secret do Worker       | Origem do servidor. `wrangler secret put UMAMI_HOST`                       |
| `SITE_ENV`                     | Build                  | `production` gera `data-tag="prod"`; qualquer outro valor gera `"preview"` |

Local: copie `.dev.vars.example` para `.dev.vars` (gitignored) e preencha `UMAMI_HOST`. Os testes NÃO usam o host real: `tests/umami` sobe um Umami falso em `127.0.0.1` e um `wrangler dev` próprio com `--var UMAMI_HOST:...`. Essa suíte precisa de `wrangler dev` (workerd), que grava em `~/Library/Preferences/.wrangler`; em ambiente com sandbox de escrita ela falha com `SQLITE_READONLY`.

## Integração no layout

Em `app/layout.tsx`, importar de `@/components/analytics/UmamiScript` e `@/components/analytics/AnalyticsClient`, renderizar `<UmamiScript />` dentro do `<head>` (ou no início do `<body>`) e `<AnalyticsClient />` no `<body>`. Depois, trocar `test.fixme` por `test` no bloco "integração com o layout real" de `tests/umami/umami.spec.ts`.

## Eventos (`src/lib/analytics.ts`)

| Evento            | Props                                  | Observação                                                     |
| ----------------- | -------------------------------------- | -------------------------------------------------------------- |
| `page_turn`       | `from`, `to`, `via: ear/menu/keyboard` |                                                                |
| `ear_pull`        | `completed`                            |                                                                |
| `menu_click`      | `item`                                 |                                                                |
| `lang_switch`     | `to`                                   |                                                                |
| `mac_rotate`      | -                                      | 1 por sessão                                                   |
| `project_open`    | `slug`                                 |                                                                |
| `resume_download` | -                                      |                                                                |
| `contact_click`   | `channel`                              |                                                                |
| `outbound_click`  | `host`                                 | Automático (`OutboundLinkTracker`)                             |
| `not_found`       | `path`                                 | Só o pathname, sem query                                       |
| `js_error`        | `route`, `message`                     | Máx. 3 por sessão; mensagem até 120 caracteres, URLs sem query |

`track()` é no-op no servidor, sem `window.umami` e com Do Not Track; nunca lança erro. Contadores por sessão usam `sessionStorage` (com fallback em memória), nunca cookies.

## Funis e metas

- Funil: Home (`/`) > evento `page_turn` > `/contato/`.
- Meta: `resume_download`.
- Meta: `contact_click` (quebrar por `channel`).

## Checklist semanal (10 minutos)

1. Visão geral: visitantes e visitas dos últimos 7 dias contra os 7 anteriores.
2. Referrers: Google, Bing e LinkedIn; anotar o que subiu ou caiu.
3. Páginas de entrada: quais rotas recebem a primeira visita.
4. Países: algum inesperado ou concentração anormal.
5. UTM: campanhas e links de currículo/LinkedIn com `utm_*`.
6. Eventos: `resume_download`, `contact_click` e o funil Home > `page_turn` > Contato.
7. Saúde: `js_error` e `not_found` novos; abrir `/api/health` e conferir `umami: "ok"`.

## O que o dono confere no servidor Umami

1. Websites: cadastrar o domínio novo (`www.raphaelsena.com`) ou criar um website novo e usar o ID em `NEXT_PUBLIC_UMAMI_WEBSITE_ID`.
2. Versão do servidor: `data-performance` exige v3.1.0 ou superior. Em versão anterior, atualize ou remova o atributo em `UmamiScript.tsx`.
3. Script e coleta: o Worker busca `/script.js` e posta em `/api/send`. `TRACKER_SCRIPT_NAME` e `COLLECT_API_ENDPOINT` são opcionais; só importam se esses caminhos foram renomeados (então ajuste os caminhos em `worker/umami.ts`).
4. IP real: o Worker envia `x-forwarded-for` e `x-real-ip` com o `cf-connecting-ip` do visitante. Se o servidor também está atrás da Cloudflare, o Umami lê primeiro o `cf-connecting-ip` da própria conexão (IP do Worker). Nesse caso defina `CLIENT_IP_HEADER=x-forwarded-for` no `.env` do Umami e reinicie; depois confira se os países em Sessions fazem sentido.
5. Secret: `wrangler secret put UMAMI_HOST` e confira `/api/health` com `umami: "ok"`.
