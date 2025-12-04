import { Language, translations } from "@/services/translations";
import TechIcon from "../TechIcon";
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
      <div className="dak:glass-card programming mb-4 p-4 w-full rounded-lg dark:bg-slate-50 dark:text-black lg:transform lg:transition-transform lg:duration-300 lg:hover:scale-105">
        <h2 className="text-xl font-bold mb-4">{translations[language].programmingLanguages}</h2>
        <div className="flex justify-start items-center px-5 mx-auto overflow-x-auto overflow-y-hidden whitespace-nowrap max-h-48">
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original-wordmark.svg" alt="Java Logo" name="Java" width={64} height={64} />
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-plain.svg" alt="TypeScript Logo" name="TypeScript" />
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" alt="C# Logo" name="C#" />
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" alt="Node.js Logo" name="Node.js" />
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg" alt="Dart Logo" name="Dart" />
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" alt="SQL Logo" name="SQL" className="" />
        </div>
      </div>

      <div className="dak:glass-card frontend mb-4 p-4 w-full rounded-lg dark:bg-slate-50 dark:text-black lg:transform lg:transition-transform lg:duration-300 lg:hover:scale-105">
        <h2 className="text-xl font-bold mb-2">Frontend</h2>
        <div className="flex justify-start items-center px-5 mx-auto overflow-x-auto overflow-y-hidden whitespace-nowrap max-h-48">
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-plain.svg" alt="HTML Logo" name="HTML" />
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" alt="CSS Logo" name="CSS" />
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React Logo" name="React" />
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-plain.svg" alt="Next.js Logo" name="Next.js" />
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg" alt="Angular Logo" name="Angular" />
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="TailwindCSS Logo" name="TailwindCSS" className="" />
        </div>
      </div>

      <div className="sm:flex justify-start w-full gap-4">
        <div className="dak:glass-card mobile mb-4 p-4 w-full rounded-lg dark:bg-slate-50 dark:text-black lg:transform lg:transition-transform lg:duration-300 lg:hover:scale-105">
        <h2 className="text-xl font-bold mb-4">Mobile & Cross-platform</h2>
        <div className="flex justify-start items-center px-5 mx-auto overflow-x-auto overflow-y-hidden whitespace-nowrap max-h-48">
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" alt="Flutter Logo" name="Flutter" className="mr-8" />
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xamarin/xamarin-original.svg" alt="Xamarin Logo" name="Xamarin" className="" />
        </div>
      </div>

        <div className="dak:glass-card backend mb-4 p-4 w-full rounded-lg dark:bg-slate-50 dark:text-black lg:transform lg:transition-transform lg:duration-300 lg:hover:scale-105">
          <h2 className="text-xl font-bold mb-4">Backend & Frameworks</h2>
          <div className="flex justify-start items-center px-5 mx-auto overflow-x-auto overflow-y-hidden whitespace-nowrap max-h-48">
            <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" alt="Spring Boot Logo" name="Spring Boot" className="mr-8" />
            <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" alt="Node.js Logo" name="Node.js" className="" />
          </div>
        </div>
      </div>

      <div className="dak:glass-card db mb-4 p-4 w-full rounded-lg dark:bg-slate-50 dark:text-black lg:transform lg:transition-transform lg:duration-300 lg:hover:scale-105">
        <h2 className="text-xl font-bold mb-4">Databases</h2>
        <div className="flex justify-start items-center px-5 mx-auto overflow-x-auto overflow-y-hidden whitespace-nowrap max-h-48">
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg" alt="Oracle Logo" name="Oracle" />
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-plain.svg" alt="PostgreSQL Logo" name="PostgreSQL" />
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" alt="MySQL Logo" name="MySQL" />
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg" alt="SQLite Logo" name="SQLite" className="" />
        </div>
      </div>

        <div className="dak:glass-card devops mb-4 p-4 w-full rounded-lg dark:bg-slate-50 dark:text-black lg:transform lg:transition-transform lg:duration-300 lg:hover:scale-105">
        <h2 className="text-xl font-bold mb-4">DevOps & Cloud</h2>
        <div className="flex justify-start items-center px-5 mx-auto overflow-x-auto overflow-y-hidden whitespace-nowrap max-h-48">
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" alt="Docker Logo" name="Docker" />
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg" alt="Cloudflare Logo" name="Cloudflare" />
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" alt="Linux Logo" name="Linux" />
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg" alt="Github Actions Logo" name="Github Actions" className="" />
        </div>
      </div>

      <div className="sm:flex justify-start w-full gap-4">
        <div className="dak:glass-card observability mb-4 p-4 w-full rounded-lg dark:bg-slate-50 dark:text-black lg:transform lg:transition-transform lg:duration-300 lg:hover:scale-105">
          <h2 className="text-xl font-bold mb-4">{translations[language].observability}</h2>
          <div className="flex justify-start items-center px-5 mx-auto overflow-x-auto overflow-y-hidden whitespace-nowrap max-h-48">
            <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg" alt="Prometheus Logo" name="Prometheus" />
            <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg" alt="Grafana Logo" name="Grafana" className="" />
          </div>
        </div>
      
        <div className="dak:glass-card messaging mb-4 p-4 w-full rounded-lg dark:bg-slate-50 dark:text-black lg:transform lg:transition-transform lg:duration-300 lg:hover:scale-105">
          <h2 className="text-xl font-bold mb-4">{translations[language].messaging}</h2>
          <div className="flex justify-start items-center px-5 mx-auto overflow-x-auto overflow-y-hidden whitespace-nowrap max-h-48">
            <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rabbitmq/rabbitmq-original.svg" alt="RabbitMQ Logo" name="RabbitMQ" className="mr-8" />
            <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" alt="Redis Logo" name="Redis" className="" />
          </div>
        </div>
      </div>

      <div className="dak:glass-card db mb-4 p-4 w-full rounded-lg dark:bg-slate-50 dark:text-black lg:transform lg:transition-transform lg:duration-300 lg:hover:scale-105">
        <h2 className="text-xl font-bold mb-4">{translations[language].tools}</h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-start items-center px-5 mx-auto overflow-x-hidden overflow-y-scroll whitespace-nowrap max-h-64">
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-plain.svg" alt="Adobe Illustrator" name="Adobe Illustrator" />
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg" alt="Adobe Photoshop" name="Adobe Photoshop" />
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" alt="Docker Logo" name="Docker" />
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" alt="Figma" name="Figma" />
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" alt="Git" name="Git" />
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt="Github" name="Github" />
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/insomnia/insomnia-original.svg" alt="Insomnia" name="Insomnia" />
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg" alt="Intellij" name="Intellij" />
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/maven/maven-original.svg" alt="Maven Logo" name="Maven" />
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-plain.svg" alt="Postman Logo" name="Postman" />
          <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" alt="VS Code" name="VS Code" className="" />
        </div>
      </div>
    </div>
  );
};

export default Technologies;