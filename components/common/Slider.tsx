type Props = {
  onChange: (e: any) => void;
  value: number;
  min: number;
  max: number;
  className?: string;
};

export default function Slider({ onChange, value, min, max, className = "" }: Props) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      className={"w-full h-2 bg-accent1Light rounded-lg appearance-none cursor-pointer " + className}
    />
  );
}
