import type { ReactNode } from 'react';

export function Pullquote({ children, size = 28 }: { children: ReactNode; size?: 24 | 28 }) {
  return (
    <blockquote
      className="rule-double py-3 text-center font-headline leading-tight font-semibold italic"
      style={{ fontSize: size }}
    >
      {children}
    </blockquote>
  );
}
