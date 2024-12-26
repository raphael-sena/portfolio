"use client";

import { Language, translations } from "@/services/translations";
import { useEffect, useState } from "react";
import GitHubButton from "react-github-btn";

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
        <a
          href="https://github.com/raphael-sena"
          target="_blank"
          className="text-blue-500 hover:text-blue-700"
        >
          @raphael-sena
        </a>
        {parts[1]}
      </>
    );
  };

  return (
    <div className="gap-2 mb-8 items-center space-y-2">
      <div className="w-full text-lg text-center">
        <p>{renderFooterText(footerText)}.</p>
      </div>

      <div className="space-x-2 items-center w-full text-center">
        <GitHubButton
          href="https://github.com/raphael-sena/portfolio"
          data-color-scheme="no-preference: dark; light: light; dark: dark;"
          data-icon="octicon-star"
          data-size="large"
          data-show-count="true"
          aria-label="Star on GitHub"
        >
          Star
        </GitHubButton>
        <GitHubButton
          href="https://github.com/lucaazalim/azal.im/fork"
          data-color-scheme="no-preference: dark; light: light; dark: dark;"
          data-icon="octicon-repo-forked"
          data-size="large"
          data-show-count="true"
          aria-label="Fork  on GitHub"
        >
          Fork
        </GitHubButton>
      </div>
    </div>
  );
};

export default Footer;
