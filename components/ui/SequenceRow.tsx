import SequenceStep from "@components/common/SequenceStep";

type Props = {
  rowName: string;
  rowIndex: number;
  handleNoteChange: (e: any) => void;
  notes: any[];
  isPlaying: boolean;
  isPitched: boolean;
  currentStep: number;
};

export default function SequenceRow({
  rowName,
  rowIndex,
  handleNoteChange,
  notes,
  isPlaying,
  isPitched,
  currentStep,
}: Props) {
  return (
    <div className="flex space-x-5 justify-center items-center">
      <h3 className="w-12 text-right">{rowName}</h3>
      <div className="grid grid-cols-16 gap-6">
        {notes.map((note, index) => {
          return (
            <SequenceStep
              key={`${rowIndex}-${index}`}
              id={`${rowIndex}-${index}`}
              onClick={handleNoteChange}
              isActive={note}
              isPlaying={currentStep === index && isPlaying ? true : false}
              isPitched={isPitched}
            />
          );
        })}
      </div>
    </div>
  );
}
