import { Language, translations } from "@/services/translations";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { useEffect, useState } from "react";

const Resume = () => {

  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
      const savedLanguage =
        (localStorage.getItem("language") as Language) || "en";
      setLanguage(savedLanguage);
    }, []);
  

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
      <div className="w-full h-[450px] sm:h-[500px] lg:h-[600px] border-4 rounded-xl">
        <Viewer
          fileUrl={translations[language].resumeUrl}
          plugins={[defaultLayoutPluginInstance]}
        />
      </div>
    </Worker>
  );
};

export default Resume;
