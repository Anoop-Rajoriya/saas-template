"use client";
import React, { useState } from "react";
import Alert from "../ui/Alert";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Link from "next/link";

type Fields = {
  name: string;
  emailAddress: string;
  password: string;
};

type Props = {
  onSubmit: (fields: Fields) => void;
  isLoading?: boolean;
  errors?: Partial<Fields & { global: string }>;
};

function SignupForm({ onSubmit, isLoading, errors }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, emailAddress: email, password });
  };

  return (
    <div className="card max-w-md w-full bg-card mx-auto    ">
      <form onSubmit={handleSubmit} className="card-body">
        <h1 className="card-title">Sign Up</h1>
        <p>Enter credentials to create an account</p>
        {errors && errors.global && (
          <Alert variant="error" title={errors.global} />
        )}
        <Input
          id="name"
          label="Name"
          placeholder="Enter your name"
          value={name}
          onChange={setName}
          disable={isLoading}
          error={errors?.name}
        />
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={setEmail}
          disable={isLoading}
          error={errors?.emailAddress}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={setPassword}
          disable={isLoading}
          error={errors?.password}
        />
        <Button type="submit" isLoading={isLoading} loadingText="Please wait">
          Sign Up
        </Button>
        <div className="text-center">
          Already have an account?{" "}
          <Button variant="link">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
