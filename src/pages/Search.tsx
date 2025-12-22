import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Header from "../components/Header";
import SearchContent from "../components/SearchContent";
import SearchInput from "../components/SearchInput";
import { getSongsBytitle } from "../services/songs.service";
import type { Song } from "../../types/types";

// interface SearchProps {
//   searchParams?: {
//     title: string;
//   };
// }

const Search = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchSongs = async () => {
      const data = await getSongsBytitle(searchParams.get("title") ?? "");
      setSongs(data);
    };

    fetchSongs();
  }, [searchParams.get("title")]);

  return (
    <div className="w-full h-full rounded-lg bg-neutral-900 overflow-hidden overflow-y-auto">
      <Header className="from-bg-neutral-900 ">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Search</h1>
          <SearchInput />
        </div>
      </Header>

      <SearchContent songs={songs} />
    </div>
  );
};

export default Search;
