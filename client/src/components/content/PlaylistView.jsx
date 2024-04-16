import { useState } from "react";
import PlaylistPublicButton from "../reusedComponents/PlaylistPublicButton";
import PlaylistCollabButton from "../reusedComponents/PlaylistCollabButton";
import TrackTable from "./TrackTable";
import SearchBar from "../reusedComponents/SearchBar";

export default function PlaylistTableViewer({ playlist: playlistData }) {
  const [search, setSearch] = useState("");
  return (
    <div className="flex flex-col gap-2 h-full p-2">
      <div className="flex justify-between items-center gap-5 my-2 h-16">
        <SearchBar search={search} setSearch={setSearch} />
        <div className="flex items-center gap-5">
          <span className="text-4xl">{playlistData.name}</span>
          <span className="text-neutral-500">
            {playlistData.owner.display_name}
          </span>

          <span>
            <PlaylistPublicButton
              id={playlistData.id}
              isPublic={playlistData.public}
              withLink={true}
            />
          </span>
          <span>
            <PlaylistCollabButton
              id={playlistData.id}
              isCollab={playlistData.collaborative}
              withLink={true}
            />
          </span>
        </div>
      </div>
      <div className="overflow-auto" style={{ height: `100% - 4rem` }}>
        <TrackTable
          playlistData={playlistData}
          search={search}
          type={playlistData.type}
        />
      </div>
    </div>
  );
}
