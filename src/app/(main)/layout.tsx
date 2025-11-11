import Container from "@/components/Container";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  return <Container>{children}</Container>;
}

export default MainLayout;
