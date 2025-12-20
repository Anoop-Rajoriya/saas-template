import Link from "next/link";

export const SingUpLink = () => {
  return (
    <Link href="/sign-up" className="hover:text-bright-blue transition-color">
      Sign Up
    </Link>
  );
};
export const SingInLink = () => {
  return (
    <Link href="/sign-in" className="hover:text-bright-blue transition-color">
      Sign In
    </Link>
  );
};
