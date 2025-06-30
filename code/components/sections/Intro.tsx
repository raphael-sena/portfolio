"use client";

import { Language, translations } from "@/services/translations";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import Navigation from "../navigation/Navigation";
import WhatsAppButton from "../WhatsAppButton";

const Intro = () => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage =
      (localStorage.getItem("language") as Language) || "en";
    setLanguage(savedLanguage);
  }, []);

  return (
    <div className="mb-10 content flex flex-col items-center gap-2 lg:mr-4 lg:sticky">
      <Image
        className="mb-4 lg:mb-8 lg:transform lg:transition-transform lg:duration-300 lg:hover:scale-105 lg:max-w-[75%] lg:max-h-[75%] w-2/3 lg:mx-auto lg:h-2/3 rounded-full aspect-square object-cover object-[center_25%] overflow-hidden"
        width={1024}
        height={1024}
        src="/images/profile.jpg"
        alt="Picture of myself"
        quality={100}
      />
      <div className="mb-4 text-center lg:text-start justify-center lg:justify-start items-center lg:items-start w-full h-full">
        <div className="mb-4 w-full lg:mt-4">
          <h1 className="text-3xl font-bold">Raphael Sena</h1>
          <h2 className="text-lg"> {translations[language].profession}</h2>
        </div>

        <div className="text-xl flex justify-center lg:justify-start items-center text-center space-x-4 lg:space-x-2">
          <Link
            target="_blank"
            href={"https://www.linkedin.com/in/raphael-sena/"}
            className="transform transition-transform duration-300 hover:scale-110"
          >
            <FaLinkedinIn />
          </Link>
          <Link
            target="_blank"
            href={"https://github.com/raphael-sena"}
            className="transform transition-transform duration-300 hover:scale-110"
          >
            <FaGithub />
          </Link>
          <Link
            target="_blank"
            href={"mailto:rsenares1@gmail.com"}
            className="transform transition-transform duration-300 hover:scale-110"
          >
            <IoIosMail />
          </Link>
          <Link
            target="_blank"
            href={
              "https://www.instagram.com/raphasenab/profilecard/?igsh=MW53dWxiM3didnAyZg=="
            }
            className="transform transition-transform duration-300 hover:scale-110"
          >
            <FaInstagram />
          </Link>
          <WhatsAppButton />
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default Intro;
