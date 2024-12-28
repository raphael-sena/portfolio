import axios from "axios";

export const getChessUser = async (username: string) => {
    try {
      const { data } = await axios.get(`https://api.chess.com/pub/player/${username}`);
      return data;
    } catch (error) {
      throw new Error("Erro getting player data: " + error);
    }
  };

  export const getChessUserStats = async (username: string) => {
    try {
      const { data } = await axios.get(`https://api.chess.com/pub/player/${username}/stats`);
      return data;
    } catch (error) {
      throw new Error("Erro getting player stats data: " + error);
    }
  };