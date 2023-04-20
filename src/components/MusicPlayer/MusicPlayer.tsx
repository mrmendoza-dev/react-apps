import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import { icons } from "../../assets/icons";
import "./MusicPlayer.scss";

function MusicPlayer() {
      const audioRef: any = useRef(null);
      const [isPlaying, setIsPlaying] = useState(false);
      const [currentSong, setCurrentSong] = useState(0);

      const songs = ["./songs/a-real-hero.mp3", "./songs/paradise-circus.mp3", "./songs/spaceflight.mp3"];

      useEffect(() => {
        if (isPlaying) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      }, [isPlaying]);

      const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
      };

      const handleNextSong = () => {
        setCurrentSong((prevSong) => (prevSong + 1) % songs.length);
        setIsPlaying(true);
      };

      const handlePreviousSong = () => {
        setCurrentSong((prevSong) =>
          prevSong === 0 ? songs.length - 1 : prevSong - 1
        );
        setIsPlaying(true);
      };

  return (
    <div className="MusicPlayer">
      <h2>MusicPlayer</h2>
      <audio ref={audioRef} src={songs[currentSong]} />
      <div className="controls">
        <button onClick={handlePreviousSong}>
          <FontAwesomeIcon icon={icons.faBackward} />
        </button>
        <button onClick={handlePlayPause}>
          <FontAwesomeIcon icon={isPlaying ? icons.faPause : icons.faPlay} />
        </button>
        <button onClick={handleNextSong}>
          <FontAwesomeIcon icon={icons.faForward} />
        </button>
      </div>
    </div>
  );
}

export default MusicPlayer;
