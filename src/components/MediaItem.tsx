import * as LikeImage from "../assets/like.jpg";
import useLoadImage from "../hooks/useLoadImage";

import type { Song } from "../../types/types";

interface MediaItemProps {
  onClick?: (id: string) => void;
  data: Song;
}

const MediaItem = ({ data, onClick }: MediaItemProps) => {
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    // TODO : player
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
    >
      <div className="relative rounded-md h-12 w-12 overflow-hidden">
        <img
          src={imageUrl ?? LikeImage.default}
          alt="Media Item"
          className="object-cover"
        />
      </div>
      <div
        className="
            flex
            flex-col
            gap-y-1
            overflow-hidden
            "
      >
        <p className="text-white truncate">{data.title}</p>
        <p className="text-neutral-400 text-sm truncate">{data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
