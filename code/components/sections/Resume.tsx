import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

const Resume = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div className="w-full h-[450px] sm:h-[500px] lg:h-[600px] border-4 rounded-xl">
        <Viewer
          fileUrl="/Currículo_Raphael_Sena.pdf"
          plugins={[defaultLayoutPluginInstance]}
        />
      </div>
    </Worker>
  );
};

export default Resume;
