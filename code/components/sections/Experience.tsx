"use client";

import { Language, translations } from "@/services/translations";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLink, FaLinkedinIn } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const Experience = () => {
  const [language, setLanguage] = useState<Language>("en");

  const { ref: experienceRef1, inView: experienceInView1 } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const { ref: experienceRef2, inView: experienceInView2 } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const { ref: experienceRef3, inView: experienceInView3 } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const { ref: experienceRef4, inView: experienceInView4 } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    const savedLanguage =
      (localStorage.getItem("language") as Language) || "en";
    setLanguage(savedLanguage);
  }, []);

  const renderCuidoBem = () => {
    const text = translations[language].cuido_bem;

    const [intro, listPart] = text.split(":").map((item) => item.trim());

    const cleanedListPart = listPart?.startsWith("- ")
      ? listPart.slice(2)
      : listPart;

    const listItems = cleanedListPart
      ? cleanedListPart
          .split(" - ")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

    return (
      <div className="ml-4 text-sm">
        <p>{intro}:</p>
        {listItems.length > 0 && (
          <ul className="list-disc pl-5">
            {listItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <div
        id="experience"
        className={`glass-card bg-black dark:bg-slate-50 sm:gap-2 p-4 rounded-lg text-slate-50 dark:text-black lg:opacity-60 lg:hover:opacity-100 lg:transition-opacity lg:duration-300 transition-opacity duration-1000 ${
          experienceInView1 ? "opacity-100" : "opacity-0"
        }`}
        ref={experienceRef1}
      >
        <div className="flex mb-2">
          <div className="w-full text-lg flex items-center mr-4 md:mr-2">
            <Image
              className="mr-2 transform transition-transform duration-300 hover:scale-110 dark:hidden"
              width={42}
              height={42}
              src="/images/experience/e1-simbolo-branco.png"
              alt="Volaris - Empresa 1"
            />
            <Image
              className="mr-2 transform transition-transform duration-300 hover:scale-110 hidden dark:block"
              width={42}
              height={42}
              src="/images/experience/e1-simbolo-preto.png"
              alt="Volaris - Empresa 1"
            />
            <div>
              <h1 className="text-md font-bold tracking-tighter">
                Volaris - Empresa 1
              </h1>
              <h2 className="text-sm font-semibold">05/2025 - {translations[language].currently}</h2>
            </div>
          </div>

          <div className="flex items-center gap-1 justify-end">
            <Link
              href="https://www.empresa1.com.br/"
              className="transform transition-transform duration-300 hover:scale-110 mr-1"
              target="_blank"
            >
              <FaLink />
            </Link>
            <Link
              href="https://www.linkedin.com/company/empresa-1/posts/?feedView=all"
              className="transform transition-transform duration-300 hover:scale-110"
              target="_blank"
            >
              <FaLinkedinIn />
            </Link>
          </div>
        </div>

        <div className="ml-2 mb-2 w-full h-full">
          <div className="flex justify-between items-center w-full">
            <h2 className="mr-2 font-semibold text-md">
              {translations[language].e1.software_engineering_intern}
            </h2>
            <h2 className="text-xs font-semibold">05/2025 - {translations[language].currently}</h2>
          </div>
          <ul className="list-disc ml-4">
            <li>
              <p className="text-sm">
                {translations[language].e1.software_engineering_intern_text}
              </p>
            </li>
          </ul>
        </div>

        <div className="ml-2">
          <h2 className="mb-1 font-semibold text-md">
            {translations[language].skills}
          </h2>
          <ul className="flex flex-wrap" aria-label="Technologies used">
            <li className="mr-1.5 mt-2">
              <div className="flex items-center rounded-full bg-gray-50/10 dark:bg-gray-500/10 px-3 py-1 text-xs font-medium leading-5 dark:text-gray-500">
                Service Desk
              </div>
            </li>
            <li className="mr-1.5 mt-2">
              <div className="flex items-center rounded-full bg-gray-50/10 dark:bg-gray-500/10 px-3 py-1 text-xs font-medium leading-5 dark:text-gray-500">
                MS Office
              </div>
            </li>
            <li className="mr-1.5 mt-2">
              <div className="flex items-center rounded-full bg-gray-50/10 dark:bg-gray-500/10 px-3 py-1 text-xs font-medium leading-5 dark:text-gray-500">
                User Support
              </div>
            </li>
            <li className="mr-1.5 mt-2">
              <div className="flex items-center rounded-full bg-gray-50/10 dark:bg-gray-500/10 px-3 py-1 text-xs font-medium leading-5 dark:text-gray-500">
                Hardware Support
              </div>
            </li>
            <li className="mr-1.5 mt-2">
              <div className="flex items-center rounded-full bg-gray-50/10 dark:bg-gray-500/10 px-3 py-1 text-xs font-medium leading-5 dark:text-gray-500">
                Active Directory
              </div>
            </li>
            <li className="mr-1.5 mt-2">
              <div className="flex items-center rounded-full bg-gray-50/10 dark:bg-gray-500/10 px-3 py-1 text-xs font-medium leading-5 dark:text-gray-500">
                Windows
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div
        id="experience"
        className={`glass-card bg-black dark:bg-slate-50 sm:gap-2 p-4 rounded-lg text-slate-50 dark:text-black lg:opacity-60 lg:hover:opacity-100 lg:transition-opacity lg:duration-300 transition-opacity duration-1000 ${
          experienceInView1 ? "opacity-100" : "opacity-0"
        }`}
        ref={experienceRef1}
      >
        <div className="flex mb-2">
          <div className="w-full text-lg flex items-center mr-4 md:mr-2">
            <Image
              className="mr-2 transform transition-transform duration-300 hover:scale-110"
              width={45}
              height={45}
              src="/images/experience/agencia_de_software.png"
              alt="Agência Experimental de Software"
            />
            <div>
              <h1 className="text-md font-bold tracking-tighter">
                Agência Experimental de Software
              </h1>
              <h2 className="text-sm font-semibold">
                09/2024 - {translations[language].currently}
              </h2>
            </div>
          </div>
          <div className="flex items-center  gap-1">
            <Link
              href="https://www.linkedin.com/company/agencia-experimental-de-software/"
              className="transform transition-transform duration-300 hover:scale-110"
              target="_blank"
            >
              <FaLinkedinIn />
            </Link>
          </div>
        </div>

        <div className="ml-2 mb-2">
          <h2 className="mb-1 font-semibold text-md">
            {translations[language].cuido_bem_projects}
          </h2>
          <div>
            <div className="items-center ml-2">
              <div className="flex justify-between items-center w-full">
                <h2 className="mr-2 font-semibold text-md">Cuido Bem</h2>
                <h2 className="text-xs font-semibold">
                  09/2024 - {translations[language].currently}
                </h2>
              </div>
              {renderCuidoBem()}
            </div>
          </div>
        </div>

        <div className="ml-2">
          <h2 className="mb-1 font-semibold text-md">
            {translations[language].skills}
          </h2>
          <ul className="flex flex-wrap" aria-label="Technologies used">
            <li className="mr-1.5 mt-2">
              <div className="flex items-center rounded-full bg-sky-400/10 dark:bg-sky-500/10 px-3 py-1 text-xs font-medium leading-5 text-sky-300 dark:text-sky-400">
                Java
              </div>
            </li>
            <li className="mr-1.5 mt-2">
              <div className="flex items-center rounded-full bg-sky-400/10 dark:bg-sky-500/10 px-3 py-1 text-xs font-medium leading-5 text-sky-300 dark:text-sky-400">
                Spring Boot
              </div>
            </li>
            <li className="mr-1.5 mt-2">
              <div className="flex items-center rounded-full bg-sky-400/10 dark:bg-sky-500/10 px-3 py-1 text-xs font-medium leading-5 text-sky-300 dark:text-sky-400">
                Mockito
              </div>
            </li>
            <li className="mr-1.5 mt-2">
              <div className="flex items-center rounded-full bg-sky-400/10 dark:bg-sky-500/10 px-3 py-1 text-xs font-medium leading-5 text-sky-300 dark:text-sky-400">
                SQL
              </div>
            </li>
            <li className="mr-1.5 mt-2">
              <div className="flex items-center rounded-full bg-sky-400/10 dark:bg-sky-500/10 px-3 py-1 text-xs font-medium leading-5 text-sky-300 dark:text-sky-400">
                Git
              </div>
            </li>
            <li className="mr-1.5 mt-2">
              <div className="flex items-center rounded-full bg-sky-400/10 dark:bg-sky-500/10 px-3 py-1 text-xs font-medium leading-5 text-sky-300 dark:text-sky-400">
                RestAPI
              </div>
            </li>
            <li className="mr-1.5 mt-2">
              <div className="flex items-center rounded-full bg-sky-400/10 dark:bg-sky-500/10 px-3 py-1 text-xs font-medium leading-5 text-sky-300 dark:text-sky-400">
                MVC
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div
        id="experience"
        className={`glass-card bg-black dark:bg-slate-50 sm:gap-2 p-4 rounded-lg text-slate-50 dark:text-black lg:opacity-60 lg:hover:opacity-100 lg:transition-opacity lg:duration-300 transition-opacity duration-1000 ${
          experienceInView2 ? "opacity-100" : "opacity-0"
        }`}
        ref={experienceRef2}
      >
        <div className="flex mb-2">
          <div className="w-full text-lg flex items-center mr-4 md:mr-2">
            <Image
              className="mr-2 transform transition-transform duration-300 hover:scale-110 dark:hidden"
              width={64}
              height={64}
              src="/images/experience/logo-puc-minas-white.png"
              alt="Agência Experimental de Software"
            />
            <Image
              className="mr-2 transform transition-transform duration-300 hover:scale-110 hidden dark:block"
              width={64}
              height={64}
              src="/images/experience/logo-puc-minas-black.png"
              alt="Agência Experimental de Software"
            />
            <div>
              <h1 className="text-md font-bold tracking-tighter">
                Pontifícia Universidade Católica de Minas Gerais
              </h1>
              <h2 className="text-sm font-semibold">09/2021 - 09/2023</h2>
            </div>
          </div>

          <div className="flex items-center gap-1 justify-end">
            <Link
              href="https://www.pucminas.br/destaques/Paginas/default.aspx"
              className="transform transition-transform duration-300 hover:scale-110 mr-1"
              target="_blank"
            >
              <FaLink />
            </Link>
            <Link
              href="https://www.linkedin.com/school/pucminas/posts/?feedView=all"
              className="transform transition-transform duration-300 hover:scale-110"
              target="_blank"
            >
              <FaLinkedinIn />
            </Link>
          </div>
        </div>

        <div className="ml-2 mb-2 w-full h-full">
          <div className="flex justify-between items-center w-full">
            <h2 className="mr-2 font-semibold text-md">
              {translations[language].technician}
            </h2>
            <h2 className="text-xs font-semibold">05/2023 - 09/2023</h2>
          </div>
          <ul className="list-disc ml-4">
            <li>
              <p className="text-sm">
                {translations[language].technician_text}
              </p>
            </li>
          </ul>
        </div>

        <div className="ml-2 mb-2 w-full h-full">
          <div className="flex justify-between items-center w-full">
            <h2 className="mr-2 font-semibold text-md">
              {translations[language].technician_assistant}
            </h2>
            <h2 className="text-xs font-semibold">03/2022 - 04/2023</h2>
          </div>
          <ul className="list-disc ml-4">
            <li>
              <p className="text-sm">
                {translations[language].technician_assistant_text}
              </p>
            </li>
          </ul>
        </div>

        <div className="ml-2 mb-2 w-full h-full">
          <div className="flex justify-between items-center w-full">
            <h2 className="mr-2 font-semibold text-md">
              {translations[language].intern}
            </h2>
            <h2 className="text-xs font-semibold">09/2021 - 03/2022</h2>
          </div>
          <ul className="list-disc ml-4">
            <li>
              <p className="text-sm">{translations[language].intern_text}</p>
            </li>
          </ul>
        </div>

        <div className="ml-2">
          <h2 className="mb-1 font-semibold text-md">
            {translations[language].skills}
          </h2>
          <ul className="flex flex-wrap" aria-label="Technologies used">
            <li className="mr-1.5 mt-2">
              <div className="flex items-center rounded-full bg-gray-50/10 dark:bg-gray-500/10 px-3 py-1 text-xs font-medium leading-5 dark:text-gray-500">
                Service Desk
              </div>
            </li>
            <li className="mr-1.5 mt-2">
              <div className="flex items-center rounded-full bg-gray-50/10 dark:bg-gray-500/10 px-3 py-1 text-xs font-medium leading-5 dark:text-gray-500">
                MS Office
              </div>
            </li>
            <li className="mr-1.5 mt-2">
              <div className="flex items-center rounded-full bg-gray-50/10 dark:bg-gray-500/10 px-3 py-1 text-xs font-medium leading-5 dark:text-gray-500">
                User Support
              </div>
            </li>
            <li className="mr-1.5 mt-2">
              <div className="flex items-center rounded-full bg-gray-50/10 dark:bg-gray-500/10 px-3 py-1 text-xs font-medium leading-5 dark:text-gray-500">
                Hardware Support
              </div>
            </li>
            <li className="mr-1.5 mt-2">
              <div className="flex items-center rounded-full bg-gray-50/10 dark:bg-gray-500/10 px-3 py-1 text-xs font-medium leading-5 dark:text-gray-500">
                Active Directory
              </div>
            </li>
            <li className="mr-1.5 mt-2">
              <div className="flex items-center rounded-full bg-gray-50/10 dark:bg-gray-500/10 px-3 py-1 text-xs font-medium leading-5 dark:text-gray-500">
                Windows
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div
        id="experience"
        className={`glass-card bg-black dark:bg-slate-50 sm:gap-2 p-4 rounded-lg text-slate-50 dark:text-black lg:opacity-60 lg:hover:opacity-100 lg:transition-opacity lg:duration-300 transition-opacity duration-1000 ${
          experienceInView3 ? "opacity-100" : "opacity-0"
        }`}
        ref={experienceRef3}
      >
        <div className="flex mb-2">
          <div className="w-full text-lg flex items-center mr-4 md:mr-2">
            <Image
              className="mr-2 transform transition-transform duration-300 hover:scale-110 rounded-md"
              width={64}
              height={64}
              src="/images/experience/avaso-technology-solutions-2.jpg"
              alt="Agência Experimental de Software"
            />
            <div>
              <h1 className="text-md font-bold tracking-tighter">
                Avaso Technology Solutions LTDA
              </h1>
              <h2 className="text-sm font-semibold">
                09/2023 - {translations[language].currently}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-1 justify-end">
            <Link
              href="https://www.avasotech.com/"
              className="transform transition-transform duration-300 hover:scale-110 mr-1"
              target="_blank"
            >
              <FaLink />
            </Link>
            <Link
              href="https://www.linkedin.com/company/avaso-technology-solutions/posts/?feedView=all"
              className="transform transition-transform duration-300 hover:scale-110"
              target="_blank"
            >
              <FaLinkedinIn />
            </Link>
          </div>
        </div>

        <div className="ml-2 mb-2">
          <h2 className="mb-1 font-semibold text-md">Field Support Engineer</h2>
          <p>{translations[language].avaso}</p>
        </div>

        <div className="ml-2">
          <h2 className="mb-1 font-semibold text-md">
            {translations[language].skills}
          </h2>
          <ul className="flex flex-wrap" aria-label="Technologies used">
            <li className="mr-1.5 mt-2">
              <div className="flex items-center rounded-full bg-sky-400/10 dark:bg-sky-500/10 px-3 py-1 text-xs font-medium leading-5 text-sky-300 dark:text-sky-400">
                Hardware
              </div>
            </li>
            <li className="mr-1.5 mt-2">
              <div className="flex items-center rounded-full bg-sky-400/10 dark:bg-sky-500/10 px-3 py-1 text-xs font-medium leading-5 text-sky-300 dark:text-sky-400">
                Server Maintenance
              </div>
            </li>
            <li className="mr-1.5 mt-2">
              <div className="flex items-center rounded-full bg-sky-400/10 dark:bg-sky-500/10 px-3 py-1 text-xs font-medium leading-5 text-sky-300 dark:text-sky-400">
                User Support
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Experience;
