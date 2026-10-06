/** Divisor com losango no centro. */
export function Ornament() {
  return (
    <svg
      viewBox="0 0 200 24"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      className="mx-auto my-3 block w-[200px]"
    >
      <line x1="0" y1="12" x2="80" y2="12" stroke="#111" strokeWidth="1.5" />
      <line x1="120" y1="12" x2="200" y2="12" stroke="#111" strokeWidth="1.5" />
      <polygon points="100,4 108,12 100,20 92,12" fill="#111" />
    </svg>
  );
}

export function DiamondBullet() {
  return (
    <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true" focusable="false" className="shrink-0">
      <polygon points="7,0 14,7 7,14 0,7" fill="#111" />
    </svg>
  );
}
