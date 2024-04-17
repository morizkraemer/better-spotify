import { create } from "zustand";
import { Location, TabInfo, TabType, TabsStore } from "./types/tabstoreTypes";

const useTabsStore = create<TabsStore>((set, get) => ({
  tabs: [
    {
      id: 1,
      name: "tab1",
      location: { type: "default", id: "" },
      history: [],
    },
  ],
  activeTab: null,
  setActiveTab: (activeTab: TabType) => set({ activeTab }),

  onOpenTab: (tabInfo: TabInfo) => {
    const tabs = get().tabs as TabType[];
    let existingTab = null;

    if (tabInfo.playlistId) {
      existingTab = tabs.find(
        (tab: TabType) => tab.location.id === tabInfo.playlistId,
      );
    }

    if (existingTab) {
      set({ activeTab: { ...existingTab } });
      return;
    }
    if (tabInfo.newTab) {
      const location: Location = {
        type: tabInfo.type,
        id: tabInfo.playlistId || tabInfo.artistId || "",
      };
      const newTab: TabType = {
        id: tabs[tabs.length - 1]?.id + 1 || 1,
        location,
        name: tabInfo.name,
        history: [location],
      };
      set((state: TabsStore) => ({
        tabs: [...state.tabs, newTab],
        activeTab: { ...newTab },
      }));
    }
  },
  onCloseTab: (tabId: number) => {
    set((state: TabsStore) => {
      const updatedTabs = state.tabs.filter((t) => tabId !== t.id);
      const newActiveTab =
        updatedTabs.length > 0
          ? state.activeTab?.id === tabId
            ? updatedTabs[updatedTabs.length - 1]
            : state.activeTab
          : null;
      return { tabs: updatedTabs, activeTab: newActiveTab };
    });
  },
}));

export default useTabsStore;
