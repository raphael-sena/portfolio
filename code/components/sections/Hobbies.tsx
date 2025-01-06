import { useInView } from "react-intersection-observer";
import Chess from "../Chess";
import Spotify from "../Spotify";

const Hobbies = () => {
  const { ref: chessRef, inView: chessInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: spotifyRef, inView: spotifyInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  return (
    <div className="space-y-8">
      <div
        id="chess"
        className={`transition-opacity duration-1000 ${
          chessInView ? "opacity-100" : "opacity-0"
        }`}
        ref={chessRef}
      >
        <Chess />
      </div>
      <div
        id="chess"
        className={`transition-opacity duration-1000 ${
          spotifyInView ? "opacity-100" : "opacity-0"
        }`}
        ref={spotifyRef}
      >
        <Spotify />
      </div>
    </div>
  );
};

export default Hobbies;
