import React, { useEffect, useState } from "react";
import { useSpotifyApi } from "../context/SpotifyApiContext";
import SpotifyWebPlayer from "react-spotify-web-playback";
import { usePlayer } from "../context/PlayerContext";

export default function Player() {
  const { playingTrack } = usePlayer();
  const [playing, setPlaying] = useState(false);
  const { accessToken } = useSpotifyApi();

  useEffect(() => setPlaying(true), [playingTrack]);

  const playerStyle = {
    activeColor: "#fff",
    bgColor: "#141414",
    color: "#fff",
    loaderColor: "#fff",
    sliderColor: "#1cb954",
    sliderHandleColor: "#fff",
    trackArtistColor: "#ccc",
    trackNameColor: "#fff",
  };
  return (
    <SpotifyWebPlayer
      token={accessToken}
      hideAttribution={true}
      styles={playerStyle}
      callback={(state) => {
        if (state.isPlaying) setPlaying(false);
      }}
      play={playing}
      uris={playingTrack ? [playingTrack] : []}
    />
  );
}
