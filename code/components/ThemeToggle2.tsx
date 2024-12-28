"use client";

import { useState, useEffect } from 'react';

const ThemeToggle2 = () => {
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

export default ThemeToggle2;
