import { create } from "zustand";
import type { Song } from "../../types/types";
import { getLikedSongs } from "../services/songs.service";

interface LikedSongsStore {
  songs: Song[];
  isLoading: boolean;
  fetchLikedSongs: () => Promise<void>;
}

const useLikedSongs = create<LikedSongsStore>((set) => ({
  songs: [],
  isLoading: false,
  fetchLikedSongs: async () => {
    set({ isLoading: true });
    const songs = await getLikedSongs();
    set({ songs, isLoading: false });
  },
}));

export default useLikedSongs;

