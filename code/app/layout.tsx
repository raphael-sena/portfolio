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
      <body className="min-h-screen md:px-20 lg:px-32 lg:mx-12 flex flex-col justify-center items-center bg-gradient-to-b from-slate-300 to-slate-50 text-gray-900 dark:bg-gray-900 dark:from-black dark:to-darkBlue bg-cover bg-center dark:text-slate-50">
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
