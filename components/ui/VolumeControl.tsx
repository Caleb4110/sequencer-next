import Slider from "@components/common/Slider";
import * as Tone from "tone";
import "../../app/globals.css"
import { useState } from "react";


type Props = {
  volume: Tone.Sampler["volume"],
}

export default function VolumeControl({ volume }: Props) {
  // NOTE: This is so we can see volume changes before playing 
  const [newVol, setNewVol] = useState<number>(0)

  const handleVolumeChange = (e: any) => {
    setNewVol(Number.parseInt(e.target.value));
    volume.value = Number.parseInt(e.target.value);
  }

  return (
    <div className="range-thumb-hidden flex space-x-5 items-center">
      <Slider
        onChange={handleVolumeChange}
        value={newVol}
        min={-20}
        max={20}
        className=""
      />
    </div>
  );
}
