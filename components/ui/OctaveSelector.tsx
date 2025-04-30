type Props = {
  currentOctave: string;
  setCurrentOctave: (octave: string) => void;
};

export default function OctaveSelector({
  currentOctave,
  setCurrentOctave,
}: Props) {
  const octaves = Array.from({ length: 4 }, (_, i) => i + 2); // Octaves 2–5

  return (
    <div className="flex space-x-3 items-center">
      <h3>Octave</h3>
      <select
        value={currentOctave}
        onChange={(e) => setCurrentOctave(e.target.value)}
      >
        {octaves.map((octave) => (
          <option key={octave} value={octave}>
            {octave}
          </option>
        ))}
      </select>
    </div>
  );
}
