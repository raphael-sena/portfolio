"use client";

import { Language, translations } from "@/services/translations";
import Image from "next/image";
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
    <div className="sm:flex sm:gap-2">
      <div className="shadow-lg rounded-md mb-2 sm:mb-0 sm:w-1/3">
        <Image
          className="w-full h-full rounded-md"
          width={400}
          height={400}
          src="/images/profile_photo.JPEG"
          alt="Picture of me"
        />
      </div>
      <div className="text-lg bg-black dark:bg-slate-50 text-slate-50 dark:text-black p-4 rounded-md shadow sm:w-2/3">
        <p>
          {firstPart.split("Raphael Sena").map((part, index) =>
            index === 0 ? (
              part
            ) : (
              <>
                <strong>Raphael Sena</strong>
                {part}
              </>
            )
          )}
        </p>
        <p>{secondPart}</p>
      </div>
    </div>
  );
};

export default Intro;
