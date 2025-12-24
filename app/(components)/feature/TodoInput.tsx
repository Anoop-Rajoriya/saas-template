"use client";

import React, { FC, useEffect, useState } from "react";
import clsx from "clsx";
import Checkbox from "../ui/Checkbox";
import { Todo } from "../type";

interface Props {
  value: Omit<Todo, "id">;
  onChange: (todo: Omit<Todo, "id">) => void;
  error?: string;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
}

const TodoInput: FC<Props> = ({
  value,
  onChange,
  error = "",
  loading = false,
  disabled = false,
  className = "",
}) => {
  const [text, setText] = useState(value.text || "");
  const [completed, setCompleted] = useState(value.completed || false);

  useEffect(() => {
    onChange({ text, completed });
  }, [text, completed]);

  return (
    <div>
      <div
        className={clsx(
          "input input-md md:input-xl outline-none shadow-none w-full",
          "bg-surface border-2 flex text-base md:text-lg gap-3",
          error.length
            ? "border-error/80 focus-within:border-error"
            : "focus-within:border-txt-muted",
          className
        )}
      >
        <Checkbox onChange={setCompleted} checked={completed} />
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          disabled={disabled || loading}
          className="flex-1 border-none outline-none bg-transparent text-inherit"
        />
        {loading && <span className="loading loading-sm text-txt-muted"></span>}
      </div>
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
};

export default TodoInput;
