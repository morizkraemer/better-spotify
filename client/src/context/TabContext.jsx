import React, { createContext, useContext, useState } from "react";

const TabsContext = createContext();

export function useTabs() {
  return useContext(TabsContext);
}

export function TabsProvider({ children }) {
  const [tabs, setTabs] = useState([{ id: 1, type: "default", name: "tab1" }]);
  const [activeTab, setActiveTab] = useState(null);

  function onOpenTab(tabInfo) {
    let existingTab = null;
    if (tabInfo.playlistId) {
      existingTab = tabs.find((tab) => tab.playlistId === tabInfo.playlistId);
    }

    if (existingTab) {
      setActiveTab({ ...existingTab });
    } else {
      const newTab = {
        id: tabs[tabs.length - 1]?.id + 1 || 1,
        ...tabInfo,
      };
      setTabs((prevTabs) => [...prevTabs, newTab]);
      setActiveTab({ ...newTab });
    }
  }

  function onCloseTab(tabId) {
    setTabs((currentTabs) => {
      const updatedTabs = currentTabs.filter((tab) => tab.id !== tabId);
      if (activeTab?.id === tabId && updatedTabs.length > 0) {
        setActiveTab(updatedTabs[updatedTabs.length - 1]);
      } else if (updatedTabs.length === 0) {
        setActiveTab(null);
      }
      return updatedTabs;
    });
  }

  const value = { tabs, activeTab, setActiveTab, onOpenTab, onCloseTab };

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}
