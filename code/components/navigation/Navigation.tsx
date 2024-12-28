import { useEffect, useState } from "react";
import NavigationItem from "./NavigationItem";
import { Language, translations } from "@/services/translations";

export default function Navigation() {
    const [language, setLanguage] = useState<Language>("en");
    
      useEffect(() => {
        const savedLanguage =
          (localStorage.getItem("language") as Language) || "en";
        setLanguage(savedLanguage);
      }, []);
      
    return (
        <nav>
            <ul className="hidden lg:grid grid-cols-2">
                <NavigationItem section="about" title={translations[language].about}/>
                <NavigationItem section="experience" title={translations[language].experience}/>
                <NavigationItem section="education" title={translations[language].education}/>
                <NavigationItem section="featured-projects" title={translations[language].projects}/>
                <NavigationItem section="technologies" title={translations[language].technologies}/>
                <NavigationItem section="wrapped" title="Github Wrapped"/>
                <NavigationItem section="resume" title={translations[language].resume}/>
                <NavigationItem section="hobbies" title="Hobbies*"/>
                <NavigationItem section="spotify" title="Spotify"/>
            </ul>
        </nav>
    );
}