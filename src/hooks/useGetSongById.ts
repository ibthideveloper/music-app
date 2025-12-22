import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { getSongBySongId } from "../services/songs.service";
import type { Song } from "../../types/types";

const useGetSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);

    const fetchSong = async () => {
      const { data, error } = await getSongBySongId(id);
      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setSong(data as Song);
      setIsLoading(false);
    };

    fetchSong();
  }, [id]);

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  );
};

export default useGetSongById;
