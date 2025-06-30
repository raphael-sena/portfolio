"use client";

import { useState, useEffect } from "react";
import Flag from "react-world-flags";

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

  const flagCodes: Record<string, string> = {
    en: "GB",
    pt: "BR",
    de: "DE",
  };

  return (
    <div className="flex items-center space-x-2">
      {["en", "pt", "de"].map((lang) => (
        <button
          key={lang}
          onClick={() => changeLanguage(lang)}
          className={`transition-all duration-300 ease-in-out transform ${
            language === lang
              ? "scale-110"
              : "hover:scale-110"
          }`}
        >
          <Flag
            code={flagCodes[lang]}
            style={{
              width: language === lang ? 40 : 32,
              height: language === lang ? 30 : 24,
              borderRadius: 4,
              transition: "all 0.3s ease-in-out",
            }}
          />
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
