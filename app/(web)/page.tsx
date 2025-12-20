import {
  BG,
  Button,
  Container,
  Logo,
  SingInLink,
} from "@/components/components";
import Link from "next/link";

function LandingPage() {
  return (
    <BG>
      <Container className="space-y-12">
        <nav className="flex items-center justify-between">
          <Logo>Todo</Logo>
          <SingInLink />
        </nav>
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center px-6 md:px-8 leading-12">
            <span className="text-transparent bg-clip-text bg-custom-gradient">
              Next.js Todo
            </span>{" "}
            Full-Stack Experience
          </h1>
          <h2 className="text-center text-lg font-semibold text-muted px-4">
            A full-stack task manager engineered with Next.js. Featuring secure
            Authentication, Role-Based Access, and Pro Subscriptions.
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button variant="gradient">
              <Link href={"/user"}>Get Free Demo</Link>
            </Button>
            <Button variant="secondary">
              <Link href={"/"}>View Source Code</Link>
            </Button>
          </div>
        </div>
      </Container>
    </BG>
  );
}

export default LandingPage;
