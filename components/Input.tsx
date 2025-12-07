import React from "react";
interface InputProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "onChange"> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  id: string;
}

function Input({
  id,
  label,
  value,
  error,
  onChange,
  className = "",
  type = "text",
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="label text-text-main font-medium">
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`input border-border-main outline-text-muted w-full text-inherit p-2 border rounded-md ${
          error ? "border-red-500" : ""
        } ${className}`}
        {...props}
      />

      {/* Error message */}
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}

export default Input;
