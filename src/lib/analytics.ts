// Eventos do Umami. Sem PII, sem umami.identify, sem cookies. Falha nunca lança erro.

export interface AnalyticsEvents {
  page_turn: { from: string; to: string; via: 'ear' | 'menu' | 'keyboard' };
  ear_pull: { completed: boolean };
  menu_click: { item: string };
  lang_switch: { to: string };
  mac_rotate: Record<string, never>;
  project_open: { slug: string };
  resume_download: Record<string, never>;
  contact_click: { channel: string };
  outbound_click: { host: string };
  not_found: { path: string };
  js_error: { route: string; message: string };
}

export type AnalyticsEventName = keyof AnalyticsEvents;

interface UmamiTracker {
  track: (name: string, data?: Record<string, unknown>) => unknown;
}

/** Máximo de eventos por sessão (aba) para os eventos que não podem se repetir. */
export const SESSION_LIMITS: Partial<Record<AnalyticsEventName, number>> = { mac_rotate: 1, js_error: 3 };

export const ERROR_MESSAGE_MAX = 120;

const memoria = new Map<string, number>();

function lerContagem(name: string): number {
  try {
    const bruto = window.sessionStorage.getItem(`analytics:${name}`);
    const n = bruto === null ? NaN : Number(bruto);
    if (Number.isFinite(n)) return n;
  } catch {
    // sessionStorage indisponível: cai para a memória.
  }
  return memoria.get(name) ?? 0;
}

function gravarContagem(name: string, valor: number): void {
  memoria.set(name, valor);
  try {
    window.sessionStorage.setItem(`analytics:${name}`, String(valor));
  } catch {
    // ignora
  }
}

/** Do Not Track ligado no navegador (o tracker também respeita via data-do-not-track). */
export function doNotTrackAtivo(): boolean {
  if (typeof window === 'undefined') return false;
  const nav = window.navigator as Navigator & { msDoNotTrack?: string };
  const win = window as Window & { doNotTrack?: string };
  return [nav.doNotTrack, win.doNotTrack, nav.msDoNotTrack].some((v) => v === '1' || v === 'yes');
}

/** Remove query e hash de qualquer URL no texto e trunca. */
export function sanitizarMensagem(texto: unknown, max = ERROR_MESSAGE_MAX): string {
  const base = typeof texto === 'string' ? texto : texto instanceof Error ? texto.message : String(texto ?? '');
  return base
    .replace(/https?:\/\/[^\s)'"]+/g, (u) => u.split(/[?#]/)[0] ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

/** Envia um evento ao Umami. No-op no servidor, sem `window.umami` ou com Do Not Track. */
export function track<K extends AnalyticsEventName>(
  name: K,
  ...props: AnalyticsEvents[K] extends Record<string, never> ? [] : [AnalyticsEvents[K]]
): void;
export function track(name: AnalyticsEventName, props?: Record<string, unknown>): void {
  try {
    if (typeof window === 'undefined') return;
    const umami = (window as Window & { umami?: UmamiTracker }).umami;
    if (!umami || typeof umami.track !== 'function') return;
    if (doNotTrackAtivo()) return;

    const limite = SESSION_LIMITS[name];
    if (limite !== undefined) {
      const usados = lerContagem(name);
      if (usados >= limite) return;
      gravarContagem(name, usados + 1);
    }

    const dados = name === 'js_error' && props ? { ...props, message: sanitizarMensagem(props.message) } : props;
    umami.track(name, dados);
  } catch {
    // Analytics nunca pode quebrar a página.
  }
}

let instalado = false;

/** Liga window.onerror/unhandledrejection → js_error (máx. 3 por sessão, mensagem de até 120 caracteres). */
export function installGlobalErrorTracking(): () => void {
  if (typeof window === 'undefined' || instalado) return () => {};
  instalado = true;

  const route = () => window.location.pathname;
  const onError = (e: ErrorEvent) => track('js_error', { route: route(), message: sanitizarMensagem(e.message) });
  const onRejection = (e: PromiseRejectionEvent) =>
    track('js_error', { route: route(), message: sanitizarMensagem(e.reason) });

  window.addEventListener('error', onError);
  window.addEventListener('unhandledrejection', onRejection);
  return () => {
    window.removeEventListener('error', onError);
    window.removeEventListener('unhandledrejection', onRejection);
    instalado = false;
  };
}

/** Host de um link externo (http/https e outro host), ou null. */
export function hostExterno(href: string, base: string): string | null {
  try {
    const url = new URL(href, base);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    return url.host === new URL(base).host ? null : url.hostname;
  } catch {
    return null;
  }
}

/** Zera os contadores (uso em testes). */
export function resetarContadoresDeSessao(): void {
  memoria.clear();
  try {
    window.sessionStorage.clear();
  } catch {
    // ignora
  }
}
