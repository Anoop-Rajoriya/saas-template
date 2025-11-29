"use client";
import React from "react";
import { ThemeProvider } from "next-themes";

type Props = {
  children: React.ReactNode;
};

function WebLayout({ children }: Props) {
  return (
    <ThemeProvider attribute={"data-theme"} defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}

export default WebLayout;
