# INFRA: raphaelsena.com (diagnóstico somente leitura, 2026-10-05)

Só consultas de leitura (dig, whois, curl). Nada foi alterado. Fonte: subagente D do G0.

## Resumo

- Registrador: **Namecheap** (IANA 1068). DNS autoritativo: **Namecheap** (registrar-servers.com). A zona NÃO está na Cloudflare hoje.
- Hospedagem: **Vercel** (A `76.76.21.21`, CNAME `cname.vercel-dns.com`), app Next.js.
- **Host canônico atual: `www.raphaelsena.com`**. O apex responde 308 para o www. O novo site mantém o www como principal e o apex vira 301.
- **DNSSEC: não** (whois `unsigned`; DS e DNSKEY vazios). Não há DS a remover antes de trocar os NS.
- **E-mail: Namecheap Email Forwarding** (MX `eforward1..5` + SPF). Precisa ser copiado para a nova zona.
- `/robots.txt` e `/sitemap.xml` retornam **404** hoje.

## Nameservers atuais (guardar para rollback)

```
dns1.registrar-servers.com.
dns2.registrar-servers.com.
```

SOA: `dns1.registrar-servers.com. hostmaster.registrar-servers.com. 1734727836 43200 3600 604800 3601`

## Registros DNS atuais

| Tipo                                                 | Nome | Valor                                                | Obs.               |
| ---------------------------------------------------- | ---- | ---------------------------------------------------- | ------------------ |
| NS                                                   | @    | dns1/dns2.registrar-servers.com.                     | rollback           |
| A                                                    | @    | 76.76.21.21                                          | Vercel (apex)      |
| CNAME                                                | www  | cname.vercel-dns.com.                                | Vercel             |
| **MX**                                               | @    | 10 eforward1.registrar-servers.com.                  | **copiar**         |
| **MX**                                               | @    | 10 eforward2.registrar-servers.com.                  | **copiar**         |
| **MX**                                               | @    | 10 eforward3.registrar-servers.com.                  | **copiar**         |
| **MX**                                               | @    | 15 eforward4.registrar-servers.com.                  | **copiar**         |
| **MX**                                               | @    | 20 eforward5.registrar-servers.com.                  | **copiar**         |
| **TXT**                                              | @    | `v=spf1 include:spf.efwd.registrar-servers.com ~all` | **copiar** (SPF)   |
| CAA, AAAA, DS, DNSKEY                                | @    | vazio                                                |                    |
| mail, stats, umami, _dmarc, default._domainkey, _spf |      | vazio                                                | sem DMARC nem DKIM |

Limitação: só foram consultados os nomes acima. A lista completa e os TTLs só aparecem no painel Advanced DNS do Namecheap.
Observação: não há TXT de verificação do Search Console no apex. A propriedade pode usar outro método (meta tag, arquivo ou propriedade de prefixo de URL). Confirmar.

## Whois

- Registrar: NameCheap, Inc. Criado 2024-12-20, atualizado 2025-12-07.
- **Expira 2026-12-20** (a ~2,5 meses). Confirmar renovação automática.
- Status: `clientTransferProhibited`. DNSSEC: `unsigned`.

## Redirects

| Requisição                    | Cadeia                                                                                   |
| ----------------------------- | ---------------------------------------------------------------------------------------- |
| `http://raphaelsena.com`      | 308 > `https://raphaelsena.com/` > 308 > `https://www.raphaelsena.com/` > 200 (2 saltos) |
| `https://raphaelsena.com`     | 308 > `https://www.raphaelsena.com/` > 200                                               |
| `http://www.raphaelsena.com`  | 308 > `https://www.raphaelsena.com/` > 200                                               |
| `https://www.raphaelsena.com` | 200                                                                                      |

## Cabeçalhos (200 do www)

- `server: Vercel`, `x-vercel-cache: HIT`, `cache-control: public, max-age=0, must-revalidate`.
- `strict-transport-security: max-age=63072000` (sem includeSubDomains/preload). `access-control-allow-origin: *`.
- Ausentes: X-Frame-Options, X-Content-Type-Options, CSP, Referrer-Policy, Permissions-Policy.

## Pontos de atenção para a Cloudflare

1. Recriar os 5 MX e o TXT SPF antes de trocar NS. O encaminhamento continua dependendo do Namecheap Email Forwarding; alternativa futura: Cloudflare Email Routing.
2. Recriar A `@` e CNAME `www` apontando para a Vercel com **DNS only (nuvem cinza)**.
3. Sem DNSSEC: nada a remover. Se ativar na Cloudflare depois, o DS vai no Namecheap.
4. Rollback: restaurar os NS `dns1/dns2.registrar-servers.com` no Namecheap (BasicDNS). A propagação do NS em .com pode levar até 48h.
5. Considerar depois: CAA, DMARC, cabeçalhos de segurança, renovação do domínio.

## Pendente (o usuário precisa fornecer)

- Config do projeto na Vercel (domínio primário, regra apex>www, aliases, time).
- Status da zona na Cloudflare (existe? NS atribuídos? registros importados?).
- Lista completa de registros e regras de Email Forwarding no Namecheap.
- Método de verificação do Search Console e outros serviços que dependam de DNS.
- Renovação automática e contato do registrante.

## Redirect do apex para o www (decisão do G6, 2026-10-06)

Mecanismo escolhido: **Redirect Rule (Single Redirect) da Cloudflare**, criada na zona no G8, no lugar de código no Worker. Motivo: o Worker só roda antes dos assets em `/stats/*` e `/api/*` (`run_worker_first`); tratar o apex no Worker exigiria rodá-lo em todas as requisições. A regra executa antes do Worker.

- Quando: `http.host eq "raphaelsena.com"`.
- Então: redirecionamento dinâmico para `concat("https://www.raphaelsena.com", http.request.uri.path)`, status **301**, preservando a query string.
- O apex e o `www` precisam existir como registros proxied (ou como custom domains do Worker) para a regra ser alcançada.
- Teste: `SMOKE_APEX=https://raphaelsena.com PLAYWRIGHT_BASE_URL=https://www.raphaelsena.com pnpm test:publicado` (um único 301 e `Location` com o caminho). Hoje a Vercel responde 308 em duas etapas no http; o novo comportamento é um salto só.
