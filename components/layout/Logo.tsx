import React from "react";

function Logo({ children }: { children: string }) {
  return (
    <h1 className="text-xl md:text-2xl font-bold uppercase font-josefin tracking-[0.4em] text-text-main">
      {children}
    </h1>
  );
}

export default Logo;
