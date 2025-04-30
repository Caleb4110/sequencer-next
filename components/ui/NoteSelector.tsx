type Props = {
  currentNote: string;
  setCurrentNote: (note: string) => void;
  disabled?: boolean;
};

export default function NoteSelector({
  currentNote,
  setCurrentNote,
  disabled = false,
}: Props) {
  const notes = ["C", "D", "E", "F", "G", "A", "B"];

  return (
    <div aria-disabled={disabled} className="flex space-x-3 items-center">
      <h3 className={disabled ? "text-accent1Light" : ""}>Note</h3>
      <select
        disabled={disabled}
        className="disabled:text-accent2Light"
        value={currentNote}
        onChange={(e) => setCurrentNote(e.target.value)}
      >
        {notes.map((note) => (
          <option key={note} value={note}>
            {note}
          </option>
        ))}
      </select>
    </div>
  );
}
