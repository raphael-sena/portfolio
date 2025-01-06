import { Language, translations } from "@/services/translations";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { FaLink, FaLinkedinIn } from "react-icons/fa";
import AluraJava from "./extracurricular/alura/AluraJava";
import AluraJavascript from "./extracurricular/alura/AluraJavascript";
import UdemyJava from "./extracurricular/udemy/UdemyJava";
import RedhatSysAdmin from "./extracurricular/redhat/SysAdminI";

const Extracurricular = () => {
  const [language, setLanguage] = useState<Language>("en");

  const { ref: extracurricularRef1, inView: extracurricularInView1 } =
    useInView({
      triggerOnce: true,
      threshold: 0.2,
    });

    const { ref: extracurricularRef2, inView: extracurricularInView2 } =
    useInView({
      triggerOnce: true,
      threshold: 0.2,
    });

    const { ref: extracurricularRef3, inView: extracurricularInView3 } =
    useInView({
      triggerOnce: true,
      threshold: 0.2,
    });

    const { ref: extracurricularRef4, inView: extracurricularInView4 } =
    useInView({
      triggerOnce: true,
      threshold: 0.2,
    });

  useEffect(() => {
    const savedLanguage =
      (localStorage.getItem("language") as Language) || "en";
    setLanguage(savedLanguage);
  }, []);

  return (
    <div className="space-y-2 lg:space-y-0 lg:grid grid-cols-2 lg:gap-2 ">
      {/* Redhat System Administrator I */}
      <div  
        id="extracurricular"
        className={`glass-card bg-black dark:bg-slate-50 sm:gap-2 p-4 rounded-lg text-slate-50 dark:text-black lg:opacity-60 lg:hover:opacity-100 lg:transition-opacity lg:duration-300 transition-opacity duration-1000 ${
          extracurricularInView1 ? "opacity-100" : "opacity-0"
        }`}
        ref={extracurricularRef1}
      >
        <div className="flex mb-2">
          <div className="w-full text-lg flex items-center mr-4 md:mr-2">
            <Image
              className="mr-2 w-12 transform transition-transform duration-300 hover:scale-110 rounded-md"
              width={1500}
              height={1500}
              src="/images/education/redhat.png"
              alt="Agência Experimental de Software"
            />
            <div>
              <h1 className="text-md font-bold tracking-tighter">Redhat</h1>
              <h2 className="text-sm font-semibold">
                {translations[language].may} - 2024
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="https://www.redhat.com/pt-br/services/training/rh124-red-hat-system-administration-i"
              className="transform transition-transform duration-300 hover:scale-110"
              target="_blank"
            >
              <FaLink />
            </Link>
            <Link
              href="https://www.linkedin.com/company/red-hat/"
              className="transform transition-transform duration-300 hover:scale-110"
              target="_blank"
            >
              <FaLinkedinIn />
            </Link>
          </div>
        </div>

        <div>
          <div className="mb-2">
            <RedhatSysAdmin />
          </div>
        </div>
      </div>

      {/* Udemy Java */}
      <div
        id="extracurricular"
        className={`glass-card bg-black dark:bg-slate-50 sm:gap-2 p-4 rounded-lg text-slate-50 dark:text-black lg:opacity-60 lg:hover:opacity-100 lg:transition-opacity lg:duration-300 transition-opacity duration-1000 ${
          extracurricularInView2 ? "opacity-100" : "opacity-0"
        }`}
        ref={extracurricularRef2}
      >
        <div className="flex mb-2">
          <div className="w-full text-lg flex items-center mr-4 md:mr-2">
            <Image
              className="mr-2 w-12 transform transition-transform duration-300 hover:scale-110 rounded-md"
              width={1500}
              height={1500}
              src="/images/education/udemy.webp"
              alt="Agência Experimental de Software"
            />
            <div>
              <h1 className="text-md font-bold tracking-tighter">Udemy</h1>
              <h2 className="text-sm font-semibold">
                {translations[language].december} - 2023
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="https://www.udemy.com/course/java-curso-completo/"
              className="transform transition-transform duration-300 hover:scale-110"
              target="_blank"
            >
              <FaLink />
            </Link>
            <Link
              href="https://www.linkedin.com/company/udemy/"
              className="transform transition-transform duration-300 hover:scale-110"
              target="_blank"
            >
              <FaLinkedinIn />
            </Link>
          </div>
        </div>

        <div>
          <div className="mb-2">
            <UdemyJava />
          </div>
        </div>
      </div>

      {/* Alura Java */}
      <div
        id="extracurricular"
        className={`glass-card bg-black dark:bg-slate-50 sm:gap-2 p-4 rounded-lg text-slate-50 dark:text-black lg:opacity-60 lg:hover:opacity-100 lg:transition-opacity lg:duration-300 transition-opacity duration-1000 ${
          extracurricularInView3 ? "opacity-100" : "opacity-0"
        }`}
        ref={extracurricularRef3}
      >
        <div className="flex mb-2">
          <div className="w-full text-lg flex items-center mr-4 md:mr-2">
            <Image
              className="mr-2 transform transition-transform duration-300 hover:scale-110 rounded-md"
              width={45}
              height={45}
              src="/images/education/alura.jpeg"
              alt="Agência Experimental de Software"
            />
            <div>
              <h1 className="text-md font-bold tracking-tighter">Alura</h1>
              <h2 className="text-sm font-semibold">
                {translations[language].december} - 2023
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="https://cursos.alura.com.br/formacao-java"
              className="transform transition-transform duration-300 hover:scale-110"
              target="_blank"
            >
              <FaLink />
            </Link>
            <Link
              href="https://www.linkedin.com/school/aluracursos/posts/?feedView=all"
              className="transform transition-transform duration-300 hover:scale-110"
              target="_blank"
            >
              <FaLinkedinIn />
            </Link>
          </div>
        </div>

        <div>
          <div className="mb-2">
            <AluraJava />
          </div>
        </div>
      </div>

      {/* Alura Javascript */}
      <div
        id="extracurricular"
        className={`glass-card bg-black dark:bg-slate-50 sm:gap-2 p-4 rounded-lg text-slate-50 dark:text-black lg:opacity-60 lg:hover:opacity-100 lg:transition-opacity lg:duration-300 transition-opacity duration-1000 ${
          extracurricularInView4 ? "opacity-100" : "opacity-0"
        }`}
        ref={extracurricularRef4}
      >
        <div className="flex mb-2">
          <div className="w-full text-lg flex items-center mr-4 md:mr-2">
            <Image
              className="mr-2 transform transition-transform duration-300 hover:scale-110 rounded-md"
              width={45}
              height={45}
              src="/images/education/alura.jpeg"
              alt="Agência Experimental de Software"
            />
            <div>
              <h1 className="text-md font-bold tracking-tighter">Alura</h1>
              <h2 className="text-sm font-semibold">Nov - 2021</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="https://cursos.alura.com.br/formacao-js-backend-v210587"
              className="transform transition-transform duration-300 hover:scale-110"
              target="_blank"
            >
              <FaLink />
            </Link>
            <Link
              href="https://www.linkedin.com/school/aluracursos/posts/?feedView=all"
              className="transform transition-transform duration-300 hover:scale-110"
              target="_blank"
            >
              <FaLinkedinIn />
            </Link>
          </div>
        </div>

        <div>
          <div className="mb-2">
            <AluraJavascript />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Extracurricular;
