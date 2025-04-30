type Props = {
  onChange: (e: any) => void;
  value: number;
  min: number;
  max: number;
};

export default function Slider({ onChange, value, min, max }: Props) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      className="w-full h-2 bg-accent2Light rounded-lg appearance-none cursor-pointer"
    />
  );
}
