import clsx from "clsx";
import Link from "next/link";
import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "accent" | "link";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
};

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type LinkProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type Props = ButtonProps | LinkProps;

export default function Button({
  children,
  variant = "primary",
  href,
  loading = false,
  disabled = false,
  className,
  ...props
}: Props) {
  const variantClasses: Record<Variant, string> = {
    primary: "bg-bright-blue text-white",
    secondary: "bg-card text-main",
    accent: "bg-custom-gradient text-white",
    link: "btn-link no-underline text-main hover:underline px-0.5",
  };

  const baseClasses = clsx(
    "btn disabled:opacity-60 disabled:cursor-not-allowed",
    variant !== "link" && "hover:opacity-80 active:opacity-100",
    variantClasses[variant],
    className
  );

  // Link button
  if (href) {
    return (
      <Link
        href={href}
        className={baseClasses}
        aria-disabled={loading}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  // Normal / form button
  return (
    <button
      className={baseClasses}
      disabled={disabled || loading}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {loading ? <span className="loading loading-spinner" /> : children}
    </button>
  );
}
