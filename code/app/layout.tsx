"use client";

// app/layout.tsx
import { ReactNode, useEffect, useState } from "react";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { SpeedInsights } from "@vercel/speed-insights/next";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  const [language, setLanguage] = useState<"en" | "pt" | "de">("en");
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const savedLanguage =
      (localStorage.getItem("language") as "en" | "pt" | "de") || "en";
    setLanguage(savedLanguage);
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />

        <meta name="description" content="Dev Portfolio showcasing my work and skills." />
        <meta property="og:title" content="Raphael Sena | Portfolio" />
        <meta property="og:description" content="Explore my projects, skills, and experience." />
        <meta property="og:url" content="https://raphaelsena.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://raphaelsena.com/images/avatar.png" />
        <meta property="og:image:width" content="630" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Raphael Sena Portfolio Image" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Raphael Sena | Portfolio" />
        <meta name="twitter:description" content="Dev Portfolio showcasing my work and skills." />
        <meta name="twitter:image" content="https://raphaelsena.com/images/avatar.png" />
        <meta name="twitter:image:alt" content="Raphael Sena Portfolio Image" />
      </head>

      <body className="min-h-screen max-w-[1333px] mx-auto flex flex-col justify-center items-center bg-gradient-to-b from-slate-200 via-slate-50 to-slate-200 text-gray-900 dark:from-black dark:to-stone-900 bg-cover bg-center dark:text-slate-50">
        <header className="text-lg p-4 flex justify-between items-center w-full">
          <div className="w-full flex justify-between space-x-4">
            <ThemeToggle language={language} />
            <LanguageToggle />
          </div>
        </header>
        <main className="flex-grow w-full flex justify-center items-center">
          {children}
        </main>

        {showButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 p-3 bg-gray-800 dark:bg-gray-400 rounded-full shadow-lg hover:bg-black dark:hover:bg-slate-50 transition-colors duration-300 lg:block"
            aria-label="Go to top"
          >
            👆
          </button>
        )}
        <SpeedInsights />
      </body>
    </html>
  );
}
