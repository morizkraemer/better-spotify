import { useEffect, useState } from "react";
import { useSpotifyApi } from "../context/SpotifyApiContext";
import Track from "./Track";

export default function PlaylistContent({ playlistId }) {
  const { spotifyApi } = useSpotifyApi();
  const [playlist, setPlaylist] = useState(null);

  const fetchPlaylistTracks = async () => {
    const playlistResponse = await spotifyApi.getPlaylist(playlistId);

    //this is the solution for the rate limit on the api
    //
    // const anaylsisResponse = await spotifyApi.getAudioFeaturesForTracks(
    //   playlistResponse.body.tracks.items.map((t) => t.id),
    // );
    // console.log(anaylsisResponse);

    const { body } = playlistResponse;
    setPlaylist(body);
  };

  useEffect(() => {
    fetchPlaylistTracks();
  }, [playlistId]);

  return playlist ? (
    <>
      <span className="flex flex-col">
        <span className="text-4xl">{playlist?.name}</span>
        <span className="text-neutral-500">{playlist?.owner.display_name}</span>
      </span>
      <div className="flex-grow overflow-y-scroll">
        <table className="w-full">
          <thead>
            <tr className="text-left h-16">
              <th className="sticky top-0 bg-background">#</th>
              <th className="sticky top-0 bg-background"></th>
              <th className="sticky top-0 bg-background">Track Title</th>
              <th className="sticky top-0 bg-background">Duration</th>
              <th className="sticky top-0 bg-background">BPM</th>
              <th className="sticky top-0 bg-background">Key</th>
            </tr>
          </thead>
          <tbody className="">
            {playlist.tracks.items.map(({ track }, index) => (
              <Track track={track} key={track.id} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <div>Loading Playlist...</div>
  );
}
