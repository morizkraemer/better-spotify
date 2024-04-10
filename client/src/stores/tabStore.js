import { create } from "zustand";

const useTabsStore = create((set, get) => ({
  tabs: [{ id: 1, type: "default", name: "tab1" }],
  activeTab: null,
  setActiveTab: (activeTab) => set({ activeTab }),
  onOpenTab: (tabInfo) => {
    const tabs = get().tabs;
    let existingTab = null;

    if (tabInfo.playlistId) {
      existingTab = tabs.find((tab) => tab.playlistId === tabInfo.playlistId);
    }

    if (existingTab) {
      set({ activeTab: { ...existingTab } });
    } else {
      const newTab = {
        id: tabs[tabs.length - 1]?.id + 1 || 1,
        ...tabInfo,
      };
      set((state) => ({
        tabs: [...state.tabs, newTab],
        activeTab: { ...newTab },
      }));
    }
  },
  onCloseTab: (tabId) => {
    set((state) => {
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
