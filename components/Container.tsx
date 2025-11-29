import React from "react";

type Props = {
  children: React.ReactNode;
};

function Container({ children }: Props) {
  return (
    <div className="min-h-screen bg-app-bg text-text-main transition-colors duration-300 relative font-josefin">
      <div
        id="bg"
        className="absolute top-0 left-0 w-full h-[200px] md:h-[300px] bg-mobile md:bg-desktop bg-cover bg-no-repeat bg-center"
      ></div>
      <main className="relative z-10 container mx-auto px-6 py-10">
        {children}
      </main>
    </div>
  );
}

export default Container;
