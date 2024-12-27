"use client";

import { Language, translations } from "@/services/translations";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io";

const WhatsAppButton = () => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage =
      (localStorage.getItem("language") as Language) || "en";
    setLanguage(savedLanguage);
  }, []);

  const phoneNumber = "5531997167755";
  const message = translations[language].whatsapp_message;
  const encodedMessage = encodeURIComponent(message);

  console.log(encodedMessage);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <Link
      target="_blank"
      href={whatsappUrl}
      className="transform transition-transform duration-300 hover:scale-110"
    >
      <IoLogoWhatsapp />
    </Link>
  );
};

export default WhatsAppButton;
