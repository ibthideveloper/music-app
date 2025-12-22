import { create } from "zustand";

interface PlayerStore {
  ids: string[];
  activeId?: string;
  isLooping: boolean;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  setLooping: (isLooping: boolean) => void;
  toggleLoop: () => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  isLooping: false,
  setId: (id) => set({ activeId: id }),
  setIds: (ids) => set({ ids: ids }),
  setLooping: (isLooping) => set({ isLooping }),
  toggleLoop: () => set((state) => ({ isLooping: !state.isLooping })),
  reset: () => set({ activeId: undefined, ids: [], isLooping: false }),
}));

export default usePlayer;
