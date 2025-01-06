import { Language, translations } from "@/services/translations";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const RedhatSysAdmin = () => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage =
      (localStorage.getItem("language") as Language) || "en";
    setLanguage(savedLanguage);
  }, []);

  return (
    <div>
      <div className="mb-2 w-full">
        <Link
          href={translations[language].redhat_sysadmin_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative rounded-md hover:shadow-lg dark:hover:shadow-xl"
        >
          <Image
            className="rounded-md lg:cursor-pointer"
            src={translations[language].redhat_sysadmin_jpg}
            width={1176}
            height={794}
            alt="Red Hat System Admin Certificate"
          />
        </Link>
      </div>

      <div className="ml-2">
        <h2 className="mb-1 font-semibold text-md">
          {translations[language].skills}
        </h2>
        <ul className="flex flex-wrap" aria-label="Technologies used">
          <li className="mr-1.5 mt-2">
            <div className="flex items-center rounded-full bg-red-400/20 dark:bg-red-500/10 px-3 py-1 text-xs font-medium leading-5 text-red-200 dark:text-red-400">
              Linux
            </div>
          </li>
          <li className="mr-1.5 mt-2">
            <div className="flex items-center rounded-full bg-red-400/20 dark:bg-red-500/10 px-3 py-1 text-xs font-medium leading-5 text-red-200 dark:text-red-400">
              Shell
            </div>
          </li>
          <li className="mr-1.5 mt-2">
            <div className="flex items-center rounded-full bg-red-400/20 dark:bg-red-500/10 px-3 py-1 text-xs font-medium leading-5 text-red-200 dark:text-red-400">
              SO Management
            </div>
          </li>
          <li className="mr-1.5 mt-2">
            <div className="flex items-center rounded-full bg-red-400/20 dark:bg-red-500/10 px-3 py-1 text-xs font-medium leading-5 text-red-200 dark:text-red-400">
              SSH
            </div>
          </li>
          <li className="mr-1.5 mt-2">
            <div className="flex items-center rounded-full bg-red-400/20 dark:bg-red-500/10 px-3 py-1 text-xs font-medium leading-5 text-red-200 dark:text-red-400">
              Red Hat Enterprise Linux
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RedhatSysAdmin;
