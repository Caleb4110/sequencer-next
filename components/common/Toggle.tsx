type Props = {
  onClickHandler: () => void;
  label: string;
};

export default function Toggle({ onClickHandler, label }: Props) {
  return (
    <label className="flex items-center cursor-pointer w-2/12">
      <input
        type="checkbox"
        value=""
        onClick={onClickHandler}
        className="sr-only peer"
      />
      <div className="relative w-11 h-6 bg-accent2Light rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-gray-300 after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-accent1Light"></div>
      <span className="ms-3">{label}</span>
    </label>
  );
}
