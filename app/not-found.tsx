import type { Metadata } from 'next';
import Link from 'next/link';
import { TrackNotFound } from '@/components/analytics/TrackNotFound';

export const metadata: Metadata = {
  title: 'Página não encontrada | Raphael Sena',
};

export default function NotFound() {
  return (
    <>
      <TrackNotFound />
      <main id="conteudo" tabIndex={-1} className="mx-auto max-w-295 px-6 py-7">
        <div className="border border-ink bg-paper px-5 py-8 text-center text-ink shadow-sheet">
          <h1 className="font-headline text-[clamp(34px,5vw,60px)] leading-[1.1] font-extrabold">
            Página não encontrada
          </h1>
          <p className="mt-4">
            <Link href="/">Voltar ao início</Link>
          </p>
        </div>
      </main>
    </>
  );
}
