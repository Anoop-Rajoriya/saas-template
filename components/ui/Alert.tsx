import clsx from "clsx";
import { ReactNode } from "react";
import Button from "./Button";
import { CheckCircleIcon, InfoIcon } from "lucide-react";

type AlertType = "success" | "error" | "warning" | "info";

type Props = {
  type: AlertType;
  message: string;
  description?: string;
  action?: ReactNode;
  onAction?: () => void;
};

export default function Alert({
  type,
  message,
  description,
  action,
  onAction,
}: Props) {
  const typeClasses: Record<AlertType, string> = {
    success: "alert-success",
    error: "alert-error",
    warning: "alert-warning",
    info: "alert-info",
  };

  return (
    <div
      role="alert"
      className={clsx(
        "alert alert-vertical md:alert-horizontal",
        typeClasses[type]
      )}
    >
      {type === "success" && <CheckCircleIcon />}
      {type === "info" && <InfoIcon />}
      <div>
        <h3 className="font-bold">{message}</h3>
        {description && <div className="text-xs">{description}</div>}
      </div>
      {action && <Button onClick={onAction}>{action}</Button>}
    </div>
  );
}
