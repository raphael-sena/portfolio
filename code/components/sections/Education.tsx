"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Language, translations } from "@/services/translations";
import { FaLink, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

const Education = () => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage =
      (localStorage.getItem("language") as Language) || "en";
    setLanguage(savedLanguage);
  }, []);

  return (
    <div className="space-y-2">
      <div className="glass-card bg-black dark:bg-slate-50 sm:gap-2 p-4 rounded-lg text-slate-50 dark:text-black lg:opacity-60 lg:hover:opacity-100 lg:transition-opacity lg:duration-300">
        <div className="lg:flex mb-4">
          <div className="lg:w-2/3 text-lg flex items-center mr-4 md:mr-2">
            <Image
              className="mr-2 transform transition-transform duration-300 hover:scale-110 dark:hidden"
              width={64}
              height={64}
              src="/images/experience/logo-puc-minas-white.png"
              alt="Logo Pucminas White"
            />
            <Image
              className="mr-2 transform transition-transform duration-300 hover:scale-110 hidden dark:block"
              width={64}
              height={64}
              src="/images/experience/logo-puc-minas-black.png"
              alt="Logo Pucminas White"
            />
            <div>
              <h1 className="text-md font-bold tracking-tighter">
                Pontifícia Universidade Católica de Minas Gerais (PUC Minas)
              </h1>
            </div>
          </div>

          <div className="lg:w-1/3 flex justify-between lg:justify-end lg:flex-col lg:items-end lg:text-end">
            <h3 className="mb-2">{translations[language].bh}</h3>
            <div className="flex items-center justify-end space-x-2">
              <Link
                target="_blank"
                href={"https://www.pucminas.br/destaques/Paginas/default.aspx"}
                className="transform transition-transform duration-300 hover:scale-110"
              >
                <FaLink />
              </Link>
              <Link
                target="_blank"
                href={
                  "https://www.linkedin.com/school/pucminas/posts/?feedView=all"
                }
                className="transform transition-transform duration-300 hover:scale-110"
              >
                <FaLinkedinIn />
              </Link>
            </div>
          </div>
        </div>

        <div className="ml-2 mb-2 w-full h-full">
          <div className="flex justify-between items-center w-full">
            <h2 className="mr-2 font-semibold text-md">
              {translations[language].engineering}
            </h2>
            <h2 className="text-xs font-semibold">01/2023 - {translations[language].currently}</h2>
          </div>
          <p className="text-sm">{translations[language].engineering_text}</p>
        </div>
      </div>

      <div className="glass-card bg-black dark:bg-slate-50 sm:gap-2 p-4 rounded-lg text-slate-50 dark:text-black lg:opacity-60 lg:hover:opacity-100 lg:transition-opacity lg:duration-300">
        <div className="lg:flex mb-4">
          <div className="lg:w-2/3 text-lg flex items-center mr-4 md:mr-2">
            <Image
              className="mr-2 transform transition-transform duration-300 hover:scale-110"
              width={64}
              height={64}
              src="/images/education/KOGARAH-HIGH-SCHOOL-LOGO.gif"
              alt="Agência Experimental de Software"
            />
            <div>
              <h1 className="text-md font-bold tracking-tighter">
                Kogarah High School
              </h1>
            </div>
          </div>

          <div className="lg:w-1/3 flex justify-between lg:justify-end lg:flex-col lg:items-end lg:text-end">
            <h3 className="mb-2">{translations[language].sydney}</h3>
            <div className="flex items-center justify-end space-x-2">
              <Link
                target="_blank"
                href={"https://kogarah-h.schools.nsw.gov.au/"}
                className="transform transition-transform duration-300 hover:scale-110"
              >
                <FaLink />
              </Link>
              <Link
                target="_blank"
                href={
                  "https://www.linkedin.com/company/kogarah-high-school/about/"
                }
                className="transform transition-transform duration-300 hover:scale-110"
              >
                <FaLinkedinIn />
              </Link>
            </div>
          </div>
        </div>

        <div className="ml-2 mb-2 w-full h-full">
          <div className="flex justify-between items-center w-full">
            <h2 className="mr-2 font-semibold text-md">
              {translations[language].highschool}
            </h2>
            <h2 className="text-xs font-semibold">07/2017 - 01/2018</h2>
          </div>
          <p className="text-sm">{translations[language].kogarah}</p>
        </div>
      </div>
    </div>
  );
};

export default Education;
