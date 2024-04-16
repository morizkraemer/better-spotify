import React, { useState } from "react";
import SideBarPlaylistDataFetcher from "./SidebarPlaylistDataFetcher";
import SideBarTabs from "./SideBarTabs";
import SideBarArtists from "./SideBarArtists";
import SideBarTracks from "./SideBarTracks";

export default function SideBar() {
  const [activeTab, setActiveTab] = useState(1);

  const component = () => {
    switch (activeTab) {
      case 1:
        return <SideBarPlaylistDataFetcher />;
      case 2:
        return <SideBarTracks />;
      case 3:
        return <SideBarArtists />;
      default:
        break;
    }
  };

  return (
    <>
      <div className="" style={{ height: "3rem" }}>
        <SideBarTabs setActiveTab={setActiveTab} activeTab={activeTab} />
      </div>
      <div className="h-full" style={{ height: "calc(100% - 3rem)" }}>
        {component()}
      </div>
    </>
  );
}
