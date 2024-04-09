import React, { useMemo } from "react";
import Tab from "./ContentViewTabs";
import PlaylistContent from "./PlaylistContent";
import ArtistPage from "./ArtistPage";
import { useTabs } from "../context/TabContext";

export default function ContentView() {
  const { tabs, activeTab } = useTabs();

  const component = useMemo(() => {
    switch (activeTab?.type) {
      case "playlist":
        return <PlaylistContent playlistId={activeTab.playlistId} />;
      case "artist":
        return <ArtistPage artistId={activeTab.artistId} />;
      default:
        return (
          <div className="flex justify-center items-center h-full ">
            <div className="text-4xl text-neutral-500">
              open a playlist to start
            </div>
          </div>
        );
    }
  }, [activeTab]);

  return (
    <div className="w-5/6 h-full flex flex-col">
      <div className="flex border border-b-0">
        {tabs.map((tab) => (
          <Tab key={tab.id} tab={tab} />
        ))}
      </div>
      {component}
    </div>
  );
}
