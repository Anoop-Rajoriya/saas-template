import parseClerkErrors, { Errors } from "@/lib/parseClerkErrors";
import { useSignUp } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const INITIAL_TIMER = 60;

function useSignup() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isVerifing, setIsVerifing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [timeLeft, setTimeLeft] = useState(0);

  const signup = async (
    emailAddress: string,
    password: string,
    name: string
  ) => {
    if (!isLoaded || isLoading) return;
    try {
      setIsLoading(true);
      setErrors({});

      await signUp.create({
        firstName: name,
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setIsVerifing(true);
      setTimeLeft(INITIAL_TIMER);
    } catch (error) {
      setErrors(parseClerkErrors(error));
    } finally {
      setIsLoading(false);
    }
  };

  const verify = async (code: string) => {
    if (!isLoaded || isLoading) return;
    try {
      setIsLoading(true);
      setErrors({});

      const verifyAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (verifyAttempt.status === "complete") {
        await setActive({
          session: verifyAttempt.createdSessionId,
        });
      } else {
        console.warn(
          "Email verification failed, status: ",
          verifyAttempt.status
        );
        throw new Error("Failed to verify email. Retry after some time.");
      }
    } catch (error) {
      setErrors(parseClerkErrors(error));
    } finally {
      setIsLoading(false);
    }
  };

  const resend = async () => {
    if (!isLoaded || isLoading || timeLeft > 0) return;
    try {
      setIsLoading(true);
      setErrors({});
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setTimeLeft(INITIAL_TIMER);
    } catch (error) {
      setErrors(parseClerkErrors(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((preTime) => preTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return {
    signup,
    verify,
    resend,
    isVerifing,
    isLoading,
    errors,
    timeLeft,
    isTimerActive: timeLeft > 0,
  };
}

export default useSignup;
