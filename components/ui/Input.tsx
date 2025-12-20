import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";

type Props = {
  onChange?: (value: string) => void;
  value?: string;
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disable?: boolean;
  defaultError?: string;
  error?: string;
  className?: string;
  type?: "text" | "email" | "password";
};

function Input({
  onChange,
  value,
  id,
  label,
  placeholder = "",
  type = "text",
  required = false,
  disable = false,
  error,
  defaultError = "This field is required",
  className = "",
}: Props) {
  const [val, setVal] = useState(value || "");
  const [err, setErr] = useState(error || "");
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    setVal(newValue);
    onChange?.(newValue);

    if (required && !newValue.trim()) setErr(defaultError);
    else setErr("");
  };

  useEffect(() => setVal(value || ""), [value]);
  useEffect(() => setErr(error || ""), [error]);

  return (
    <label className="w-full flex flex-col">
      {label && <span>{label}</span>}
      <div
        className={`input bg-card text-main w-full outline-none placeholder:text-main/60 relative ${
          err ? "input-error" : "focus:border-border-main"
        }`}
      >
        <input
          disabled={disable}
          name={id}
          type={isPassword && visible ? "text" : type}
          value={val}
          onChange={handleChange}
          required={required}
          placeholder={placeholder}
          className="outline-none border-none bg-transparent flex-1"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-main/70 hover:text-main"
            tabIndex={-1}
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
      {err && <span>{err}</span>}
    </label>
  );
}

export default Input;
