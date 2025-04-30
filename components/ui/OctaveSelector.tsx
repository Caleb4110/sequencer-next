type Props = {
  currentOctave: string;
  setCurrentOctave: (octave: string) => void;
  disabled?: boolean;
};

export default function OctaveSelector({
  currentOctave,
  setCurrentOctave,
  disabled = false,
}: Props) {
  const octaves = Array.from({ length: 4 }, (_, i) => i + 2); // Octaves 2–5

  return (
    <div aria-disabled={disabled} className="flex space-x-3 items-center ">
      <h3 className={disabled ? "text-accent2Light" : ""}>Octave</h3>
      <select
        disabled={disabled}
        className="disabled:text-accent2Light"
        value={currentOctave}
        onChange={(e) => setCurrentOctave(e.target.value)}
      >
        {octaves.map((octave) => (
          <option key={octave} disabled={disabled} value={octave}>
            {octave}
          </option>
        ))}
      </select>
    </div>
  );
}
