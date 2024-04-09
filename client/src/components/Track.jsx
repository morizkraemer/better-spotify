import { useEffect, useState, Fragment } from "react";
import { usePlayer } from "../context/PlayerContext";
import { useTabs } from "../context/TabContext";
import { useSpotifyApi } from "../context/SpotifyApiContext";
import { getCamelot, roundBpm } from "../helpers";

export default function Track({ track, index }) {
  const { setPlayingTrack, playingTrack } = usePlayer();
  const [audioFeatures, setAudioFeatures] = useState(null);
  const { spotifyApi } = useSpotifyApi();
  const { onOpenTab } = useTabs();

  async function getAudioFeatures(trackId) {
    const response = await spotifyApi.getAudioFeaturesForTrack(trackId);
    setAudioFeatures(response.body);
  }

  useEffect(() => {
    getAudioFeatures(track.id);
  }, []);

  const time = new Date(track.duration_ms);
  const duration = `${time.getMinutes()}:${time.getSeconds().toString().padStart(2, "0")}`;
  return (
    <tr
      className="bg-neutral-900 border select-none"
      onDoubleClick={() => {
        setPlayingTrack(track?.uri);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <td className="px-1 text-neutral-400">{index + 1}</td>
      <td>
        <button
          onClick={() => {
            setPlayingTrack(track?.uri);
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
              playingTrack === track.uri
                ? "stroke-sgreen"
                : "stroke-neutral-300"
            }
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 4v16l13 -8z" />
          </svg>
        </button>
      </td>
      <td>
        <div className="my-2">
          <div
            className={`px-1 text-lg font-medium  ${playingTrack === track.uri ? "text-sgreen" : "text-white"}`}
          >
            {track.name}
          </div>
          <div className="px-1 text-neutral-400 text-sm">
            {track.artists.map((artist, index) => {
              return (
                <Fragment key={artist.id}>
                  <a
                    key={artist.id}
                    className="hover:text-neutral-200 hover:cursor-pointer hover:underline"
                    onClick={() => {
                      onOpenTab({
                        type: "artist",
                        artistId: artist.id,
                        name: artist.name,
                      });
                    }}
                  >
                    {artist.name}
                  </a>
                  {index < track.artists.length - 1 ? ", " : ""}
                </Fragment>
              );
            })}
          </div>
        </div>
      </td>
      <td className="text-neutral-400">{duration}</td>
      <td className="text-neutral-400">{roundBpm(audioFeatures?.tempo)}</td>
      <td className="text-neutral-400">
        {getCamelot(audioFeatures?.key, audioFeatures?.mode)}
      </td>
    </tr>
  );
}
