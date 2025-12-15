import React from "react";
import { Container as Props } from "../types";

function Container({ children, showBg = false, className = "" }: Props) {
  return (
    <div className="min-h-screen bg-app-bg text-text-main font-josefin relative">
      {showBg && (
        <div
          id="bg"
          className="absolute top-0 left-0 w-full min-h-1/2 md:min-h-2/5 bg-mobile md:bg-desktop bg-cover bg-no-repeat bg-center opacity-80"
        >
          <div
            id="mask"
            className="absolute inset-0 bg-linear-to-b from-app-bg/20 via-app-bg/60 to-app-bg"
          ></div>
        </div>
      )}
      <main
        className={`relative z-10 container w-full max-w-3xl mx-auto px-4 py-8 ${className}`}
      >
        {children}
      </main>
    </div>
  );
}

export default Container;
