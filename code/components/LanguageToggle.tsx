"use client";

import { useState, useEffect } from "react";

const LanguageToggle = () => {
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    setLanguage(savedLanguage);
  }, []);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    window.location.reload();
  };

  return (
    <div className="flex items-center space-x-2">
      {["en", "pt", "de"].map((lang) => (
        <button
          key={lang}
          onClick={() => changeLanguage(lang)}
          className={`px-2 py-1 rounded-md text-sm shadow-md ${
            language === lang
              ? "bg-black text-slate-50 dark:bg-slate-50 dark:text-black"
              : "bg-slate-50 dark:bg-gray-500 text-black dark:text-white"
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
