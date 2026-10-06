import { LateImage } from '@/components/site/LateImage';

/**
 * Capitular ilustrada (domínio público): a imagem faz a letra, que continua no texto para leitores de tela. Carrega depois
 * do `load` (não disputa o LCP) com o espaço já reservado (largura e altura fixas: sem CLS). `className` define o tamanho.
 */
export function DropCapImage({
  letter,
  src,
  width,
  height,
  className = 'h-[11.5rem] w-[5.2rem]',
}: {
  letter: string;
  src: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <>
      <span className="sr-only">{letter}</span>
      <span aria-hidden="true" className={`float-left mr-3 mb-1 block ${className}`}>
        <LateImage
          src={src}
          alt=""
          width={width}
          height={height}
          className="block h-full w-full object-contain mix-blend-multiply"
        />
      </span>
    </>
  );
}
