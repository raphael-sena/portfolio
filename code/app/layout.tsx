// app/layout.tsx
import { ReactNode } from "react";
import { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css"; 
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

// Metadados globais da aplicação (se necessário)
export const metadata: Metadata = {
  title: "Meu Portfólio",
  description: "Portfólio de desenvolvimento",
};

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
