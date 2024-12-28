import { getChessUser, getChessUserStats } from "@/services/chessService";
import { useEffect, useState } from "react";
import Image from "next/image";
import { BsLightningChargeFill } from "react-icons/bs";
import { GiBullets } from "react-icons/gi";
import { Language, translations } from "@/services/translations";

interface ChessUser {
  username: string;
  player_id: number;
  title?: string;
  status: string;
  name?: string;
  avatar?: string;
  location?: string;
  country: string;
  joined: number;
  last_online: number;
  followers: number;
  is_streamer: boolean;
  twitch_url?: string;
  fide?: number;
}

interface ChessStats {
  chess_rapid: {
    last: { rating: number; date: number; rd: number };
    best: { rating: number; date: number; game: string };
    record: { win: number; loss: number; draw: number };
  };
  chess_bullet: {
    last: { rating: number; date: number; rd: number };
    best: { rating: number; date: number; game: string };
    record: { win: number; loss: number; draw: number };
  };
  chess_blitz: {
    last: { rating: number; date: number; rd: number };
    best: { rating: number; date: number; game: string };
    record: { win: number; loss: number; draw: number };
  };
  tactics: {
    highest: { rating: number; date: number };
    lowest: { rating: number; date: number };
  };
  puzzle_rush: {
    best: { total_attempts: number; score: number };
  };
}

export default function Chess() {
  const [user, setUser] = useState<ChessUser | null>(null);
  const [stats, setStats] = useState<ChessStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage =
      (localStorage.getItem("language") as Language) || "en";
    setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getChessUser("raphael-sena");
        setUser(userData);

        const statsData = await getChessUserStats("raphael-sena");
        setStats(statsData);
      } catch (err) {
        setError("Erro ao carregar os dados.");
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="ml-2">
      <div>
        <h1 className="text-lg font-semibold">
        ♟️ {translations[language].chess}
        </h1>
        <p className="mb-4">{translations[language].chess_text}</p>
      </div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="space-y-2 text-black md:space-y-0 md:flex md:gap-4">
          <div className="md:w-1/2 glass-card p-4 m-0 chess1:m-auto chess2:m-auto rounded-lg bg-chess-green bg-chessboard bg-size-chessboard bg-position-chessboard md:transition-transform md:duration-300 md:hover:scale-105">
            {user && (
              <div className="bg-slate-50/70 p-2 rounded-md font-semibold">
                <div className="flex gap-2">
                  <div>
                    {user.avatar && (
                      <Image
                        className="max-w-[136px] rounded-sm"
                        src={user.avatar}
                        alt="Avatar"
                        width="500"
                        height="500"
                      />
                    )}
                  </div>
                  <div className="text-sm sm:text-md mx-auto">
                    <h1 className="mb-2 text-center text-xl">
                      {translations[language].profile}
                    </h1>
                    <p>Username: {user.username} </p>
                    <p>
                      {translations[language].name}: {user.name}
                    </p>
                    <p>
                      {translations[language].followers}: {user.followers}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="md:w-1/2 glass-card p-4 m-0 chess1:m-auto chess2:m-auto rounded-lg bg-chess-green bg-chessboard bg-size-chessboard bg-position-chessboard md:transition-transform md:duration-300 md:hover:scale-105">
            {stats && (
              <div className="bg-slate-50/70 p-2 rounded-md font-semibold ">
                <h2 className="text-center text-xl">
                  {translations[language].stats}
                </h2>
                <div className="text-black md:space-y-0 flex flex-wrap gap-2 justify-center">
                  <div className="text-sm">
                    <div className="text-yellow-600 flex items-center gap-1 justify-center">
                      <BsLightningChargeFill />
                      <h3 className="text-black text-lg">
                        {translations[language].rapid}
                      </h3>
                    </div>
                    <div className="flex gap-1">
                      <p>{translations[language].last_score}:</p>
                      <p className="font-bold text-md">
                        {stats.chess_rapid.last.rating}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <p>{translations[language].best_score}: </p>
                      <p className="font-bold text-md">
                        {stats.chess_rapid.best.rating}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <p>{translations[language].total_wins}: </p>
                      <p className="font-bold text-md">
                        {stats.chess_rapid.record.win}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <p>{translations[language].total_losses}: </p>
                      <p className="font-bold text-md">
                        {stats.chess_rapid.record.loss}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm">
                    <div className="text-black flex items-center gap-1 justify-center">
                      <GiBullets />
                      <h3 className="text-lg">Bullet</h3>
                    </div>
                    <div className="flex gap-1">
                      <p>{translations[language].last_score}:</p>
                      <p className="font-bold text-md">
                        {stats.chess_bullet.last.rating}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <p>{translations[language].best_score}: </p>
                      <p className="font-bold text-md">
                        {stats.chess_bullet.best.rating}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <p>{translations[language].total_wins}: </p>
                      <p className="font-bold text-md">
                        {stats.chess_bullet.record.win}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <p>{translations[language].total_losses}: </p>
                      <p className="font-bold text-md">
                        {stats.chess_bullet.record.loss}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
