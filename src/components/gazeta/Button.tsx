import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

const BASE =
  'font-label bg-paper text-ink border-ink hover:bg-ink hover:text-paper inline-flex items-center justify-center border-2 uppercase no-underline visited:text-ink';

/** Botão em forma de link (`href`) ou `<button>`. `size="sm"` é o botão de controle do MacViewer. */
type ButtonProps =
  | ({ href: string; size?: 'md' | 'sm'; children: ReactNode } & Omit<ComponentProps<typeof Link>, 'href' | 'children'>)
  | ({ href?: undefined; size?: 'md' | 'sm'; children: ReactNode } & ComponentProps<'button'>);

export function Button(props: ButtonProps) {
  const size = props.size ?? 'md';
  const sizing =
    size === 'md' ? 'min-h-12 px-[22px] text-[22px] tracking-[0.14em]' : 'min-h-11 px-4 text-[21px] tracking-[0.12em]';
  if (props.href !== undefined) {
    const { href, size: _size, children, className = '', ...rest } = props;
    void _size;
    return (
      <Link href={href} prefetch={false} className={`${BASE} ${sizing} ${className}`} {...rest}>
        {children}
      </Link>
    );
  }
  const { size: _size, children, className = '', type = 'button', ...rest } = props;
  void _size;
  return (
    <button type={type} className={`${BASE} ${sizing} ${className}`} {...rest}>
      {children}
    </button>
  );
}
