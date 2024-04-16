import React, { useState } from "react";
import TrackTable from "./TrackTable";
import ArtistInfo from "./ArtistInfo";
import SearchBar from "../reusedComponents/SearchBar";

export default function ArtistView({
  artist,
  allTracksLoaded,
  fetchArtistData,
}) {
  const [search, setSearch] = useState();
  return (
    <div className="flex flex-col gap-2 h-full p-2">
      <div className="flex items-center justify-between p-2">
        <SearchBar search={search} setSearch={setSearch} />
        <ArtistInfo artist={artist} />
      </div>
      <div className="overflow-auto h-full">
        <TrackTable
          playlistData={artist.tracks}
          search={search}
          type="artist"
          allTracksLoaded={allTracksLoaded}
          fetchArtistData={fetchArtistData}
        />
      </div>
    </div>
  );
}
