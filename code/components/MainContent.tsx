// components/MainContent.tsx
const MainContent = () => {
  return (
    <div className="space-y-12">
      <section id="sobre">
        <h2 className="text-3xl font-semibold mb-4">Sobre Mim</h2>
        <p>
          Sou um desenvolvedor apaixonado por criar soluções web. Tenho experiência com várias tecnologias como React, Next.js, TypeScript e muito mais!
        </p>
      </section>
      
      <section id="projetos">
        <h2 className="text-3xl font-semibold mb-4">Projetos</h2>
        <ul>
          <li>Projeto 1 - Descrição do projeto.</li>
          <li>Projeto 2 - Descrição do projeto.</li>
          <li>Projeto 3 - Descrição do projeto.</li>
        </ul>
      </section>

      <section id="contato">
        <h2 className="text-3xl font-semibold mb-4">Contato</h2>
        <p>Email: exemplo@dominio.com</p>
      </section>
    </div>
  );
};

export default MainContent;
