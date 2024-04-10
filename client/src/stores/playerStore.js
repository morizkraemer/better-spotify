import { create } from "zustand";

const usePlayerStore = create((set) => ({
  playingTrack: null,
  setPlayingTrack: (trackId) => set((state) => ({ playingTrack: trackId })),
}));

export { usePlayerStore };
