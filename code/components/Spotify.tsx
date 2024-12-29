import { Language, translations } from "@/services/translations";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Spotify() {
  const [language, setLanguage] = useState<Language>("en");
  
    useEffect(() => {
      const savedLanguage =
        (localStorage.getItem("language") as Language) || "en";
      setLanguage(savedLanguage);
    }, []);
    
  return (
    <div className="ml-2">
      <div>
        <div className="flex items-center ml-1">
          <Image
            className="w-6 mr-1"
            src={"/images/spotify.gif"}
            width={500}
            height={500}
            alt="Spotify Animated Icon"
          />
          <h1 className="text-lg font-semibold">Spotify</h1>
        </div>
        <p className="mb-4">{translations[language].spotify_text}</p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 justify-center items-top gap-6">
        <Link
          href="https://spotify-github-profile.kittinanx.com/api/view?uid=sena_31&redirect=true"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-300 hover:scale-105 mx-auto"
        >
          <img
            src="https://spotify-github-profile.kittinanx.com/api/view?uid=sena_31&cover_image=true&theme=default&show_offline=false&background_color=121212&interchange=false&bar_color_cover=false"
            alt="Spotify Profile"
            className="rounded-lg shadow-lg"
          />
        </Link>

        <img
          className="transition-transform duration-300 hover:scale-105 mx-auto"
          alt="Spotify list"
          width="250px"
          height="270px"
          src="https://spotify-recently-played-readme.vercel.app/api?user=sena_31&count=9"
        />

        <Link href="https://www.last.fm/pt/user/raphael_sena" target="_blank">
          <img
            width="400px"
            height="270px"
            alt="lastfm"
            src="https://lastfm-recently-played.vercel.app/api?user=raphael_sena&width=400"
            className="transition-transform duration-300 hover:scale-105 rounded-lg shadow-lg mx-auto"
          />
        </Link>
      </div>
    </div>
  );
}
