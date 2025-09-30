import { create } from "zustand";

interface TopbarState {
  title: string | null;
  setTitle: (title: string | null) => void;
}

export const useTopbarStore = create<TopbarState>((set) => ({
  title: null,
  setTitle: (title) => set({ title }),
}));
