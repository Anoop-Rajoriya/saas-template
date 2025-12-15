"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

function ToggleTheme() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const onChange = function () {};

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <button className="size-7"></button>;

  const toggleTheme = function () {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      // Optional: Add a hover/active effect for better UX
      className="hover:opacity-80 transition-opacity cursor-pointer size-7 inline-flex items-center justify-center"
    >
      {resolvedTheme === "dark" ? (
        <Image
          src="/icons/icon-sun.svg"
          alt="Switch to light mode"
          width={26}
          height={26}
        />
      ) : (
        // <SunIcon />
        <Image
          src="/icons/icon-moon.svg"
          alt="Switch to dark mode"
          width={26}
          height={26}
        />
        // <MoonIcon />
      )}
    </button>
  );
}

export default ToggleTheme;
