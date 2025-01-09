import { Language, translations } from "@/services/translations";
import Image from "next/image";
import { useEffect, useState } from "react";

const Technologies = () => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage =
      (localStorage.getItem("language") as Language) || "en";
    setLanguage(savedLanguage);
  }, []);

  return (
    <div className="technologies flex flex-wrap justify-between">
      <div className="dak:glass-card backend mb-4 p-4 w-full rounded-lg dark:bg-slate-50 dark:text-black lg:transform lg:transition-transform lg:duration-300 lg:hover:scale-105">
        <h2 className="text-xl font-bold mb-4">Backend</h2>
        <div className="flex justify-start items-center px-5 mx-auto overflow-x-auto overflow-y-hidden whitespace-nowrap max-h-48">
          <Image
            className="mr-4 mb-8 mt-2 w-20 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hibernate/hibernate-original.svg"
            alt="Hibernate Logo"
            title="Hibernate"
          />
          <Image
            className="mr-4 mb-8 mt-2 w-20 transform transition-transform duration-300 hover:scale-110"
            width={64}
            height={64}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original-wordmark.svg"
            alt="Java Logo"
            title="Java"
          />
          <Image
            className="mr-4 mb-8 mt-2 w-20 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
            alt="Node.js Logo"
            title="Node.js"
          />
          <Image
            className="mr-4 mb-8 mt-2 w-20 transform transition-transform duration-300 hover:scale-110"
            width={64}
            height={64}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
            alt="Python"
            title="Python"
          />
          <Image
            className="mb-8 mt-2 w-20 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg"
            alt="Spring Boot Logo"
            title="Spring Boot"
          />
        </div>
      </div>

      <div className="dak:glass-card frontend mb-4 p-4 w-full rounded-lg dark:bg-slate-50 dark:text-black lg:transform lg:transition-transform lg:duration-300 lg:hover:scale-105">
        <h2 className="text-xl font-bold mb-2">Frontend</h2>
        <div className="flex justify-start items-center px-5 mx-auto overflow-x-auto overflow-y-hidden whitespace-nowrap max-h-48">
          <Image
            className="mr-4 mb-8 mt-2 w-20 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg"
            alt="CSS Logo"
            title="CSS"
          />
          <Image
            className="mr-4 mb-8 mt-2 w-20 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-plain.svg"
            alt="HTML Logo"
            title="HTML"
          />
          <Image
            className="mr-4 mb-8 mt-2 w-20 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg"
            alt="Java Script Logo"
            title="Java Script"
          />
          <Image
            className="mr-4 mb-8 mt-2 w-20 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-plain.svg"
            alt="Next.js Logo"
            title="Next.js"
          />
          <Image
            className="mr-4 mb-8 mt-2 w-20 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
            alt="React Logo"
            title="React"
          />
          <Image
            className="mr-4 mb-8 mt-2 w-20 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
            alt="TailwindCSS Logo"
            title="TailwindCSS"
          />
          <Image
            className="mb-8 mt-2 w-20 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-plain.svg"
            alt="TypeScript Logo"
            title="TypeScript"
          />
        </div>
      </div>

      <div className="dak:glass-card db mb-4 p-4 w-full rounded-lg dark:bg-slate-50 dark:text-black lg:transform lg:transition-transform lg:duration-300 lg:hover:scale-105">
        <h2 className="text-xl font-bold mb-4">Data Base</h2>
        <div className="flex justify-start items-center px-5 mx-auto overflow-x-auto overflow-y-hidden whitespace-nowrap max-h-48">
        <Image
            className="mr-8 mb-8 mt-2 w-20 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"
            alt="Mysql Logo"
            title="MySQL"
          />
          <Image
            className="mr-8 mb-8 mt-2 w-20 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-plain.svg"
            alt="Postgresql Logo"
            title="PostgreSQL"
          />
        </div>
      </div>

      <div className="dak:glass-card db mb-4 p-4 w-full rounded-lg dark:bg-slate-50 dark:text-black lg:transform lg:transition-transform lg:duration-300 lg:hover:scale-105">
        <h2 className="text-xl font-bold mb-4">{translations[language].tools}</h2>
        <div className="flex justify-start items-center px-5 mx-auto overflow-x-auto overflow-y-hidden whitespace-nowrap max-h-48">
        <Image
            className="mr-4 mb-8 mt-2 w-20 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-plain.svg"
            alt="Adobe Illustrator"
            title="Adobe Illustrator"
          />
          <Image
            className="mr-4 mb-8 mt-2 w-20 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg"
            alt="Adobe Photoshop"
            title="Adobe Photoshop"
          />
          <Image
            className="mr-4 mb-8 mt-2 w-20 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
            alt="Docker Logo"
            title="Docker"
          />
          <Image
            className="mr-4 mb-8 mt-2 w-20 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg"
            alt="Figma"
            title="Figma"
          />
          <Image
            className="mr-4 mb-8 mt-2 w-20 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg"
            alt="Git"
            title="Git"
          />
          <Image
            className="mr-4 mb-8 mt-2 w-20 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
            alt="Github"
            title="Github"
          />
          <Image
            className="mr-4 mb-8 mt-2 w-20 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/insomnia/insomnia-original.svg"
            alt="Insomnia"
            title="Insomnia"
          />
          <Image
            className="mr-4 mb-8 mt-2 w-20 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg"
            alt="Intellij"
            title="Intellij"
          />
          <Image
            className="mr-4 mb-8 mt-2 w-20 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/maven/maven-original.svg"
            alt="Maven Logo"
            title="Maven"
          />
          <Image
            className="mr-4 mb-8 mt-2 w-20 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-plain.svg"
            alt="Postman Logo"
            title="Postman"
          />
          <Image
            className="mr-4 mb-8 mt-2 w-20 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg"
            alt="VS Code"
            title="VS Code"
          />
        </div>
      </div>
    </div>
  );
};

export default Technologies;
