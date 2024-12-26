"use client";

import { Language, translations } from "@/services/translations";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa";

const Experience = () => {
  const [language, setLanguage] = useState<Language>("en");

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
      <div className="glass-card bg-black dark:bg-slate-50 sm:gap-2 px-6 py-4 rounded-lg text-slate-50 dark:text-black lg:opacity-60 lg:hover:opacity-100 lg:transition-opacity lg:duration-300">
        <div className="flex">
          <div className="w-full text-lg flex items-center mr-4 md:mr-2">
            <Image
              className="rounded-full mr-2 transform transition-transform duration-300 hover:scale-110"
              width={45}
              height={45}
              src="/images/experience/agencia_de_software.png"
              alt="Agência Experimental de Software"
            />
            <div>
              <h1 className="text-md font-bold tracking-tighter">Agência Experimental de Software</h1>
              <h2 className="text-sm font-semibold">09/2024 - {translations[language].currently}</h2>
            </div>
          </div>
          <div className="flex items-center gap-1 justify-end">
            <Link
              href="https://www.linkedin.com/company/agencia-experimental-de-software/"
              className="transform transition-transform duration-300 hover:scale-110"
              target="_blank"
            >
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
        <div className="ml-2">
          <h2 className="mb-1 font-semibold text-md">{translations[language].cuido_bem_projects}</h2>
          <div>
            <div className="items-center ml-2">
              <div className="flex justify-between items-center w-full">
                <h2 className="mr-2 font-semibold text-md">Cuido Bem</h2>
                <h2 className="text-xs font-semibold">09/2024 - {translations[language].currently}</h2>
              </div>
              {renderCuidoBem()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
