import React, { useEffect, useState, Fragment } from "react";
import { useSpotifyApi } from "../context/SpotifyApiContext";

export default function ArtistPage({ artistId }) {
  const [artist, setArtist] = useState(null);
  const { spotifyApi } = useSpotifyApi();

  async function fetchArtistData() {
    const response = await spotifyApi.getArtist(artistId);
    setArtist(response.body);
  }

  useEffect(() => {
    fetchArtistData();
  }, [artistId]);

  return (
    <div className="flex justify-end">
      <div className="flex items-center gap-5 border-2 w-fit pr-5 mx-10">
        <img src={artist?.images[0].url} alt="" className="h-32" />
        <div>
          <h1 className="text-4xl font-bold">{artist?.name}</h1>
          <span className="text-neutral-500">
            {artist?.followers.total.toLocaleString("DE-de")} Followers
          </span>
          <br />
          <span>
            {artist?.genres ? (
              artist?.genres.map((genre, index) => {
                return (
                  <Fragment key={genre.name + index}>
                    <a className="hover:text-neutral-200 hover:cursor-pointer hover:underline"></a>
                    {genre}
                    {index < artist?.genres.length - 1 ? ", " : ""}
                  </Fragment>
                );
              })
            ) : (
              <span className="text-neutral-700">No Genres</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
