import type { Song } from "../../types/types";
import useOnPlay from "../hooks/useOnPlay";
import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";

export interface SearchContentProps {
  songs: Song[];
}

const SearchContent = ({ songs }: SearchContentProps) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return <div className="text-neutral-400 px-6">No Songs Found</div>;
  }

  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
