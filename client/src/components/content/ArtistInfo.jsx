import React from "react";
import LikeButton from "../reusedComponents/LikeButton";

export default function ArtistInfo({ artist }) {
  return (
    <div className="flex items-center gap-5 border-2 w-fit pr-5">
      <img src={artist?.images[0].url} alt="" className="h-32" />
      <div>
        <span className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">{artist?.name}</h1>
          <LikeButton artistId={artist.id} />
        </span>
        <span className="text-neutral-500">
          {artist?.followers.total.toLocaleString("DE-de")} Followers
        </span>
        <br />
        <span>
          {artist?.genres ? (
            artist?.genres.map((genre, index) => {
              return (
                <span key={genre + index}>
                  <a className="hover:text-neutral-200 hover:cursor-pointer hover:underline"></a>
                  {genre}
                  {index < artist?.genres.length - 1 ? ", " : ""}
                </span>
              );
            })
          ) : (
            <span className="text-neutral-700">No Genres</span>
          )}
        </span>
      </div>
    </div>
  );
}
