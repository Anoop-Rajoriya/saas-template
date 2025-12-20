import React from "react";

type Props = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "start" | "end";
  width?: string;
};

function Dropdown({
  trigger,
  children,
  align = "end", // start | end
  width = "w-56",
}: Props) {
  const alignClass = align === "start" ? "dropdown-start" : "dropdown-end";
  return (
    <div className={`dropdown ${alignClass}`}>
      <label tabIndex={0} className="cursor-pointer">
        {trigger}
      </label>

      <div
        tabIndex={0}
        className={`dropdown-content z-50 mt-2 rounded-xl bg-card-bg border border-border-main shadow-lg ${width}`}
      >
        {children}
      </div>
    </div>
  );
}

export default Dropdown;
