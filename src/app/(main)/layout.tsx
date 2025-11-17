import Container from "@/components/Container";
import Header from "@/components/Header";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
}

export default MainLayout;
