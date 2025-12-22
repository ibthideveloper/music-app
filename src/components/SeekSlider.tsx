import * as RadixSlider from "@radix-ui/react-slider";

interface SeekSliderProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const SeekSlider = ({ currentTime, duration, onSeek }: SeekSliderProps) => {
  const handleChange = (newValue: number[]) => {
    onSeek(newValue[0]);
  };

  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <div className="flex items-center gap-x-2 w-full">
      <span className="text-xs text-neutral-400 w-10 text-right">
        {formatTime(currentTime)}
      </span>
      <RadixSlider.Root
        className="relative flex items-center select-none touch-none w-full h-5 group"
        value={[progress]}
        onValueChange={(value) => handleChange([value[0] * duration])}
        max={1}
        step={0.001}
        aria-label="Seek"
      >
        <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[4px] group-hover:h-[6px] transition-all">
          <RadixSlider.Range className="absolute bg-white group-hover:bg-green-500 rounded-full h-full transition-colors" />
        </RadixSlider.Track>
        <RadixSlider.Thumb className="hidden group-hover:block w-3 h-3 bg-white rounded-full focus:outline-none" />
      </RadixSlider.Root>
      <span className="text-xs text-neutral-400 w-10">
        {formatTime(duration)}
      </span>
    </div>
  );
};

export default SeekSlider;

