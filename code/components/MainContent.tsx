"use client";

import { useEffect, useState } from "react";
import Footer from "./sections/Footer";
import { Language, translations } from "@/services/translations";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Technologies from "./sections/Technologies";
import { useInView } from "react-intersection-observer";
import Intro from "./sections/Intro";
import FeaturedProjects from "./sections/FeaturedProjects";
import Hobbies from "./sections/Hobbies";
import Extracurricular from "./sections/Extracurricular";
import Resume from "./sections/Resume";

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

  const { ref: introRef, inView: introInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const { ref: experienceRef, inView: experienceInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { ref: experienceRef1, inView: experienceInView1 } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });
  const { ref: educationRef, inView: educationInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const { ref: featuredRef, inView: featuredInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: technologiesRef, inView: technologiesInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div>
      <div className="lg:flex mb-8">
        <aside className="lg:w-2/6 lg:sticky md:top-8 lg:h-[calc(100vh-2rem)] lg:overflow-y-auto">
          <section
            id="intro"
            className={`transition-opacity duration-1000 ${
              introInView ? "opacity-100" : "opacity-0"
            }`}
            ref={introRef}
          >
            <Intro />
          </section>
        </aside>

        <div className="lg:w-4/6">
          <section
            id="about"
            className={`mb-10 mt-12 lg:mt-0 transition-opacity duration-1000 ${
              aboutInView ? "opacity-100" : "opacity-0"
            }`}
            ref={aboutRef}
          >
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

          <section
            id="experience"
            className={`lg:hidden mb-10 transition-opacity duration-1000 ${
              experienceInView ? "opacity-100" : "opacity-0"
            }`}
            ref={experienceRef}
          >
            <h2 className="text-2xl font-bold text-start mb-2">
              {translations[language].experience}
            </h2>
            <Experience />
          </section>

          <section
            id="experience"
            className={`hidden lg:block mb-10 transition-opacity duration-1000 ${
              experienceInView1 ? "opacity-100" : "opacity-0"
            }`}
            ref={experienceRef1}
          >
            <h2 className="text-2xl font-bold text-start mb-2">
              {translations[language].experience}
            </h2>
            <Experience />
          </section>

          <section
            id="education"
            className={`mb-10 transition-opacity duration-1000 ${
              educationInView ? "opacity-100" : "opacity-0"
            }`}
            ref={educationRef}
          >
            <h2 className="text-2xl font-bold text-start mb-2">
              {translations[language].education}
            </h2>
            <Education />
          </section>

          <section id="extracurricular" className="mb-10">
            <h2 className="text-2xl font-bold text-start mb-2">
              {translations[language].extracurricular}
            </h2>
            <Extracurricular />
          </section>

          <section
            id="featured-projects"
            className={`lg:w-full mb-12 transition-opacity duration-1000 ${
              featuredInView ? "opacity-100" : "opacity-0"
            }`}
            ref={featuredRef}
          >
            <h2 className="text-2xl font-bold text-start mb-2">
              {translations[language].featured}
            </h2>
            <FeaturedProjects />
          </section>

          <section
            id="technologies"
            className={`lg:w-full mb-10 transition-opacity duration-1000 ${
              technologiesInView ? "opacity-100" : "opacity-0"
            }`}
            ref={technologiesRef}
          >
            <h2 className="text-2xl font-bold text-start mb-6">
              {translations[language].technologies}
            </h2>
            <Technologies />
          </section>

          <section id="wrapped" className="lg:w-full mb-10">
            <h2 className="text-2xl font-bold text-start mb-4 hover:bg-gradient-to-r hover:from-violet-700 hover:via-rose-800 hover:to-red-300 hover:bg-clip-text hover:text-transparent hover:cursor-default">
              Github Wrapped 2024
            </h2>
            <Link
              href="https://git-wrapped.com/profiles/raphael-sena"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="md:hidden rounded-2xl transition-shadow duration-300 ease-in-out md:hover:shadow-[0_0_15px_10px_rgba(0,0,0,0.7)]"
                width={1200}
                height={1200}
                src="/images/git-wrapped-raphael-sena-mobile.png"
                alt="Logo Pucminas White"
              />
              <Image
                className="hidden md:flex rounded-2xl transition-shadow duration-300 ease-in-out md:hover:shadow-[0_0_15px_10px_rgba(0,0,0,0.7)]"
                width={1200}
                height={1200}
                src="/images/git-wrapped-raphael-sena.png"
                alt="Logo Pucminas White"
              />
            </Link>
          </section>

          <section id="resume" className="lg:w-full mb-10">
            <h2 className="text-2xl font-bold text-start mb-2">
              {translations[language].resume}
            </h2>
            <Resume />
          </section>

          <section id="hobbies" className="lg:w-full mb-10 space-y-6">
            <h2 className="text-2xl font-bold text-start mb-2">Hobbies</h2>
            <Hobbies />
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainContent;
