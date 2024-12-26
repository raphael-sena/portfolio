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
    <div className="content sm:flex sm:gap-2 mb-12 lg:mr-12">
      <div className="shadow-lg rounded-md mb-2 sm:mb-0 sm:w-1/3 lg:w-full lg:mb-2 h-full">
        <Image
          className="w-full h-full rounded-lg"
          width={1920}
          height={1080}
          layout="responsive"
          src="/images/profile_photo.JPEG"
          alt="Picture of me"
          quality={100}
        />
      </div>
      <div className="text-lg bg-black dark:bg-slate-50 text-slate-50 dark:text-black p-4 rounded-lg shadow sm:w-2/3 lg:w-full">
        <p>
          {firstPart.split("Raphael Sena").map((part, index) =>
            index === 0 ? (
              part
            ) : (
              <React.Fragment key={index}>
                <strong>Raphael Sena</strong>
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
