"use client";

import { useEffect, useState } from "react";
import FeaturedProjects from "./FeaturedProjects";
import Footer from "./Footer";
import Intro from "./Intro";
import { Language, translations } from "@/services/translations";
import Experience from "./Experience";
import Education from "./Education";
import Image from "next/image";
import React from "react";
import Spotify from "./Spotify";
import PdfViewer from "./PdfViewer";

const MainContent = () => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage =
      (localStorage.getItem("language") as Language) || "en";
    setLanguage(savedLanguage);
  }, []);

  const introText = translations[language].intro;
  const periodIndex = introText.indexOf(".") + 1;
  const firstPart = introText.slice(0, periodIndex).trim();
  const secondPart = introText.slice(periodIndex).trim();

  return (
    <div>
      <div className="lg:flex mb-8">
        <aside className="lg:w-2/6 lg:sticky lg:top-4 lg:h-screen">
          <section id="intro">
            <Intro />
          </section>
        </aside>

        <div className="lg:w-4/6">
          <section id="about" className="mb-10 mt-12 lg:mt-0">
            <h2 className="text-2xl font-bold text-start mb-2">
              {translations[language].about}
            </h2>
            <div className="mb-10 sm:mb-0 text-sm bg-black dark:bg-slate-50 text-slate-50 dark:text-black p-4 rounded-lg shadow lg:w-full shadow-[5px_23px_91px_39px_rgba(27,_25,_30,_0.19)] dark:shadow-[5px_23px_91px_39px_rgba(218,_194,_232,_0.19)]">
              <p>
                {firstPart.split("Raphael").map((part, index) =>
                  index === 0 ? (
                    part
                  ) : (
                    <React.Fragment key={index}>
                      <strong>Raphael</strong>
                      {part}
                    </React.Fragment>
                  )
                )}
              </p>
              <p>{secondPart}</p>
              <p>{translations[language].about_text}</p>
            </div>
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

          <section id="technologies" className="lg:w-full mb-10">
            <h2 className="text-2xl font-bold text-start mb-2">Technologies</h2>
          </section>

          <section id="wrapped" className="lg:w-full mb-10">
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

          <section id="resume" className="lg:w-full mb-10">
            <h2 className="text-2xl font-bold text-start mb-2">Resume</h2>
            <PdfViewer />
          </section>

          <section id="hobbies" className="lg:w-full mb-10">
            <h2 className="text-2xl font-bold text-start mb-2">Hobbies</h2>
          </section>

          <section id="spotify" className="lg:w-full mb-10">
            <h2 className="text-2xl font-bold text-start mb-2">Spotify</h2>
            <Spotify />
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainContent;
