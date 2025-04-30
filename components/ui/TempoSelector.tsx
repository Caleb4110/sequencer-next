import Slider from "@components/common/Slider";

type Props = {
  bpm: number;
  setBpm: (bpm: number) => void;
};

export default function TempoSelector({ bpm, setBpm }: Props) {
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
