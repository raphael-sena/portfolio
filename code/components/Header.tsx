"use client";

import { useEffect, useState } from "react";
import Image from 'next/image'

const translations = {
  en: {
    title: "Welcome to my Portfolio! :)",
  },
  pt: {
    title: "Bem-vindo(a) ao meu Portfólio :)",
  },
  de: {
    title: "Wilkommen auf mein Portfolio :)",
  },
};

type Language = keyof typeof translations;

const Header = () => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage =
      (localStorage.getItem("language") as Language) || "en";
    setLanguage(savedLanguage);
  }, []);

  return (
    <header className="w-full flex justify-start items-center mb-2">
      <Image 
        className="rounded-full mr-2" 
        width={48}
        height={48}
        src="/images/avatar.png" 
        alt="" 
      />
      <h2 className="text-xl mb-2 font-semibold relative max-w-full overflow-hidden before:absolute before:inset-0 before:animate-typewriter before:bg-gradient-to-b before:from-[#CFD8E3] before:to-[#D1DAE4] after:absolute after:inset-0 after:w-[0.125em] after:animate-caret after:bg-black">
        {translations[language].title}
      </h2>
    </header>
  );
};

export default Header;
