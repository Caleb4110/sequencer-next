import SequenceStep from "@components/common/SequenceStep";
import VolumeControl from "./VolumeControl";
import * as Tone from "tone"

type Props = {
  rowName: string;
  rowIndex: number;
  handleNoteChange: (e: any) => void;
  notes: any[];
  isPlaying: boolean;
  isPitched: boolean;
  currentStep: number;
  numberOfSteps?: number;
  isActive?: boolean;
  volume: Tone.Sampler["volume"]
};

export default function SequenceRow({
  rowName,
  rowIndex,
  handleNoteChange,
  notes,
  isPlaying,
  isPitched,
  currentStep,
  numberOfSteps = 16,
  isActive = true,
  volume,
}: Props) {
  const numCols = {
    16: "grid-cols-16",
    8: "grid-cols-8",
  } as Record<number, string>;

  const barColors = {
    0: "bg-accent3Light",
    4: "bg-accent5Light",
    8: "bg-accent4Light",
    12: "bg-accent6Light"
  } as Record<number, string>;

  if (!isActive) {
    return null;
  }

  let color = barColors[0];

  return (
    <div className="flex space-x-5 justify-center items-center">
      <h3 className="w-12 text-right">{rowName}</h3>
      <div className={`grid ${numCols[numberOfSteps]} gap-6`}>
        {notes.map((note, index) => {
          if (index % 4 == 0) {
            color = barColors[index]
          }

          return (
            <SequenceStep
              key={`${rowIndex}-${index}`}
              id={`${rowIndex}-${index}`}
              onClick={handleNoteChange}
              isActive={note}
              isPlaying={currentStep === index && isPlaying ? true : false}
              isPitched={isPitched}
              defaultColour={color}
            />
          );
        })}
      </div>
      <div className="pl-5">
        <VolumeControl volume={volume} />
      </div>

    </div>
  );
}
