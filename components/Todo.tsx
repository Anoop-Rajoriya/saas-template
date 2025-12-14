"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Checkbox from "./Checkbox";

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};
export type NewTodo = Omit<Todo, "id">;

type TodoFormProps = {
  value?: Todo;
  onSubmit: (val: NewTodo) => void | Promise<void>;
};

const EMPTY_TODO: NewTodo = {
  title: "",
  completed: false,
};

function TodoForm({ value, onSubmit }: TodoFormProps) {
  const [todo, setTodo] = useState<NewTodo>(EMPTY_TODO);

  useEffect(() => {
    if (value)
      [
        setTodo({
          title: value.title,
          completed: value.completed,
        }),
      ];
  }, [value]);

  const handleSubmit = async function (e: React.FormEvent) {
    e.preventDefault();
    if (!todo.title.trim()) return;
    await onSubmit(todo);
    setTodo(EMPTY_TODO);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center gap-6 px-6 bg-card-bg border-2 border-border-main rounded-sm"
    >
      <Checkbox
        checked={todo.completed}
        onChange={(completed) => {
          setTodo((pre) => ({ ...pre, completed }));
        }}
      />
      <input
        value={todo.title}
        placeholder="Create a new todo..."
        onChange={(e) => {
          setTodo((pre) => ({ ...pre, title: e.target.value }));
        }}
        type="text"
        className="border-none outline-none flex-1 py-4 font-semibold"
      />
    </form>
  );
}

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  className?: string;
};

function TodoItem({ todo, onToggle, onDelete, className = "" }: TodoItemProps) {
  return (
    <li
      data-id={todo.id}
      className={`flex items-center gap-6 px-6 group ${className}`}
    >
      <Checkbox
        checked={todo.completed}
        onChange={(completed) => {
          onToggle(todo.id, completed);
        }}
      />
      <p
        className={`flex-1 py-4 font-semibold min-w-0 wrap-break-word ${
          todo.completed ? "line-through text-text-muted" : ""
        }`}
      >
        {todo.title}
      </p>
      <button
        onClick={() => onDelete(todo.id)}
        className="block md:hidden group-hover:block"
      >
        <Image
          className="cursor-pointer"
          src={"/icons/icon-cross.svg"}
          alt="delete icon"
          width={18}
          height={18}
        />
      </button>
    </li>
  );
}

export { TodoForm, TodoItem };
