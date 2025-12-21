import { Button, Container } from "@/components";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Button variant="link">
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        <Link href={"/"}>Back</Link>
      </Button>
      {children}
    </Container>
  );
}

export default AuthLayout;
