import { create } from "zustand";

interface CommandStoreState {
  isOpen: boolean;
  query: string;
  selectedIndex: number;
  open: () => void;
  close: () => void;
  reset: () => void;
  setQuery: (query: string) => void;
  setSelectedIndex: (index: number) => void;
}

export const useCommandStore = create<CommandStoreState>((set) => ({
  isOpen: false,
  query: "",
  selectedIndex: 0,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  reset: () => set({ query: "", selectedIndex: 0 }),
  setQuery: (query) => set({ query }),
  setSelectedIndex: (index) => set({ selectedIndex: index }),
}));
