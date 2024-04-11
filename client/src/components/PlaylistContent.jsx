import { useEffect, useState } from "react";
import { useSpotifyApi } from "../context/SpotifyApiContext";
import Track from "./Track";

export default function PlaylistContent({ playlistId }) {
  const { spotifyApi } = useSpotifyApi();
  const [playlist, setPlaylist] = useState(null);

  const fetchPlaylistTracks = async () => {
    const playlistResponse = await spotifyApi.getPlaylist(playlistId);
    const trackIds = playlistResponse.body.tracks.items.map((t) => t.track.id);
    const analysisResponse =
      await spotifyApi.getAudioFeaturesForTracks(trackIds);

    const { body } = playlistResponse;
    const data = body.tracks.items.map((t, index) => ({
      ...t,
      analysis: analysisResponse.body.audio_features[index],
    }));
    body.tracks.items = data;
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
            {playlist.tracks.items.map(({ track, analysis }, index) => (
              <Track
                track={track}
                analysis={analysis}
                key={track.id}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <div>Loading Playlist...</div>
  );
}
