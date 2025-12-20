import React from "react";

type Variant = "gradient" | "primary" | "secondary" | "danger" | "link";

type Props = {
  onClick?: () => void;
  isLoading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: Variant;
  className?: string; // Added for flexibility
};

function Button({
  onClick,
  children,
  disabled = false,
  isLoading = false,
  loadingText = "Loading...",
  type = "button",
  variant = "primary",
  className,
}: Props) {
  const varientClasses: Record<Variant, string> = {
    gradient: "bg-custom-gradient text-white",
    primary: "bg-bright-blue text-white",
    secondary: "bg-card text-white",
    danger: "bg-red-600 text-white",
    link: "text-bright-blue underline",
  };
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`btn ${varientClasses[variant]} ${className}`}
    >
      {isLoading ? (
        <>
          <span className="loading loading-sm"></span>
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
