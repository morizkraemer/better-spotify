import React from "react";
import { usePlayerStore } from "../../stores/playerStore";

export default function PlayButton({ uri }) {
  const setPlayingTrack = usePlayerStore((state) => state.setPlayingTrack);
  const playingTrack = usePlayerStore((state) => state.playingTrack);
  return (
    <button
      onClick={() => {
        setPlayingTrack(uri);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={
          playingTrack === uri ? "stroke-sgreen" : "stroke-neutral-300"
        }
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M7 4v16l13 -8z" />
      </svg>
    </button>
  );
}
