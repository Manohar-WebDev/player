import React from "react";
//below are the different components we can import into our components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//below we import icons
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { nextPrevSongHandler } from "../util";

const Player = ({
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setSongs,
}) => {
  const playSongHandler = (e) => {
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
      currentSong.active = true;
    } else {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    }
  };

  //Format Time Function

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    // console.log(e.target.value);
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = async (direction) => {
    //console.log(currentSong);
    //console.log(songs.length);
    //console.log(direction);
    // You can also use FINDINDEX, returns index

    const indexes = songs.map((nextSong, index) => {
      return {
        index,
        id: nextSong.id,
      };
    });
    //console.log(indexes);
    const valueSong = indexes.filter(
      (presentSong) => presentSong.id === currentSong.id
    );
    //  playAudio(isPlaying, audioRef);
    if (direction === "skip-forward") {
      const skipForward = (valueSong[0].index + 1) % songs.length;
      //console.log(skipForward);
      if (skipForward < songs.length) {
        await setCurrentSong(songs[skipForward]);
        nextPrevSongHandler(songs[skipForward], setCurrentSong, songs);

        // console.log(currentSong);
        if (songs[skipForward].active) {
          setIsPlaying(true);
          audioRef.current.play();
        }
      }
    } else {
      const skipBackward = valueSong[0].index - 1;
      if (skipBackward >= 0) {
        await setCurrentSong(songs[skipBackward]);
        nextPrevSongHandler(songs[skipBackward], setCurrentSong, songs);

        if (songs[skipBackward].active) {
          setIsPlaying(true);
          audioRef.current.play();
        }
      }
    }
    // console.log(valueSong[0].index + 1);
  };
  //style
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  // Controlled and uncontrolled input is REACT TERMS of saying like hooking a state to an input tag can be controlled where as no state means uncontrolled
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right,${currentSong.color[1]},${currentSong.color[0]})`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type="range"
            onChange={dragHandler}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0.00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => {
            skipTrackHandler("skip-backward");
          }}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          spin={true}
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => {
            skipTrackHandler("skip-forward");
          }}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
