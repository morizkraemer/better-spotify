import React from "react";
import { useSpotifyApi } from "../../context/SpotifyApiContext";

export default function PlaylistPublicButton({
  isPublic,
  id,
  withLink = false,
}) {
  const { spotifyApi } = useSpotifyApi();
  async function handleClick() {
    if (withLink) {
      try {
        const response = await spotifyApi.changePlaylistDetails(id, {
          public: !isPublic,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      className={isPublic ? "stroke-neutral-500" : "stroke-sgreen"}
      onClick={handleClick}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
      <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
      <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
    </svg>
  );
}
