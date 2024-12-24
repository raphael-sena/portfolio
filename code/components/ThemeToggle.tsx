"use client";

import { translations } from '@/services/translations';
import { useState, useEffect } from 'react';

const ThemeToggle = ({ language }: { language: keyof typeof translations }) => {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 shadow-md bg-black text-slate-50 dark:bg-slate-50 dark:text-black rounded-md text-sm flex items-center space-x-2"
    >
      {/* Ícones de lua e sol com base no tema */}
      {theme === "light" ? (
        <>
          <span>🌙</span>
          <span>{translations[language].theme}</span>
        </>
      ) : (
        <>
          <span>☀️</span>
          <span>{translations[language].theme}</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
