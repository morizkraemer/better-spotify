import React from "react";

export default function SideBarTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex">
      <div
        className={`w-1/3 text-xl border m-2 text-center ${activeTab === 1 && "border-sgreen"}`}
        onClick={() => {
          setActiveTab(1);
        }}
      >
        Playlists
      </div>
      <div
        className={`w-1/3 text-xl border m-2 text-center ${activeTab === 2 && "border-sgreen"}`}
        onClick={() => {
          setActiveTab(2);
        }}
      >
        Albums
      </div>
      <div
        className={`w-1/3 text-xl border m-2 text-center ${activeTab === 3 && "border-sgreen"}`}
        onClick={() => {
          setActiveTab(3);
        }}
      >
        Artists
      </div>
    </div>
  );
}
