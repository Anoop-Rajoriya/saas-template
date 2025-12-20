import React from "react";

type Props = {
  type: "info" | "success" | "warning" | "error";
  title: string;
  description?: string;
  action: string;
  onAction: () => void;
};

function Alert({
  type = "info", // info | success | warning | error
  title,
  description,
  action,
  onAction,
}: Props) {
  const typeClassMap = {
    info: "alert-info",
    success: "alert-success",
    warning: "alert-warning",
    error: "alert-error",
  };
  return (
    <div
      role="alert"
      className={`alert ${typeClassMap[type]} bg-card-bg border border-border-main rounded-xl`}
    >
      <div className="flex flex-col gap-1">
        {title && <h4 className="font-semibold">{title}</h4>}
        {description && (
          <p className="text-sm text-base-content/80">{description}</p>
        )}
      </div>
      {action && <div onClick={onAction}>{action}</div>}
    </div>
  );
}

export default Alert;
