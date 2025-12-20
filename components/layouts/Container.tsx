import React from "react";

function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${className} container text-main font-josefin max-w-3xl w-full mx-auto px-4 py-8`}
    >
      {children}
    </div>
  );
}

export default Container;
