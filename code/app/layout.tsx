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
        <SpeedInsights />
      </body>
    </html>
  );
}
