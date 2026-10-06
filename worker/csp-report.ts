// Recebe os relatórios de violação da CSP (Report-Only) e os registra nos logs do Worker, para decidir quando promover a
// política para `Content-Security-Policy`. Sem armazenamento, sem PII: só diretiva, recurso bloqueado e a página.

const MAX_BYTES = 16 * 1024;

const HEADERS = {
  'cache-control': 'no-store',
  'x-content-type-options': 'nosniff',
  'x-robots-tag': 'noindex',
};

interface Violacao {
  diretiva: string;
  bloqueado: string;
  pagina: string;
}

function texto(valor: unknown, max = 200): string {
  return typeof valor === 'string' ? valor.slice(0, max) : '';
}

/** Aceita os dois formatos: `application/csp-report` (report-uri) e `application/reports+json` (report-to). */
export function extrairViolacoes(corpo: unknown): Violacao[] {
  const itens = Array.isArray(corpo) ? corpo : [corpo];
  const saida: Violacao[] = [];
  for (const item of itens) {
    if (!item || typeof item !== 'object') continue;
    const bruto = item as Record<string, unknown>;
    const dados = (bruto['csp-report'] ?? bruto['body'] ?? bruto) as Record<string, unknown>;
    const diretiva = texto(
      dados['effective-directive'] ??
        dados['effectiveDirective'] ??
        dados['violated-directive'] ??
        dados['violatedDirective'],
    );
    if (!diretiva) continue;
    saida.push({
      diretiva,
      bloqueado: texto(dados['blocked-uri'] ?? dados['blockedURL'] ?? dados['blockedURI']),
      pagina: texto(dados['document-uri'] ?? dados['documentURL'] ?? dados['documentURI']),
    });
  }
  return saida.slice(0, 10);
}

export async function handleCspReport(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response(null, { status: 405, headers: { ...HEADERS, allow: 'POST' } });
  }
  try {
    const bytes = await request.arrayBuffer();
    if (bytes.byteLength > 0 && bytes.byteLength <= MAX_BYTES) {
      const violacoes = extrairViolacoes(JSON.parse(new TextDecoder().decode(bytes)));
      for (const v of violacoes) console.log(JSON.stringify({ tipo: 'csp-violation', ...v }));
    }
  } catch {
    // Corpo inválido: ignora em silêncio (relatório é "melhor esforço").
  }
  return new Response(null, { status: 204, headers: HEADERS });
}
