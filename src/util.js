export const nextPrevSongHandler = (nextprev, setCurrentSong, songs) => {
  //console.log(nextprev.active);
  nextprev.active = true;
  setCurrentSong(nextprev);
  //console.log(nextprev);
  const inActiveSong = songs.filter(
    (selectedSong) => selectedSong !== nextprev
  );
  inActiveSong.map((s) => (s.active = false));
  //THIS IS ED's CODE
  // const newSongs = songs.map((song) => {
  //   if (song.id === currentSong.id) {
  //     return {
  //       ...song,

  //       active: true,
  //     };
  //   } else {
  //     return {
  //       ...song,
  //       active: false,
  //     };
  //   }
  // });

  // setSongs(newSongs);
  // playAudio(isPlaying, audioRef, songs, currentSong, setIsPlaying);
};
