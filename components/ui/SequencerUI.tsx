import Button from "@components/common/Button";
import NoteSelector from "@components/ui/NoteSelector";
import OctaveSelector from "@components/ui/OctaveSelector";
import BpmControl from "@components/ui/BpmControl";
import SequenceRow from "@components/ui/SequenceRow";
import { Instrument, StepsGrid } from "@types";

type Props = {
  isPlaying: boolean;
  handlePlayPause: () => void;
  currentNote: string;
  setCurrentNote: (note: string) => void;
  currentOctave: string;
  setCurrentOctave: (octave: string) => void;
  instruments: Instrument[];
  stepsGrid: StepsGrid;
  handleNoteChange: (e: any) => void;
  stepIndex: number;
  extraControls?: React.ReactNode;
  filterInstrument?: (instrument: Instrument) => boolean;
};

export default function SequencerUI({
  isPlaying,
  handlePlayPause,
  currentNote,
  setCurrentNote,
  currentOctave,
  setCurrentOctave,
  instruments,
  stepsGrid,
  handleNoteChange,
  stepIndex,
  extraControls,
  filterInstrument = () => true,
}: Props) {
  return (
    <main className="flex flex-col items-center space-y-10 justify-center p-10">
      <div className="flex items-center w-full justify-between">
        <Button
          onClick={handlePlayPause}
          text={isPlaying ? "Stop Sequence" : "Start Sequence"}
          className={"w-36 " + (isPlaying ? "bg-accent2Dark" : "")}
        />
        {extraControls}
        <NoteSelector
          currentNote={currentNote}
          setCurrentNote={setCurrentNote}
        />
        <OctaveSelector
          currentOctave={currentOctave}
          setCurrentOctave={setCurrentOctave}
        />
        <BpmControl />
      </div>

      <div className="flex flex-col space-y-7 justify-center items-center">
        {instruments.filter(filterInstrument).map((instrument) => (
          <SequenceRow
            key={instrument.id}
            rowName={instrument.name}
            rowIndex={instrument.id}
            handleNoteChange={handleNoteChange}
            notes={stepsGrid[instrument.id]}
            isPlaying={isPlaying}
            currentStep={stepIndex}
            isPitched={instrument.isPitched}
            numberOfSteps={stepsGrid[instrument.id].length}
          />
        ))}
      </div>
    </main>
  );
}
