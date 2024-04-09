import React from "react";
import { useTabs } from "../context/TabContext";

export default function ContentViewTabs({ tab }) {
  const { activeTab, setActiveTab, onCloseTab } = useTabs();
  return (
    <div
      className={`flex items-center  border-neutral-500 px-2 my-2 mx-1 ${tab.id === activeTab?.id ? "border-2" : "border"}`}
    >
      <div
        onClick={() => {
          setActiveTab(tab);
        }}
        className="cursor-default whitespace-nowrap truncate w-32"
      >
        {tab.name}
      </div>
      <svg
        onClick={() => {
          onCloseTab(tab.id);
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
    </div>
  );
}