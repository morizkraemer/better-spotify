import React, { createContext, useContext, useState } from "react";

const PlayerContext = createContext();

export function usePlayer() {
  return useContext(PlayerContext);
}

export function PlayerProvider({ children }) {
  const [playingTrack, setPlayingTrack] = useState();

  const value = { playingTrack, setPlayingTrack };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}
