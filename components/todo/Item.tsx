"use client";
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { TodoItem as Props } from "../types";
import Check from "./Check";

function Item({ todo, onToggle, onDelete, className }: Props) {
  const [syncing, setSyncing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleToggle() {
    if (syncing) return;
    try {
      setSyncing(true);
      setError(null);
      await onToggle(todo.id, !todo.completed);
    } catch {
      setError("Update failed");
    } finally {
      setSyncing(false);
    }
  }

  async function handleDelete() {
    if (deleting) return;
    try {
      setDeleting(true);
      setError(null);
      await onDelete(todo.id);
    } catch {
      setError("Delete failed");
      setDeleting(false); // keep item visible on failure
    }
  }

  return (
    <li className={`relative ${deleting ? "opacity-60" : ""} ${className}`}>
      <div className="flex items-center gap-4 p-4">
        <Check
          checked={todo.completed}
          onChange={handleToggle}
          disabled={syncing || deleting}
        />

        <span
          className={`flex-1 font-semibold ${
            todo.completed ? "line-through text-text-muted" : "text-text-main"
          }`}
        >
          {todo.title}
        </span>

        {/* Toggle feedback */}
        {syncing && <span className="loading loading-spinner loading-xs" />}

        {/* Delete button */}
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="btn btn-ghost btn-xs text-text-muted hover:text-error disabled:text-error"
        >
          {deleting ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            <PlusIcon className="w-4 h-4 rotate-45" />
          )}
        </button>
      </div>

      {error && (
        <p className="px-4 pb-2 text-xs text-error font-semibold">{error}</p>
      )}
    </li>
  );
}

export default Item;
