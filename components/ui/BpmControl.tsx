import Slider from "@components/common/Slider";

import { useBpm } from "../../context/BpmContext";

export default function BpmControl() {
  const { bpm, setBpm } = useBpm();

  return (
    <div className="flex space-x-5 items-center">
      <h3>Tempo</h3>
      <h3>{bpm} bpm</h3>
      <Slider
        onChange={(e) => setBpm(Number.parseInt(e.target.value))}
        value={bpm}
        min={60}
        max={240}
      />
    </div>
  );
}
