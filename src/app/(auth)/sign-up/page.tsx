"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { validateEmail, validateFullName } from "@/lib/utils";
import { BtnWithLoader, PageLoader } from "@/components/Loader";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";

type FormState = "signup" | "verify";

function SignupPage() {
  const router = useRouter();
  const { isLoaded, setActive, signUp } = useSignUp();
  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [code, setCode] = useState("");
  const [formState, setFormState] = useState<FormState>("signup");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    name: "",
    emailAddress: "",
    password: "",
    code: "",
    general: "",
  });

  if (!isLoaded) {
    return <PageLoader />;
  }

  const validateFields = (): boolean => {
    setError({
      name: "",
      emailAddress: "",
      password: "",
      code: "",
      general: "",
    });
    const errors: Partial<typeof error> = {};

    if (formState === "signup") {
      if (!name || !validateFullName(name)) {
        errors.name = "Enter valid name, (ex: jhon doe)";
      }
      if (!emailAddress || !validateEmail(emailAddress)) {
        errors.emailAddress = "Enter valid email address";
      }

      if (!password || !password.trim() || password.length < 8) {
        errors.password = "Password must be 8 characters long";
      }
    }

    if (formState === "verify") {
      if (!code || !code.trim()) {
        errors.code = "Enter code to verify";
      }
    }

    setError((pre) => ({ ...pre, ...errors }));
    return Object.keys(errors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    const isValid = validateFields();
    if (!isValid) return;

    setLoading(true);
    try {
      const [firstName, lastName] = name.split(" ");
      await signUp.create({
        emailAddress: emailAddress,
        password,
        firstName,
        lastName,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setFormState("verify");
    } catch (err: any) {
      console.error("Signup error: ", err.errors);
      if (isClerkAPIResponseError(err)) {
        const errors: Partial<typeof error> = {};

        err.errors.forEach((err) => {
          switch (err.code) {
            case "form_identifier_exists":
              errors.emailAddress =
                "Email address already in use, Please sign in instead";
              break;
            case "form_password_pwned":
              errors.password =
                "Password is weak, Please choose a stronger one";
              break;
            case "form_password_invalid":
              errors.password = "Password format is invalid";
              break;
            default:
              errors.general = err.longMessage;
          }
        });

        setError((pre) => ({ ...pre, ...errors }));
      } else {
        setError((pre) => ({ ...pre, general: "Unexpacted signup error" }));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    const isValid = validateFields();
    if (!isValid) return;

    setLoading(true);
    try {
      const verificationRes = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (verificationRes.status === "complete") {
        await setActive({ session: verificationRes.createdSessionId });
        router.push("/dashboard");
      }

      if (verificationRes.status !== "complete") {
        console.error("Verification error :", verificationRes);
        setError((pre) => ({
          ...pre,
          general: "Unexpacted verification error",
        }));
      }
    } catch (err: any) {
      console.log("Verification error :", err.errors);
      if (isClerkAPIResponseError(err)) {
        const errors: Partial<typeof error> = {};
        err.errors.forEach((err) => {
          switch (err.code) {
            case "form_code_incorrect":
              errors.code = "Incorrect verification code";
              break;
            case "verification_expired":
              errors.code = "This verification has expired";
              break;
            case "verification_failed":
              errors.general = "Too many failed attempts, try again to signup";
              break;
            default:
              errors.general = err.longMessage;
          }
        });
        setError((pre) => ({
          ...pre,
          ...errors,
        }));
      } else {
        setError((pre) => ({
          ...pre,
          general: "Unexpacted verification error",
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  if (formState === "verify") {
    return (
      <div className="flex-1 flex items-start justify-center pt-12">
        <div className="card w-full max-w-md shadow-sm py-4 px-2 flex flex-col">
          <h1 className="card-title font-bold text-xl capitalize text-base-content flex  justify-center">
            verify your account
          </h1>
          <p className="text-sm text-center">
            Enter your verification code sended to you registred email address
          </p>
          <form className="card-body" onSubmit={handleVerify}>
            {/* Error */}
            {error.general && (
              <div role="alert" className="alert alert-error alert-soft">
                <span>{error.general}</span>
              </div>
            )}
            {/* Email */}
            <div className="fieldset">
              <label htmlFor="email" className="fieldset-label">
                Verification Code *
              </label>
              <input
                className="input w-full"
                type="text"
                id="code"
                disabled={loading}
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              {error.code && <p className="text-xs text-error">{error.code}</p>}
            </div>

            <BtnWithLoader
              className="btn-primary w-full mt-4"
              loading={loading}
              type="submit"
            >
              Verify Account
            </BtnWithLoader>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-start justify-center pt-12">
      <div className="card w-full max-w-md shadow-sm py-4 px-2 flex flex-col">
        <h1 className="card-title font-bold text-xl capitalize text-base-content flex justify-center flex-col items-center">
          <span className="text-primary">welcom to saas template</span>
          signup your account
        </h1>
        <form className="card-body" onSubmit={handleSignup}>
          {/* Error */}
          {error.general && (
            <div role="alert" className="alert alert-error alert-soft">
              <span>{error.general}</span>
            </div>
          )}

          {/* Full Name */}
          <div className="fieldset">
            <label htmlFor="name" className="fieldset-label">
              Full Name *
            </label>
            <input
              className="input w-full"
              type="text"
              id="name"
              disabled={loading}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error.name && <p className="text-xs text-error">{error.name}</p>}
          </div>

          {/* Email */}
          <div className="fieldset">
            <label htmlFor="email" className="fieldset-label">
              Email Address *
            </label>
            <input
              className="input w-full"
              type="email"
              id="email"
              disabled={loading}
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
            {error.emailAddress && (
              <p className="text-xs text-error">{error.emailAddress}</p>
            )}
          </div>

          {/* Password */}
          <div className="fieldset">
            <label htmlFor="password" className="fieldset-label">
              Password *
            </label>
            <div className="join">
              <input
                className="input w-full join-item"
                type={isVisible ? "text" : "password"}
                id="password"
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setIsVisible((pre) => !pre)}
                className="join-item btn btn-ghost"
              >
                {isVisible ? <EyeIcon /> : <EyeOffIcon />}
              </span>
            </div>
            {error.password && (
              <p className="text-xs text-error">{error.password}</p>
            )}
          </div>

          {/* Captcha */}
          <div id="clerk-captcha" className="mx-auto"></div>

          <BtnWithLoader
            className="btn-primary w-full mt-4"
            loading={loading}
            type="submit"
          >
            Sign Up
          </BtnWithLoader>
        </form>
        <div className="card-action items-center">
          <p className="w-full text-center text-base-content">
            Have an account?{" "}
            <Link className="btn btn-link p-0" href={"/sign-in"}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
