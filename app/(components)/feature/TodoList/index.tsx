"use client";
import TodoItem from "./TodoItem";
import TodoFilters from "./TodoFilters";
import { Todo, FilterType } from "../../type";
import { FC } from "react";

interface Props {
  todos: Todo[];
  filter: FilterType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
}

const TodoList: FC<Props> = ({
  todos,
  filter,
  onToggle,
  onDelete,
  onFilterChange,
  onClearCompleted,
}) => {
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // 'all'
  });

  const itemsLeft = todos.filter((t) => !t.completed).length;

  return (
    <div className="w-full">
      {/* Main List Card */}
      <div className="bg-surface rounded border-2 border-border-main overflow-hidden shadow-2xl">
        <ul>
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
          {filteredTodos.length === 0 && (
            <li className="p-6 text-center text-secondary font-josefin">
              No {filter === "all" ? "" : filter} tasks.
            </li>
          )}
        </ul>

        {/* Footer inside the card */}
        <div className="flex items-center justify-between p-4 md:p-5 text-sm font-josefin text-txt-muted border-t border-border-main bg-surface relative">
          <p>{itemsLeft} items left</p>

          {/* Filters - Visible on Desktop ONLY */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full pt-5">
            <TodoFilters
              currentFilter={filter}
              onFilterChange={onFilterChange}
            />
          </div>

          <button
            onClick={onClearCompleted}
            className="hover:text-primary transition-colors"
          >
            Clear Completed
          </button>
        </div>
      </div>

      {/* Separate Filter Card - Visible on Mobile ONLY */}
      <div className="mt-4 md:hidden bg-surface rounded-md shadow-2xl p-4">
        <TodoFilters currentFilter={filter} onFilterChange={onFilterChange} />
      </div>
    </div>
  );
};

export default TodoList;
