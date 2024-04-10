import React from "react";
import useTabsStore from "../stores/tabStore";

export default function ContentViewTabs({ tab }) {
  const { activeTab, setActiveTab, onCloseTab } = useTabsStore();
  return (
    <div
      className={`flex items-center border my-2 mx-1 px-2 py-1 ${tab.id === activeTab?.id ? "border-neutral-300" : "border-neutral-500"}`}
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
      >
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
    </div>
  );
}
