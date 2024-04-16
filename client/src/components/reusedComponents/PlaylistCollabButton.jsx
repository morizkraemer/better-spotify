import React from "react";
import { useSpotifyApi } from "../../context/SpotifyApiContext";

export default function PlaylistCollabButton({
  isCollab,
  id,
  withLink = false,
}) {
  const { spotifyApi } = useSpotifyApi();
  async function handleClick() {
    if (withLink) {
      try {
        const response = await spotifyApi.changePlaylistDetails(id, {
          collab: !isCollab,
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
      className={!isCollab ? "stroke-neutral-500" : "stroke-sgreen"}
      onClick={handleClick}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M5 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M19 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M12 14m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M12 7l0 4" />
      <path d="M6.7 17.8l2.8 -2" />
      <path d="M17.3 17.8l-2.8 -2" />
    </svg>
  );
}
