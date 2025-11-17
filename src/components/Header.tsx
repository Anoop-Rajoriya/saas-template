"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";

function Header() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const handleLogout = () => {
    setLoading(true);
    signOut()
      .then()
      .catch()
      .finally(() => setLoading(false));
  };
  return (
    <header className="navbar">
      <div className="flex-1">
        <span className="text-primary font-bold">SaasTemplate</span>
      </div>
      <div className="flex-none space-x-2">
        <div className="avatar">
          {user?.hasImage ? (
            <div className="w-8 rounded-full">
              <Image src={user.imageUrl} alt="User image" />
            </div>
          ) : (
            <div className="w-8 rounded-full flex items-center justify-center border text-sm font-semibold">
              {user?.firstName?.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="btn btn-soft btn-error btn-sm"
        >
          {loading && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
