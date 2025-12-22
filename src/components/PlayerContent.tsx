import { useEffect, useState, useRef, useCallback } from "react";
import { useSound } from "use-sound";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { TbRepeat, TbRepeatOff } from "react-icons/tb";

// Type for the Howl sound instance from use-sound
interface HowlInstance {
  seek: (time?: number) => number;
  play: () => void;
  duration: () => number;
}

import type { Song } from "../../types/types";
import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import Slider from "./Slider";
import SeekSlider from "./SeekSlider";
import usePlayer from "../hooks/usePlayer";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const animationRef = useRef<number | null>(null);
  const soundRef = useRef<HowlInstance | null>(null);

  // Use refs to avoid stale closures in useSound callbacks
  const isLoopingRef = useRef(player.isLooping);
  const playerRef = useRef(player);

  // Keep refs in sync with latest values
  useEffect(() => {
    isLoopingRef.current = player.isLooping;
    playerRef.current = player;
  }, [player.isLooping, player]);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;
  const LoopIcon = player.isLooping ? TbRepeat : TbRepeatOff;

  const onPlayNext = useCallback(() => {
    const currentPlayer = playerRef.current;
    if (currentPlayer.ids.length === 0) return;

    const currentIndex = currentPlayer.ids.findIndex(
      (id) => id === currentPlayer.activeId
    );
    const nextSong = currentPlayer.ids[currentIndex + 1];

    if (nextSong) {
      // Auto play next song if available
      currentPlayer.setId(nextSong);
    }
    // If no next song and not looping, playback stops naturally
  }, []);

  const onPlayPrevious = () => {
    if (player.ids.length === 0) return;

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids.at(-1)!);
    }
    player.setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      if (isLoopingRef.current && soundRef.current) {
        // Loop the current song
        soundRef.current.seek(0);
        soundRef.current.play();
      } else {
        // Auto next if playlist has more songs
        onPlayNext();
      }
    },
    onpause: () => setIsPlaying(false),
    onload: () => {
      setDuration(sound?.duration() || 0);
    },
    format: ["mp3"],
  });

  // Keep soundRef in sync
  useEffect(() => {
    soundRef.current = sound || null;
  }, [sound]);

  // Update current time while playing
  useEffect(() => {
    const updateTime = () => {
      if (sound && isPlaying) {
        setCurrentTime(sound.seek() || 0);
        animationRef.current = requestAnimationFrame(updateTime);
      }
    };

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(updateTime);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [sound, isPlaying]);

  // Update duration when sound loads
  useEffect(() => {
    if (sound) {
      setDuration(sound.duration() || 0);
    }
  }, [sound]);

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const handleSeek = (time: number) => {
    if (sound) {
      sound.seek(time);
      setCurrentTime(time);
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-2 md:grid-cols-3 h-full">
        <div
          className="
            flex
            w-full
            justify-start
          "
        >
          <div className="flex items-center gap-x-4">
            <MediaItem data={song} />
            <LikeButton songId={song.id} />
          </div>
        </div>

        <div className="flex md:hidden col-auto w-full justify-end items-center">
          <div
            onClick={handlePlay}
            className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
          >
            <Icon size={30} className="text-black" />
          </div>
        </div>

        <div className="hidden h-full md:flex flex-col justify-center items-center w-full max-w-[722px] gap-y-1">
          <div className="flex items-center gap-x-6">
            <LoopIcon
              onClick={player.toggleLoop}
              size={24}
              className={`cursor-pointer transition ${
                player.isLooping
                  ? "text-green-500 hover:text-green-400"
                  : "text-neutral-400 hover:text-white"
              }`}
            />
            <AiFillStepBackward
              onClick={onPlayPrevious}
              size={30}
              className="text-neutral-400 cursor-pointer hover:text-white transition"
            />
            <div
              onClick={handlePlay}
              className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
            >
              <Icon size={30} className="text-black" />
            </div>
            <AiFillStepForward
              onClick={onPlayNext}
              size={30}
              className="text-neutral-400 cursor-pointer hover:text-white transition"
            />
            <div className="w-6" /> {/* Spacer for symmetry */}
          </div>
          <div className="w-full max-w-[500px]">
            <SeekSlider
              currentTime={currentTime}
              duration={duration}
              onSeek={handleSeek}
            />
          </div>
        </div>

        <div className="hidden md:flex w-full justify-end pr-2">
          <div className="flex items-center gap-x-2 w-[120px]">
            <VolumeIcon
              size={34}
              onClick={toggleMute}
              className="cursor-pointer"
            />
            <Slider value={volume} onChange={(value) => setVolume(value)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
