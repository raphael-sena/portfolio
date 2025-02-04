import { Language, translations } from "@/services/translations";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const AluraJava = () => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage =
      (localStorage.getItem("language") as Language) || "en";
    setLanguage(savedLanguage);
  }, []);

  return (
    <div>
      <div className="mb-2 w-full">
        <Link
          href={translations[language].alura_java_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative rounded-md hover:shadow-lg dark:hover:shadow-xl"
        >
          <Image
            className="rounded-md lg:cursor-pointer"
            src={translations[language].alura_java_poo_png}
            width={1176}
            height={794}
            alt="Java Poo Alura PNG"
          />
        </Link>
      </div>

      <div className="ml-2">
        <h2 className="mb-1 font-semibold text-md">
          {translations[language].skills}
        </h2>
        <ul className="flex flex-wrap" aria-label="Technologies used">
          <li className="mr-1.5 mt-2">
            <div className="flex items-center rounded-full bg-emerald-400/20 dark:bg-emerald-500/10 px-3 py-1 text-xs font-medium leading-5 text-emerald-200 dark:text-emerald-400">
              Java
            </div>
          </li>
          <li className="mr-1.5 mt-2">
            <div className="flex items-center rounded-full bg-emerald-400/20 dark:bg-emerald-500/10 px-3 py-1 text-xs font-medium leading-5 text-emerald-200 dark:text-emerald-400">
              Spring Boot
            </div>
          </li>
          <li className="mr-1.5 mt-2">
            <div className="flex items-center rounded-full bg-emerald-400/20 dark:bg-emerald-500/10 px-3 py-1 text-xs font-medium leading-5 text-emerald-200 dark:text-emerald-400">
              OOP
            </div>
          </li>
          <li className="mr-1.5 mt-2">
            <div className="flex items-center rounded-full bg-emerald-400/20 dark:bg-emerald-500/10 px-3 py-1 text-xs font-medium leading-5 text-emerald-200 dark:text-emerald-400">
              Git
            </div>
          </li>
          <li className="mr-1.5 mt-2">
            <div className="flex items-center rounded-full bg-emerald-400/20 dark:bg-emerald-500/10 px-3 py-1 text-xs font-medium leading-5 text-emerald-200 dark:text-emerald-400">
              MVC
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AluraJava;
