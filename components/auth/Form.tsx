"use client";
import { FormEvent } from "react";
import { AlertCircleIcon } from "lucide-react";
import { AuthForm } from "../types";

function Form({
  onSubmit,
  isLoading,
  children,
  loadingLable = "Processing...",
  initialLable = "Submit",
  error = "",
  className = "",
}: AuthForm) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-3 ${className}`}>
      {error && (
        <div role="alert" className="alert alert-error">
          <AlertCircleIcon />
          <span>Error! {error}</span>
        </div>
      )}
      <div className="space-y-2">{children}</div>
      <button
        type="submit"
        disabled={isLoading}
        className={`btn w-full ${
          !isLoading
            ? "bg-check-gradient text-gray-100 hover:opacity-85 active:opacity-100"
            : ""
        }`}
      >
        {isLoading ? (
          <>
            <span className="loading"></span> {loadingLable}
          </>
        ) : (
          initialLable
        )}
      </button>
    </form>
  );
}

export default Form;
