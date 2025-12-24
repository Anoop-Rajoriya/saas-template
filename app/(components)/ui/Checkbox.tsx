import clsx from "clsx";
import React, { forwardRef, InputHTMLAttributes } from "react";

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange?: (completed: boolean) => void;
}

const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ onChange, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="checkbox"
        onChange={(e) => onChange?.(e.target.checked)}
        className={clsx(
          "checkbox checkbox-md md:checkbox-lg checkbox-primary checked:bg-custom-gradient border-2 border-border-main checked:border-transparent rounded-full"
        )}
        {...props}
      />
    );
  }
);

export default Checkbox;
