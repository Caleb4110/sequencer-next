type Props = {
  currentNote: string;
  setCurrentNote: (note: string) => void;
};

export default function NoteSelector({ currentNote, setCurrentNote }: Props) {
  const notes = ["A", "B", "C", "D", "E", "F", "G"];

  return (
    <div className="flex space-x-3 items-center">
      <h3>Note</h3>
      <select
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
