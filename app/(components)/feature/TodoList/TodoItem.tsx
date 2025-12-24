// components/TodoItem.tsx
import React from "react";
import Checkbox from "../../ui/Checkbox";
import { Todo } from "../../type";
import Image from "next/image";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete }) => {
  return (
    <li className="group p-4 md:p-5 border-b border-border-main last:border-b-0 bg-surface flex items-center">
      <div
        onClick={() => onToggle(todo.id)}
        className="flex-1 flex items-center"
      >
        <Checkbox checked={todo.completed} />
        <p
          className={`flex-1 ml-4 md:ml-6 font-josefin text-sm md:text-lg transition-all cursor-pointer select-none ${
            todo.completed ? "text-txt-muted line-through" : "text-txt-main"
          }`}
        >
          {todo.text}
        </p>
      </div>

      {/* Delete Button - Shows on hover */}
      <button
        onClick={() => onDelete(todo.id)}
        className="shrink-0 ml-4 text-secondary hover:text-primary transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 md:w-5 md:h-5 cursor-pointer"
        aria-label="Delete todo"
      >
        <Image
          src={"/icons/icon-cross.svg"}
          alt="cross icon"
          width={24}
          height={24}
        />
      </button>
    </li>
  );
};

export default TodoItem;
