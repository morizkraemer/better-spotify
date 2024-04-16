import React, { useMemo } from "react";
import Tab from "./ContentViewTabs";
import PlaylistDataFetcher from "./PlaylistDataFetcher";
import ArtistDataFetcher from "./ArtistDataFetcher";
import ContentNavigation from "./ContentNavigation";
import useTabsStore from "../../stores/tabStore";

export default function ContentView() {
  const { tabs, activeTab } = useTabsStore();

  const component = useMemo(() => {
    switch (activeTab?.type) {
      case "playlist":
        return <PlaylistDataFetcher playlistId={activeTab.playlistId} />;
      case "artist":
        return <ArtistDataFetcher artistId={activeTab.artistId} />;
      default:
        return (
          <div className="flex justify-center items-center h-full ">
            <div className="text-4xl text-neutral-500">
              open a playlist to start
            </div>
          </div>
        );
    }
  }, [activeTab, tabs]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex h-12">
        {tabs.map((tab) => (
          <Tab key={tab.id} tab={tab} />
        ))}
      </div>
      <div className="border m-2 p-2" style={{ height: `calc(100% - 4rem)` }}>
        <div className="h-full">
          <div className="h-16">
            <ContentNavigation />
          </div>
          <div className="" style={{ height: `calc(100% - 4rem)` }}>
            {component}
          </div>
        </div>
      </div>
    </div>
  );
}
