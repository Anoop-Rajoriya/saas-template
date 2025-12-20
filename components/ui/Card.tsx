import React, { ReactNode } from "react";

type Props = {
  title?: string;
  description?: string;
  footer?: string;
  children: ReactNode;
};

function Card({ title, description, children, footer }: Props) {
  return (
    <div className="card bg-card border border-border-main rounded-2xl shadow-sm">
      <div className="card-body gap-4">
        {title && <h3 className="card-title">{title}</h3>}
        {description && (
          <p className="text-sm text-base-content/70">{description}</p>
        )}
        {children}
      </div>
      {footer && <div className="card-actions px-6 pb-6">{footer}</div>}
    </div>
  );
}

export default Card;
