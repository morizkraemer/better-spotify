import { create } from "zustand";

const useContextMenuStore = create((set, get) => ({
  isVisible: false,
  position: { x: 0, y: 0 },
  content: null,
  showContextMenu: (x, y, content) =>
    set({ isVisible: true, position: { x, y }, content }),
  hideContextMenu: () => set({ isVisible: false }),
}));

export default useContextMenuStore;
