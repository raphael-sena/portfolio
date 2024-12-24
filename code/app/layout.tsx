"use client";

// app/layout.tsx
import { ReactNode, useEffect, useState } from "react";
import localFont from "next/font/local";
import "./globals.css"; 
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
// Importando fontes locais (se necessário)
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({
  children,
}: LayoutProps) {

  const [language, setLanguage] = useState<"en" | "pt" | "de">("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as "en" | "pt" | "de" || "en";
    setLanguage(savedLanguage);
  }, []);

  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-slate-300 to-slate-50 text-gray-900 dark:bg-gray-900 dark:from-black dark:to-darkBlue bg-cover bg-center dark:text-slate-50">
        <header className="p-4 flex justify-between items-center">
          <div className="w-full flex justify-between space-x-4">
            <ThemeToggle language={language}/>
            <LanguageToggle />
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
