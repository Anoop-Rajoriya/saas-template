import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Logo: React.FC<Props> = ({ children, className }) => {
  return (
    <h1 className="text-white uppercase text-2xl md:text-4xl font-bold tracking-[0.4em]">
      {children}
    </h1>
  );
};

export default Logo;
