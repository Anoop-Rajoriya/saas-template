import React from "react";

type Props = {
  dialogRef: React.RefObject<HTMLDialogElement>;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  closeOnBackdrop?: boolean;
};

function Dialog({
  dialogRef,
  title,
  children,
  actions,
  closeOnBackdrop = true,
}: Props) {
  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onClick={(e) => {
        if (!closeOnBackdrop) return;
        if (e.target === e.currentTarget) {
          dialogRef.current?.close();
        }
      }}
    >
      <div className="modal-box bg-card-bg border-2 border-border-main rounded-2xl">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => dialogRef.current?.close()}
        >
          ✕
        </button>

        {title && <h3 className="font-bold text-lg mb-4">{title}</h3>}

        <div className="space-y-4">{children}</div>

        {actions && <div className="modal-action">{actions}</div>}
      </div>
    </dialog>
  );
}

export default Dialog;
