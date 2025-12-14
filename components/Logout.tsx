"use client";
import { useAuth } from "@clerk/nextjs";
import { LogOutIcon } from "lucide-react";
import React, { useState } from "react";

function Logout() {
  const [isLoading, setIsLoading] = useState(false);
  const { signOut } = useAuth();
  async function handlelogout() {
    try {
      setIsLoading(true);
      await signOut();
    } catch (error: any) {
      console.error("logout error: ", error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <button
      onClick={handlelogout}
      disabled={isLoading}
      title="Logout account"
      className="text-white hover:text-white/80 active:text-white cursor-pointer size-7 inline-flex items-center justify-center disabled:cursor-none"
    >
      {!isLoading ? (
        <LogOutIcon className="" />
      ) : (
        <span className="loading "></span>
      )}
    </button>
  );
}

export default Logout;
