type Props = {
  onClick?: (() => void) | ((e: any) => void);
  text?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

export default function Button({
  onClick,
  text,
  className = "",
  size = "md",
}: Props) {
  const sizeCss =
    size === "md"
      ? "h-10 min-w-15"
      : size === "sm"
        ? "h-7 min-w-12"
        : "h-14 min-w-16";

  return (
    <button
      className={
        "p-2 rounded-lg bg-accent1Light flex items-center justify-center transition-colors duration-300 hover:bg-accent1LightHover text-bgLight shadow-md " +
        sizeCss +
        " " +
        className
      }
      onClick={onClick}
      value={text}
    >
      {text}
    </button>
  );
}
