import { Container } from "@/components";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

function Signup() {
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
              Create Your Account
            </h1>
            <h2 className="text-center text-text-muted text-lg font-light">
              Start your live demonstrate of next.js todo saas template
            </h2>
          </div>
          {/* <SignupForm/> */}
          <div>
            <p className="text-center text-text-muted">
              Already have an account?{" "}
              <Link
                href={"/login"}
                className="text-bright-blue hover:opacity-90"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Signup;
