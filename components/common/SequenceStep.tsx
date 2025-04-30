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
    ? "bg-accent2Light"
    : isActive
      ? "bg-accent1Light"
      : "bg-bgGray";

  return (
    <button
      id={id}
      onClick={onClick}
      className={
        "size-16 rounded-full transition-colors duration-75 text-bgLight shadow-lg" +
        " " +
        bgCss
      }
    >
      {isPitched && isActive && isActive}
    </button>
  );
}
