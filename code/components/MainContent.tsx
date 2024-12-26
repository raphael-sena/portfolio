"use client";

import { useEffect, useState } from "react";
import FeaturedProjects from "./FeaturedProjects";
import Footer from "./Footer";
import Intro from "./Intro";
import { Language, translations } from "@/services/translations";

const MainContent = () => {
  const [language, setLanguage] = useState<Language>("en");
  
    useEffect(() => {
      const savedLanguage =
        (localStorage.getItem("language") as Language) || "en";
      setLanguage(savedLanguage);
    }, []);
    
  return (
    <div>
      <div className="lg:flex">
        <aside className="lg:w-2/3">
          <section id="intro">
            <Intro />
          </section>
        </aside>
        <section id="featured-projects" className="lg:w-full">
          <h2 className="text-2xl font-bold text-start mb-4">
            {translations[language].featured}
          </h2>
          <FeaturedProjects />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default MainContent;
