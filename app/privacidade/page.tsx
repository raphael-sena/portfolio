import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacidade | Raphael Sena',
  description: 'Como este site mede visitas: analytics sem cookies, em servidor próprio, sem identificar ninguém.',
};

export default function Privacidade() {
  return (
    <main className="mx-auto max-w-295 px-6 py-7">
      <article className="border border-ink bg-paper px-5 py-8 text-ink shadow-sheet">
        <h1 className="font-headline text-[clamp(34px,5vw,60px)] leading-[1.1] font-extrabold">Privacidade</h1>
        <div className="mt-4 space-y-3">
          <p>
            Este site mede o número de visitas com o Umami, uma ferramenta de analytics que roda em servidor próprio.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Não usa cookies.</li>
            <li>Não identifica pessoas: não há login, cadastro nem identificador pessoal.</li>
            <li>Respeita o Do Not Track do navegador: com ele ligado, nenhuma visita ou evento é enviado.</li>
            <li>
              Registra apenas dados de uso agregados, como páginas visitadas, origem da visita, país, tipo de
              dispositivo e cliques em links e botões do site.
            </li>
            <li>Os dados não são vendidos nem compartilhados com redes de publicidade.</li>
          </ul>
          <p>
            <Link href="/">Voltar ao início</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
