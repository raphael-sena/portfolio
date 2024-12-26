"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Language, translations } from "@/services/translations";
import { FaLink, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const Education = () => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage =
      (localStorage.getItem("language") as Language) || "en";
    setLanguage(savedLanguage);
  }, []);

  return (
    <div>
      <div className="glass-card bg-black dark:bg-slate-50 sm:gap-2 p-4 rounded-lg text-slate-50 dark:text-black lg:opacity-60 lg:hover:opacity-100 lg:transition-opacity lg:duration-300">
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center">
            <Image
              className="mr-2 transform transition-transform duration-300 hover:scale-110 rounded-md"
              src={"/images/education/KOGARAH-HIGH-SCHOOL-LOGO.gif"}
              alt="Kogarah High School Logo"
              width={64}
              height={64}
            />
            <div>
              <h2 className="text-lg font-semibold">Kogarah High School</h2>
              <h3 className="text-sm font-semibold">06/2017 - 01/2018</h3>
            </div>
          </div>
          <div className="flex flex-col items-end text-end">
            <h3 className="mb-2">{translations[language].sydney}</h3>
            <div className="flex items-center justify-end space-x-2">
              <Link
                target="_blank"
                href={"https://kogarah-h.schools.nsw.gov.au/"}
                className="transform transition-transform duration-300 hover:scale-110"
                >
                <FaLink />
              </Link>
              <Link
                target="_blank"
                href={"https://www.linkedin.com/company/kogarah-high-school/about/"}
                className="transform transition-transform duration-300 hover:scale-110"
                >
                <FaLinkedin />
              </Link>

            </div>
          </div>
        </div>

        <p className="mt-4">{translations[language].kogarah}</p>
      </div>
    </div>
  );
};

export default Education;
