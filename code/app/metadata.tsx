import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Raphael Sena | Portfolio",
  description: "Dev Portfolio showcasing my work and skills.",
  openGraph: {
    title: "Raphael Sena | Portfolio",
    description: "Explore my projects, skills, and experience.",
    url: "https://raphaelsena.com",
    type: "website",
    images: [
      {
        url: "https://raphaelsena.com/images/avatar.png",
        width: 630,
        height: 630,
        alt: "Raphael Sena Portfolio Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raphael Sena | Portfolio",
    description: "Explore my projects, skills, and experience.",
    images: [
      {
        url: "https://raphaelsena.com/images/avatar.png",
        width: 1200,
        height: 630,
        alt: "Raphael Sena Portfolio Image",
      },
    ],
  },
};
