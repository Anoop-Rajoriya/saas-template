import React from "react";

type Variant = "gradient" | "primary" | "secondary";

type Props = {
  onChange: (checked: boolean) => void;
  checked?: boolean;
  variant?: Variant;
  disabled?: boolean;
};

function Checkbox({
  onChange,
  checked = false,
  variant = "primary",
  disabled = false,
}: Props) {
  const variantClasses: Record<Variant, string> = {
    gradient: "checked:bg-custom-gradient checked:border-transparent",
    primary: "checked:bg-bright-blue checked:border-bright-blue",
    secondary: "checked:bg-card checked:border-border-main",
  };

  return (
    <input
      type="checkbox"
      className={[
        "checkbox",
        "border-border-main",
        "focus:outline-none",
        "focus:ring-2 focus:ring-offset-2 focus:ring-primary",
        variantClasses[variant],
      ].join(" ")}
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange(e.target.checked)}
    />
  );
}

export default Checkbox;
