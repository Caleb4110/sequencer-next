type Props = {
  isActive: string | null;
  onClick: (e: any) => void;
  id: string;
  isPlaying: boolean;
  isPitched: boolean;
};

export default function SequenceStep({
  isActive,
  id,
  onClick,
  isPlaying,
  isPitched,
}: Props) {
  const bgCss = isPlaying
    ? "bg-accent2Dark text-textDark"
    : isActive
      ? "bg-accent1Dark text-textDark"
      : "bg-gray-50 text-textLight";

  return (
    <button
      id={id}
      onClick={onClick}
      className={
        "size-16 rounded-full transition-colors duration-300" + " " + bgCss
      }
    >
      {isPitched && isActive && isActive}
    </button>
  );
}
