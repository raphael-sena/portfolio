import type { ReactNode } from 'react';

export function SectionTitle({
  children,
  as: Tag = 'h2',
  align = 'center',
}: {
  children: ReactNode;
  as?: 'h2' | 'h3';
  align?: 'center' | 'left';
}) {
  return (
    <Tag
      className={`border-y border-ink py-1.5 font-label text-[30px] font-normal tracking-[0.16em] uppercase first:border-t-4 first:border-double ${
        align === 'center' ? 'text-center' : 'text-left'
      }`}
    >
      {children}
    </Tag>
  );
}
