"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Language, translations } from "@/services/translations";

const Header = () => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage =
      (localStorage.getItem("language") as Language) || "en";
    setLanguage(savedLanguage);
  }, []);

  return (
    <header className="w-full flex justify-start items-center mb-8 rounded-full bg-black dark:bg-slate-50 px-2 py-2 transform transition-transform duration-300 hover:scale-105">
      <Image
        className="rounded-full mr-2 transform transition-transform duration-300 hover:scale-110"
        width={45}
        height={45}
        src="/images/avatar.png"
        alt=""
      />
      <h2 className="text-md font-semibold text-slate-50 dark:text-black relative max-w-full overflow-hidden before:absolute before:inset-0 before:animate-typewriter before:bg-black dark:before:bg-slate-50 after:absolute after:inset-0 after:w-[0.125em] after:animate-caret after:bg-slate-50 dark:after:bg-black">
        {translations[language].welcome}
      </h2>
    </header>
  );
};

export default Header;
