import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Raphael Sena | Portfolio",
  description: "Dev Portfolio",
  openGraph: {
    title: "Raphael Sena | Portfolio",
    description: "Dev Portfolio",
    url: "https://raphaelsena.com",
    type: "website",
    images: [
      {
        url: "/images/avatar.png",
        width: 630,
        height: 630,
        alt: "Raphael Sena Portfolio Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raphael Sena | Portfolio",
    description: "Dev Portfolio",
    images: [
      {
        url: "/images/avatar.png",
        width: 1200,
        height: 630,
        alt: "Raphael Sena Portfolio Image",
      },
    ],
  },
};
