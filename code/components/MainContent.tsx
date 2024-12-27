"use client";

import { useEffect, useState } from "react";
import FeaturedProjects from "./FeaturedProjects";
import Footer from "./Footer";
import Intro from "./Intro";
import { Language, translations } from "@/services/translations";
import Experience from "./Experience";
import Education from "./Education";
import Image from "next/image";

const MainContent = () => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage =
      (localStorage.getItem("language") as Language) || "en";
    setLanguage(savedLanguage);
  }, []);

  return (
    <div>
      <div className="lg:flex mb-8">
        <aside className="lg:w-2/3 ">
          <section id="intro">
            <Intro />
          </section>
        </aside>

        <div className="lg:w-full">
          <section id="about" className="mb-10">
            <h2 className="text-2xl font-bold text-start mb-2">
              {translations[language].about}
            </h2>
            <p className="font-bold text-start mb-4">
              {translations[language].about_text}
            </p>
          </section>

          <section id="experience" className="mb-10">
            <h2 className="text-2xl font-bold text-start mb-2">
              {translations[language].experience}
            </h2>
            <Experience />
          </section>

          <section id="education" className="mb-10">
            <h2 className="text-2xl font-bold text-start mb-2">
              {translations[language].education}
            </h2>
            <Education />
          </section>

          <section id="featured-projects" className="lg:w-full mb-10">
            <h2 className="text-2xl font-bold text-start mb-2">
              {translations[language].featured}
            </h2>
            <FeaturedProjects />
          </section>

          <section id="featured-projects" className="lg:w-full mb-10">
            <h2 className="text-2xl font-bold text-start mb-2">
              Github Wrapped 2024
            </h2>
            <Image
              className="rounded-2xl transition-shadow duration-300 ease-in-out hover:shadow-[0_0_15px_10px_rgba(255,0,45,0.7)] hover:mt-4"
              width={1200}
              height={1200}
              src="/images/git-wrapped-raphael-sena.png"
              alt="Logo Pucminas White"
            />
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainContent;
