"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRef, useState } from "react";
import { XIcon } from "lucide-react";

function Header() {
  const { isLoaded, user } = useUser();
  const { signOut } = useAuth();
  const alertModelRef = useRef<HTMLDialogElement>(null);
  const [loading, setLoading] = useState(false);
  const handleModel = (show: boolean) => {
    if (alertModelRef.current) {
      if (show) {
        alertModelRef.current.showModal();
      } else {
        alertModelRef.current.close();
      }
    }
  };
  const handleSignout = async () => {
    setLoading(true);
    signOut()
      .catch((err) => console.log("Signout error", err))
      .finally(() => setLoading(true));
  };

  if (!isLoaded) return <header></header>;

  return (
    <header className="navbar">
      <div className="flex-1 flex justify-start gap-2">
        <figure className="avatar ring ring-primary ring-offset-base-100 ring-offset-2 size-8 rounded-full">
          {user?.hasImage ? (
            <Image src={user.imageUrl} alt={user.firstName + "profile"} />
          ) : (
            <div
              className="font-semibold text-primary
            flex items-center justify-center"
            >
              {user?.firstName?.slice(0, 2).toUpperCase()}
            </div>
          )}
        </figure>
        <div className="text-xs">
          <h1 className="font-bold capitalize">{user?.fullName}</h1>
          <h2>{user?.emailAddresses[0].emailAddress}</h2>
        </div>
      </div>
      <button
        onClick={() => handleModel(true)}
        className="btn btn-soft btn-error"
      >
        Signout
      </button>
      {/* Alert */}
      <dialog ref={alertModelRef} className="modal">
        <div className="modal-box bg-base-100 text-base-content space-y-4">
          <form method="dialog">
            <button
              disabled={loading}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              <XIcon />
            </button>
          </form>

          <h3 className="text-lg font-semibold">Signout Account</h3>

          <p className="text-sm opacity-80">Confirm to signout your account.</p>

          <div className="modal-action">
            <button onClick={handleSignout} className="btn btn-error">
              {!loading ? (
                "Confirm"
              ) : (
                <span className="loading loading-spinner"></span>
              )}
            </button>
          </div>
        </div>
      </dialog>
    </header>
  );
}

export default Header;
