import { Container } from "@/components";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

function Login() {
  return (
    <Container>
      <div>
        <Link
          href={"/"}
          className="btn btn-link no-underline text-text-muted hover:text-text-main"
        >
          <ArrowLeftIcon className="size-4" />
          Back to home
        </Link>
        <div className="pt-6 space-y-4">
          <div>
            <h1 className="text-center text-2xl md:text-3xl font-bold">
              Welcome Back
            </h1>
            <h2 className="text-center text-text-muted text-lg font-light">
              Enter your credentials to access your account
            </h2>
          </div>
          {/* <LoginForm/> */}
          <div>
            <p className="text-center text-text-muted">
              don't have an account?{" "}
              <Link
                href={"/signup"}
                className="text-bright-blue hover:opacity-90"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Login;
