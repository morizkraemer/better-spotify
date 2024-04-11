import { useEffect, useState, Fragment } from "react";
import { useSpotifyApi } from "../context/SpotifyApiContext";
import { getCamelot, roundBpm } from "../helpers";
import { usePlayerStore } from "../stores/playerStore";
import useTabsStore from "../stores/tabStore";
import useContextMenuStore from "../stores/contextMenuStore";

export default function Track({ track, analysis, index }) {
  const setPlayingTrack = usePlayerStore((state) => state.setPlayingTrack);
  const playingTrack = usePlayerStore((state) => state.playingTrack);
  const [audioFeatures, setAudioFeatures] = useState(null);
  const { spotifyApi } = useSpotifyApi();
  const { onOpenTab } = useTabsStore();
  const showContextMenu = useContextMenuStore((state) => state.showContextMenu);
  console.log(analysis);

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
        showContextMenu(e.clientX, e.clientY, <div>hi</div>);
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
      <td className="text-neutral-400">{roundBpm(analysis?.tempo)}</td>
      <td className="text-neutral-400">
        {getCamelot(analysis?.key, analysis?.mode)}
      </td>
    </tr>
  );
}
