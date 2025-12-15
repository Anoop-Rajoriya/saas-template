"use client";
import { useState } from "react";
import { TodoInput as Props, NewTodo } from "../types";
import Check from "./Check";

const EMPTY_TODO: NewTodo = {
  title: "",
  completed: false,
};

function Input({ onSubmit }: Props) {
  const [todo, setTodo] = useState<NewTodo>(EMPTY_TODO);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!todo.title.trim() || loading) return;

    try {
      setLoading(true);
      setError(null);
      await onSubmit(todo);
      setTodo(EMPTY_TODO);
    } catch {
      setError("Could not create todo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-6 px-4 bg-card-bg border-2 border-border-main rounded-sm"
      >
        <Check
          disabled={loading}
          checked={todo.completed}
          onChange={(completed) => setTodo((pre) => ({ ...pre, completed }))}
        />

        <input
          value={todo.title}
          onChange={(e) => setTodo((p) => ({ ...p, title: e.target.value }))}
          placeholder="Create a new todo..."
          disabled={loading}
          className="flex-1 py-4 font-semibold bg-transparent outline-none disabled:opacity-60"
        />

        {loading && <span className="loading loading-spinner loading-sm" />}
      </form>

      {error && (
        <p className="px-6 mt-2 text-sm text-error font-semibold">{error}</p>
      )}
    </div>
  );
}

export default Input;
