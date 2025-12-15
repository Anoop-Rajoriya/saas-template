import Image from "next/image";
import { TodoCheckInput as Props } from "../types";

function Check({ checked, onChange, disabled = false }: Props) {
  return (
    <label
      className={`
        inline-flex size-5 md:size-6 shrink-0 rounded-full
        border border-border-main
        items-center justify-center
        relative
        has-checked:bg-check-gradient
        ${disabled ? "opacity-60" : ""}
      `}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="absolute opacity-0 peer"
      />

      {/* Check icon */}
      <Image
        src="/icons/icon-check.svg"
        alt="check icon"
        width={16}
        height={16}
        className={`
          hidden peer-checked:inline-block
          ${disabled ? "opacity-40" : ""}
        `}
      />
    </label>
  );
}

export default Check;
