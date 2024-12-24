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
      <Intro />
      <section id="featured-projects">
        <h2 className="text-2xl font-bold text-start mb-4">
          {translations[language].featured}
        </h2>
        <FeaturedProjects />
      </section>
      <Footer />
    </div>
  );
};

export default MainContent;
