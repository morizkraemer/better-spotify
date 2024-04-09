import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSpotifyApi } from "../context/SpotifyApiContext";
import Playlist from "./Playlist";

export default function Playlists() {
  const { spotifyApi } = useSpotifyApi();
  const [playlists, setPlaylists] = useState([]);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [allPlaylistsLoaded, setAllPlaylistsLoaded] = useState(false);
  const containerRef = useRef(null);
  const limit = 50;

  const fetchUserPlaylists = useCallback(async () => {
    try {
      const fetchedPlaylists = await spotifyApi.getUserPlaylists("", {
        limit,
        offset,
      });
      if (fetchedPlaylists.body.length < limit) {
        setAllPlaylistsLoaded(true);
      }
      setPlaylists((prev) => [...prev, ...fetchedPlaylists.body.items]);
      setOffset((previous) => (previous += limit));
    } catch (error) {
      console.error(error);
    }
  }, [offset]);

  useEffect(() => {
    function handleScroll() {
      const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5 && !allPlaylistsLoaded) {
        fetchUserPlaylists();
      }
    }
    containerRef.current.addEventListener("scroll", handleScroll);

    return () => {
      containerRef.current.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef.current, allPlaylistsLoaded, fetchUserPlaylists]);

  useEffect(() => {
    fetchUserPlaylists();
  }, [spotifyApi]);

  return (
    <div className="w-1/5 flex flex-col max-w-full h-full gap-2 ">
      <input
        type="text"
        className="bg-black border h-8 p-2 "
        placeholder="Search Playlists"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div ref={containerRef} className="flex flex-col gap-1 overflow-y-scroll">
        {playlists && playlists.length > 0 ? (
          playlists
            .filter(
              (p) =>
                !search || p.name.toLowerCase().includes(search.toLowerCase()),
            )
            .map((playlist) => (
              <Playlist key={playlist.id} playlist={playlist} />
            ))
        ) : (
          <div>Loading Playlists...</div>
        )}
      </div>
    </div>
  );
}
