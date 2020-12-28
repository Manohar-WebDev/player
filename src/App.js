import React, { useState, useRef } from "react";
//Adding components
import Player from "./components/Player";
import Song from "./components/Song";
import "./styles/App.scss";
import data from "./data";
import Library from "./components/Library";
import Nav from "./components/Nav";
import { nextPrevSongHandler } from "./util";

function App() {
  //State usage
  const [songs, setSongs] = useState(data);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  //UseRef usage
  const audioRef = useRef(null);

  //Function
  const onSongEndHandler = async () => {
    const indexes = songs.map((nextSong, index) => {
      return {
        index,
        id: nextSong.id,
      };
    });
    //currentSong.active = true;
    //console.log(indexes);
    const valueSong = indexes.filter(
      (presentSong) => presentSong.id === currentSong.id
    );

    const autoSkipForward = (valueSong[0].index + 1) % songs.length;
    if (autoSkipForward < songs.length) {
      await setCurrentSong(songs[autoSkipForward]);
      nextPrevSongHandler(songs[autoSkipForward], setCurrentSong, songs);
      if (songs[autoSkipForward].active) {
        setIsPlaying(true);
        audioRef.current.play();
      }
    }
  };

  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(currentTime);
    const roundedDuration = Math.round(duration);
    const animate = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({
      ...setSongInfo,
      currentTime,
      duration,
      animationPercentage: animate,
    });
  };
  return (
    <div
      // onClick={`${libraryStatus === false ? "" : "minimise"}`}
      className={`App ${libraryStatus ? "library-active" : ""}`}
    >
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        libraryStatus={libraryStatus}
      />
      <Player
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
      />
      <Library
        audioRef={audioRef}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        currentSong={currentSong}
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={onSongEndHandler}
      ></audio>
    </div>
  );
}

export default App;
