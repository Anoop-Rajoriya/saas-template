import Image from "next/image";

type Props = {
  checked: boolean;
  onChange: (completed: boolean) => void;
};

function Checkbox({ checked, onChange }: Props) {
  return (
    <label className="inline-flex size-5 md:size-6 rounded-full has-checked:bg-check-gradient border border-border-main relative items-center justify-center shrink-0">
      <input
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        type="checkbox"
        className="absolute opacity-0 peer"
      />
      <Image
        className="peer-checked:inline-block hidden size-auto"
        src={"/icons/icon-check.svg"}
        alt="check icon"
        width={16}
        height={16}
      />
    </label>
  );
}

export default Checkbox;
