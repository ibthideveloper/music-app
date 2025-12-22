import type { Song } from "../../types/types";
import { supabase } from "../lib/supabaseClient";

const useLoadImage = (song: Song) => {
  const supabaseClient = supabase;

  if (!song) {
    return null;
  }

  const { data: ImageData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(song.image_path);

  return ImageData.publicUrl;
};

export default useLoadImage;
