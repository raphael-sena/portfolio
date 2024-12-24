"use client";

import { Language, translations } from "@/services/translations";
import Image from "next/image";
import { useEffect, useState } from "react";

const Footer = () => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage =
      (localStorage.getItem("language") as Language) || "en";
    setLanguage(savedLanguage);
  }, []);

  const footerText = translations[language].footer;

  const renderFooterText = (text: string) => {
    const parts = text.split("@raphael-sena");

    return (
      <>
        {parts[0]} 
        <a href="https://github.com/raphael-sena" target="_blank" className="text-blue-500 hover:text-blue-700">
          @raphael-sena
        </a>
        {parts[1]}
      </>
    );
  };

  return (
    <div className="sm:flex sm:gap-2 mb-8">
      <div className="w-full text-lg text-center">
        <p>{renderFooterText(footerText)}.</p>
      </div>
    </div>
  );
};

export default Footer;
