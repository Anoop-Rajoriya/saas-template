import Image from "next/image";
import React from "react";

type Images = {
  desktop: string;
  desktopDark: string;
  mobile: string;
  mobileDark: string;
};

const defaultImages: Images = {
  desktop: "/backgrounds/desktop-light.jpg",
  desktopDark: "/backgrounds/desktop-dark.jpg",
  mobile: "/backgrounds/mobile-light.jpg",
  mobileDark: "/backgrounds/mobile-dark.jpg",
};

function BG({
  className,
  children,
  images = defaultImages,
}: {
  className?: string;
  children?: React.ReactNode;
  images?: Images;
}) {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <div
        id="background"
        className="absolute left-0 right-0 top-0 min-h-1/2 opacity-80"
      >
        <Image
          src={images.desktop}
          alt="Desktop background image"
          fill={true}
          priority
          className="object-cover hidden dark:hidden md:block"
        />
        <Image
          src={images.desktopDark}
          alt="Desktop dark background image"
          fill={true}
          priority
          className="object-cover hidden md:dark:block"
        />
        <Image
          src={images.mobile}
          alt="Mobile background image"
          fill={true}
          priority
          className="object-cover block dark:hidden md:hidden"
        />
        <Image
          src={images.mobileDark}
          alt="Mobile dark background image"
          fill={true}
          priority
          className="object-cover hidden dark:block md:dark:hidden"
        />
        <div
          id="mask"
          className="absolute inset-0 bg-linear-to-b from-app/20 via-app/60 to-app"
        ></div>
      </div>
      <div className={`relative w-full h-full ${className}`}>{children}</div>
    </div>
  );
}

export default BG;
