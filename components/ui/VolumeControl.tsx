import Slider from "@components/common/Slider";
import * as Tone from "tone";


type Props = {
  volume: Tone.Sampler["volume"],
}

export default function VolumeControl({ volume }: Props) {

  const handleVolumeChange = (e: any) => {
    volume.value = Number.parseInt(e.target.value);
  }

  return (
    <div className="flex space-x-5 items-center">
      <h3>volume</h3>
      <Slider
        onChange={handleVolumeChange}
        value={volume.value}
        min={-20}
        max={20}
      />
    </div>
  );
}
