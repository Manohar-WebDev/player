import React from "react";
//import { playAudio } from "../util";

const LibrarySong = ({
  song,
  setCurrentSong,
  songs,
  id,
  audioRef,
  isPlaying,
  setIsPlaying,
  setSongs,
  currentSong,
}) => {
  const playSongHandler = async () => {
    //console.log(song);

    await setCurrentSong(song);
    audioRef.current.play();
    if (isPlaying === false) {
      setIsPlaying(!isPlaying);
    }
    song.active = true;
    const inActiveSong = songs.filter((selectedSong) => selectedSong !== song);
    inActiveSong.map((s) => (s.active = false));
    //playAudio(isPlaying, audioRef);
    //playAudio(isPlaying, audioRef, songs, song, setIsPlaying);
  };
  //className={`library-song ${song.id === currentSong.id ? "selected" : ""} `} this will also works

  return (
    <div
      onClick={playSongHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.name} />

      <div className="song-Info">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
