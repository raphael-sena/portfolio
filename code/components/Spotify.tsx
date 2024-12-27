import Link from "next/link";

export default function Spotify() {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 justify-center items-center gap-6">
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

      <img className="transition-transform duration-300 hover:scale-105 mx-auto" alt="Spotify list" width="250px" height="270px" src="https://spotify-recently-played-readme.vercel.app/api?user=sena_31&count=9"/>


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
  );
}
