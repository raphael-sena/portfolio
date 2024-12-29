import Image from "next/image";

const Technologies = () => {
  return (
    <div className="technologies flex flex-wrap justify-between">
      <div className="dak:glass-card backend mb-4 p-4 w-full rounded-lg dark:bg-slate-50 dark:text-black lg:transform lg:transition-transform lg:duration-300 lg:hover:scale-105">
        <h2 className="text-xl font-bold mb-4">Backend</h2>
        <div className="flex justify-start items-center px-5 mx-auto overflow-x-auto overflow-y-hidden whitespace-nowrap max-h-48">
          <Image
            className="mr-4 mb-8 w-32 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="/images/technologies/docker-logo.png"
            alt="Docker Logo"
            title="Docker"
          />
          <Image
            className="mr-4 mb-8 w-48 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="/images/technologies/hibernate-logo.png"
            alt="Hibernate Logo"
            title="Hibernate"
          />
          <Image
            className="mr-4 mb-8 transform transition-transform duration-300 hover:scale-110"
            width={64}
            height={64}
            src="/images/technologies/java-logo.png"
            alt="Java Logo"
            title="Java"
          />
          <Image
            className="mx-4 mb-8 w-32 h-16 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="/images/technologies/maven-logo.webp"
            alt="Maven Logo"
            title="Maven"
          />
          <Image
            className="mx-6 mb-8 w-32 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="/images/technologies/node-logo.png"
            alt="Node.js Logo"
            title="Node.js"
          />
          <Image
            className="mx-6 mb-8 w-16 h-16 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="/images/technologies/postman-logo.svg"
            alt="Postman Logo"
            title="Postman"
          />
          <Image
            className="mx-6 mb-8 w-48 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="/images/technologies/springboot-logo.png"
            alt="Spring Boot Logo"
            title="Spring Boot"
          />
        </div>
      </div>

      <div className="dak:glass-card frontend mb-4 p-4 w-full rounded-lg dark:bg-slate-50 dark:text-black lg:transform lg:transition-transform lg:duration-300 lg:hover:scale-105">
        <h2 className="text-xl font-bold mb-2">Frontend</h2>
        <div className="flex justify-start items-center px-5 mx-auto overflow-x-auto overflow-y-hidden whitespace-nowrap max-h-48">
          <Image
            className="mr-6 mb-8 w-20 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="/images/technologies/css-logo.png"
            alt="CSS Logo"
            title="CSS"
          />
          <Image
            className="mr-6 mb-8 w-20 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="/images/technologies/html-logo.png"
            alt="HTML Logo"
            title="HTML"
          />
          <Image
            className="mr-6 mb-8 w-20 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="/images/technologies/js-logo.png"
            alt="Java Script Logo"
            title="Java Script"
          />
          <Image
            className="mr-6 mb-8 w-20 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="/images/technologies/next-logo.png"
            alt="Next.js Logo"
            title="Next.js"
          />
          <Image
            className="mr-4 mb-8 w-48 h-20 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="/images/technologies/react-logo.png"
            alt="React Logo"
            title="React"
          />
          <Image
            className="mr-4 mb-8 w-48 h-20 lg:h-auto transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="/images/technologies/tailwind-logo.png"
            alt="TailwindCSS Logo"
            title="TailwindCSS"
          />
          <Image
            className="mr-4 mb-8 w-24 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="/images/technologies/typescript-logo.png"
            alt="TypeScript Logo"
            title="TypeScript"
          />
        </div>
      </div>

      <div className="dak:glass-card db mb-4 p-4 w-full rounded-lg dark:bg-slate-50 dark:text-black lg:transform lg:transition-transform lg:duration-300 lg:hover:scale-105">
        <h2 className="text-xl font-bold mb-4">Data Base</h2>
        <div className="flex justify-start items-center px-5 mx-auto overflow-x-auto overflow-y-hidden whitespace-nowrap max-h-48">
          <Image
            className="mr-4 mb-8 w-48 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="/images/technologies/postgresql-logo.png"
            alt="Postgresql Logo"
            title="PostgreSQL"
          />
          <Image
            className="mr-4 mb-8 w-24 transform transition-transform duration-300 hover:scale-110"
            width={1200}
            height={1200}
            src="/images/technologies/mysql-logo.png"
            alt="Mysql Logo"
            title="MySQL"
          />
        </div>
      </div>
    </div>
  );
};

export default Technologies;
