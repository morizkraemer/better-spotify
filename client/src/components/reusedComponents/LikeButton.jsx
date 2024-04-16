import React, { useState, useEffect } from "react";
import { useSpotifyApi } from "../../context/SpotifyApiContext";

export default function LikeButton({ artistId }) {
  const { spotifyApi } = useSpotifyApi();
  const [liked, setLiked] = useState();

  useEffect(() => {
    getFollowStatus();
  }, [artistId]);

  async function getFollowStatus() {
    try {
      const response = await spotifyApi.isFollowingArtists([artistId]);
      setLiked(response?.body[0]);
    } catch (error) {
      console.log(error);
    }
  }
  async function follow() {
    try {
      await spotifyApi.followArtists([artistId]);
      getFollowStatus();
    } catch (error) {
      console.log(error);
    }
  }

  async function unfollow() {
    try {
      await spotifyApi.unfollowArtists([artistId]);
      getFollowStatus();
    } catch (error) {
      console.log(error);
    }
  }

  function handleClick() {
    if (liked === true) {
      unfollow();
    }
    if (liked === false) {
      follow();
    }
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      className={liked ? "fill-sgreen stroke-sgreen" : "stroke-white"}
      onClick={handleClick}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
    </svg>
  );
}
