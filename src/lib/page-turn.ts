// Ponte entre componentes (a orelha) e o PageTurnRouter montado no layout. Sem o router (ou sem JavaScript), vale o link normal.
export type TurnVia = 'ear' | 'menu' | 'keyboard';
type Handler = (href: string, via: TurnVia) => void;

let handler: Handler | null = null;

export function registerPageTurn(h: Handler): () => void {
  handler = h;
  return () => {
    if (handler === h) handler = null;
  };
}

/** Vira a página até `href` (com a animação, quando houver suporte); sem o router, navega direto. */
export function turnTo(href: string, via: TurnVia): void {
  if (handler) handler(href, via);
  else window.location.assign(href);
}
