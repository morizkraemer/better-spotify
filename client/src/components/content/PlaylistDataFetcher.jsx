import { useEffect, useState } from "react";
import { useSpotifyApi } from "../../context/SpotifyApiContext";
import PlaylistView from "./PlaylistView";
import { prepareTracklist } from "../../hooks/prepareTracklist";
import MoonLoader from "react-spinners/MoonLoader";
import LoaderSpinner from "../reusedComponents/LoaderSpinner";

export default function PlaylistContent({ playlistId }) {
  const { spotifyApi } = useSpotifyApi();
  const [playlist, setPlaylist] = useState(null);

  const fetchPlaylistTracks = async () => {
    setPlaylist(null);
    const playlistResponse = await spotifyApi.getPlaylist(playlistId);
    setPlaylist(await prepareTracklist(playlistResponse, spotifyApi));
  };

  useEffect(() => {
    fetchPlaylistTracks();
  }, [playlistId]);

  return playlist ? (
    <>
      <PlaylistView playlist={playlist} />
    </>
  ) : (
    <LoaderSpinner />
  );
}
