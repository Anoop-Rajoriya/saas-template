import React from "react";

interface Props {
  children: React.ReactNode;
  variant?: "with-hero" | "plain";
  className?: string;
}

const Container: React.FC<Props> = ({
  children,
  variant = "with-hero",
  className = "",
}) => {
  return (
    <div className="min-h-screen w-full bg-app text-txt-main relative flex flex-col items-center font-josefin transition-colors duration-300">
      {variant === "with-hero" && (
        <div
          className="
            absolute top-0 left-0 w-full 
            h-[200px] md:h-[300px]
            bg-(image:--background-img-mobile) 
            md:bg-(image:--background-img-desktop)
            bg-cover bg-no-repeat bg-top
            transition-all duration-300 ease-in-out
            z-0
          "
        />
      )}

      <div
        className={`w-full max-w-xl px-6 py-12 md:py-22 relative z-10 ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
