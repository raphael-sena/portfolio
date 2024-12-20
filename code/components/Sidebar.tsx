// components/Sidebar.tsx
import Image from 'next/image';

interface SidebarProps {
  name: string;
  imageSrc: string;
}

const Sidebar = ({ name, imageSrc }: SidebarProps) => {
  return (
    <div className="w-64 p-4 bg-gray-800 text-white h-screen flex flex-col">
      <div className="flex justify-center mb-6">
        <Image src={imageSrc} alt="Profile" width={120} height={120} className="rounded-full" />
      </div>
      <h1 className="text-center text-2xl font-bold">{name}</h1>
      <nav className="mt-6 flex flex-col">
        <a href="#sobre" className="mb-4 text-lg hover:text-gray-400">Sobre</a>
        <a href="#projetos" className="mb-4 text-lg hover:text-gray-400">Projetos</a>
        <a href="#contato" className="mb-4 text-lg hover:text-gray-400">Contato</a>
      </nav>
    </div>
  );
};

export default Sidebar;
