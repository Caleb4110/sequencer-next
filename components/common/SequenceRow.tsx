import SequenceStep from "./SequenceStep";

type Props = {
  rowName: string;
  rowIndex: number;
  handleNoteChange: (e: any) => void;
  notes: any[];
  isPlaying: boolean;
  currentStep: number;
};

export default function SequenceRow({
  rowName,
  rowIndex,
  handleNoteChange,
  notes,
  isPlaying,
  currentStep,
}: Props) {
  return (
    <div className="flex space-x-5 justify-center items-center">
      <h3 className="w-24 text-right">{rowName}</h3>
      <div className="grid grid-cols-8 gap-2">
        {notes.map((note, index) => {
          return (
            <SequenceStep
              key={`${rowIndex}-${index}`}
              id={`${rowIndex}-${index}`}
              onClick={handleNoteChange}
              isActive={note}
              isPlaying={
                (currentStep === index - 1 ||
                  (currentStep === 7 && index === 0)) &&
                isPlaying
                  ? true
                  : false
              }
            />
          );
        })}
      </div>
    </div>
  );
}
