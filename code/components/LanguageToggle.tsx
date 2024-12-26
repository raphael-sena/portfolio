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
          className={`px-2 py-1 rounded-md text-sm shadow-lg ${
            language === lang
              ? "bg-black text-slate-50 dark:bg-slate-50 dark:text-black shadow-lg shadow-black dark:shadow-slate-400"
              : "bg-slate-50 hover:shadow-sm hover:shadow-black dark:bg-gray-500 text-black dark:text-white dark:hover:shadow-sm dark:hover:shadow-slate-50 "
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
