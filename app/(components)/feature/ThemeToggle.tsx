"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder with the same dimensions to prevent layout shift
    return <div className="w-[26px] h-[26px]" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        <Image
          src="/icons/icon-moon.svg"
          alt="Moon icon"
          width={26}
          height={26}
        />
      ) : (
        <Image
          src="/icons/icon-sun.svg"
          alt="Moon icon"
          width={26}
          height={26}
        />
      )}
    </button>
  );
}
