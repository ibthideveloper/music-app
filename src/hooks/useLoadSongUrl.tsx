import { useMemo } from "react";
import type { Song } from "../../types/types";
import { supabase } from "../lib/supabaseClient";
import { useUser } from "./useUser";

const useLoadSongUrl = (song: Song) => {
  const supabaseClient = supabase;
  const { user } = useUser();

  const songUrl = useMemo(() => {
    // Return empty if no song provided
    if (!song) {
      return "";
    }

    // Return empty if user is not logged in
    if (!user) {
      return "";
    }

    const { data: songData } = supabaseClient.storage
      .from("songs")
      .getPublicUrl(song.song_path);

    return songData.publicUrl;
  }, [song, user, supabaseClient]);

  return songUrl;
};

export default useLoadSongUrl;
