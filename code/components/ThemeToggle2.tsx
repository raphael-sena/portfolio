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
      className="text-lg"
    >
      {theme === "light" ? (
        <>
          <span>🌙</span>
        </>
      ) : (
        <>
          <span>☀️</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
