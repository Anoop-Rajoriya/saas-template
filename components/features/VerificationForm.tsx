"use client";

import React, { FormEvent, useState } from "react";
import Alert from "../ui/Alert";
import Button from "../ui/Button";
import Input from "../ui/Input";

type Props = {
  onVerify: (val: string) => void;
  onResend: () => void;
  errors: { code?: string; global?: string };
  isLoading: boolean;
  timeLeft: number;
  isTimerActive: boolean;
};

function VerificationForm({
  onVerify,
  onResend,
  errors,
  isLoading,
  timeLeft,
  isTimerActive,
}: Props) {
  const [code, setCode] = useState("");
  const handleVerification = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onVerify(code);
  };
  return (
    <div className="card max-w-md w-full bg-card mx-auto    ">
      <form onSubmit={handleVerification} className="card-body">
        <h1 className="card-title">Verify Email Address</h1>
        {errors && errors.global && (
          <Alert variant="error" title={errors.global} />
        )}
        <Input
          id="code"
          label="Verificaton Code"
          placeholder="Enter verification code..."
          value={code}
          onChange={setCode}
          disable={isLoading}
          error={errors?.code}
        />
        <Button type="submit" isLoading={isLoading} loadingText="Verifing...">
          Verify
        </Button>

        <div className="text-center">
          <Button onClick={onResend} variant="link" disabled={isTimerActive}>
            Resend verification code{" "}
            {isTimerActive && <span className="font-semibold">{timeLeft}</span>}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default VerificationForm;
