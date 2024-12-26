"use client";

import { Language, translations } from "@/services/translations";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";

const Intro = () => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage =
      (localStorage.getItem("language") as Language) || "en";
    setLanguage(savedLanguage);
  }, []);

  const introText = translations[language].intro;
  const periodIndex = introText.indexOf(".") + 1; // Localiza o primeiro ponto final e inclui o ponto
  const firstPart = introText.slice(0, periodIndex).trim();
  const secondPart = introText.slice(periodIndex).trim();

  return (
    <div className="content sm:flex sm:gap-2 mb-12 lg:mx-12">
      <div className="sm:w-1/3 lg:w-full lg:mb-8 h-full lg:w-128 lg:h-128">
        <Image
          className="mb-2 lg:transform lg:transition-transform lg:duration-300 lg:hover:scale-105 w-full h-full rounded-lg lg:rounded-full lg:aspect-square object-cover overflow-hidden"
          width={1024}
          height={1024}
          src="/images/profile_photo_2.JPEG"
          alt="Picture of me"
          quality={100}
        />
        <div className="mb-2 lg:mt-4">
          <h1 className="text-3xl font-bold">Raphael Sena</h1>
          <h2 className="text-lg"> {translations[language].profession}</h2>
        </div>
      </div>

      <div className="text-lg bg-black dark:bg-slate-50 text-slate-50 dark:text-black p-4 rounded-lg shadow sm:w-2/3 lg:w-full">
        <p>
          {firstPart.split("Raphael").map((part, index) =>
            index === 0 ? (
              part
            ) : (
              <React.Fragment key={index}>
                <strong>Raphael</strong>
                {part}
              </React.Fragment>
            )
          )}
        </p>
        <p>{secondPart}</p>
      </div>
    </div>
  );
};

export default Intro;
