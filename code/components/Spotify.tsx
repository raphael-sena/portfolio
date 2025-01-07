import { Language, translations } from "@/services/translations";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Spotify() {
  const [language, setLanguage] = useState<Language>("en");
  const [imageUrls, setImageUrls] = useState({
    profile: "https://spotify-github-profile.kittinanx.com/api/view?uid=sena_31&cover_image=true&theme=default&show_offline=false&background_color=121212&interchange=false&bar_color_cover=false",
    recentlyPlayed: "https://spotify-recently-played-readme.vercel.app/api?user=sena_31&count=9",
    lastFm: "https://lastfm-recently-played.vercel.app/api?user=raphael_sena&width=400",
  });

  useEffect(() => {
    const savedLanguage =
      (localStorage.getItem("language") as Language) || "en";
    setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageUrls({
        profile: `https://spotify-github-profile.kittinanx.com/api/view?uid=sena_31&cover_image=true&theme=default&show_offline=false&background_color=121212&interchange=false&bar_color_cover=false&t=${Date.now()}`,
        recentlyPlayed: `https://spotify-recently-played-readme.vercel.app/api?user=sena_31&count=9&t=${Date.now()}`,
        lastFm: `https://lastfm-recently-played.vercel.app/api?user=raphael_sena&width=400&t=${Date.now()}`,
      });
    }, 5000);

    return () => clearInterval(interval);
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
            unoptimized={true}
          />
          <h1 className="text-lg font-semibold">Spotify</h1>
        </div>
        <p className="mb-4">{translations[language].spotify_text}</p>
      </div>
      <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 justify-center items-top gap-4">
        <Link
          href="https://spotify-github-profile.kittinanx.com/api/view?uid=sena_31&redirect=true"
          target="_blank"
          rel="noopener noreferrer"
          className="sm:transition-transform sm:duration-300 sm:hover:scale-105 w-full"
        >
          <img
            src={imageUrls.profile}
            alt="Spotify Profile"
            className="rounded-lg shadow-lg w-full mb-3 sm:mb-0"
          />
        </Link>

        <img
          className="sm:transition-transform sm:duration-300 sm:hover:scale-105 rounded-lg shadow-lg w-full mb-3 sm:mb-0"
          alt="Spotify list"
          width="250px"
          height="270px"
          src={imageUrls.recentlyPlayed}
        />

        <Link href="https://www.last.fm/pt/user/raphael_sena" target="_blank">
          <img
            width="400px"
            height="270px"
            alt="lastfm"
            src={imageUrls.lastFm}
            className="sm:transition-transform sm:duration-300 sm:hover:scale-105 rounded-lg shadow-lg w-full"
          />
        </Link>
      </div>
    </div>
  );
}