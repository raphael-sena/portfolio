'use client';

import { useEffect, useRef } from 'react';

/** GIF transparente de 1x1 (cabe em `img-src data:`): reserva o espaço e evita `<img>` sem `src` no HTML. */
const PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

interface LateImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

/**
 * Imagem decorativa que só baixa depois do evento `load`: não disputa banda com o que pinta a primeira tela (o LCP).
 * Sem JavaScript, o `<noscript>` entrega a imagem normalmente.
 */
export function LateImage({ src, alt, width, height, className }: LateImageProps) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const imagem = ref.current;
    if (!imagem) return;
    const carregar = () => imagem.setAttribute('src', src);
    if (document.readyState === 'complete') carregar();
    else window.addEventListener('load', carregar, { once: true });
    return () => window.removeEventListener('load', carregar);
  }, [src]);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={ref} src={PLACEHOLDER} alt={alt} width={width} height={height} decoding="async" className={className} />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} width={width} height={height} className={className} />
      </noscript>
    </>
  );
}
