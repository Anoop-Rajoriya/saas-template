import React from "react";

function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-screen w-full min-h-screen bg-app text-main">
      <div
        className={`${className} container font-josefin max-w-3xl w-full mx-auto px-4 py-8`}
      >
        {children}
      </div>
    </div>
  );
}

export default Container;
