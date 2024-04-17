export type TabInfo = {
  type: string;
  name: string;
  playlistId?: string;
  artistId?: string;
  newTab?: boolean;
};

export type Location = {
  type: string;
  id: string;
};

export type TabType = {
  id: number;
  name: string;
  location: Location;
  history: Location[];
};

export interface TabsStore {
  tabs: TabType[];
  activeTab: TabType | null;
  setActiveTab: (activeTab: TabType) => void;
  onOpenTab: (tabInfo: TabInfo) => void;
  onCloseTab: (tabId: number) => void;
}
