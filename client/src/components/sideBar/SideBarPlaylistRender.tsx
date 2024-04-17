import useTabsStore from "../../stores/tabStore";
import PlaylistCollabButton from "../reusedComponents/PlaylistCollabButton";
import PlaylistPublicButton from "../reusedComponents/PlaylistPublicButton";

type PlaylistType = {
  id: string;
  name: string;
  images: { url: string }[];
  collaborative: boolean;
  public: boolean;
};
type PlaylistProps = { playlist: PlaylistType };
export default function Playlist({ playlist }: PlaylistProps) {
  const { onOpenTab, activeTab, tabs } = useTabsStore();

  const border = () => {
    if (activeTab?.location?.id === playlist?.id) return "border-gray-300";
    else return "border-gray-700";
  };

  const background = () => {
    if (tabs.some((t) => t?.location?.id === playlist?.id))
      return "bg-neutral-800";
  };

  return (
    <div
      className={`flex items-center justify-between border hover:border-gray-100 mx-2 p-1 whitespace-nowrap cursor-default  ${border()} ${background()}`}
      onClick={() => {
        onOpenTab({
          type: "playlist",
          name: playlist.name,
          playlistId: playlist.id,
        });
      }}
    >
      <img
        src={playlist.images?.[0].url}
        alt="Playlist Image"
        width="32"
        className="mx-2 my-1 max-h-[32px]"
      />
      <div className="flex items-center justify-between w-full">
        <div className="w-4/6 truncate">{playlist.name}</div>
        <div className="flex">
          <PlaylistCollabButton
            isCollab={playlist.collaborative}
            id={playlist.id}
          />
          <PlaylistPublicButton isPublic={playlist.public} id={playlist.id} />
        </div>
      </div>
    </div>
  );
}
