import { Button, Container } from "@/components";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return <Container className="pt-12">{children}</Container>;
}

export default AuthLayout;
