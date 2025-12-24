"use client";

import React, { useState } from "react";
import {
  Container,
  Logo,
  ThemeToggle,
  TodoInput,
  Todo,
  TodoList,
} from "../(components)";

// Mock initial data
const initialTodos: Todo[] = [
  { id: "1", text: "Complete online JavaScript course", completed: true },
  { id: "2", text: "Jog around the park 3x", completed: false },
  { id: "3", text: "10 minutes meditation", completed: false },
  { id: "4", text: "Read for 1 hour", completed: false },
  { id: "5", text: "Pick up groceries", completed: false },
  { id: "6", text: "Complete Todo App on Frontend Mentor", completed: false },
];

function LandingPage() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [todo, setTodo] = useState<Omit<Todo, "id">>({
    text: "",
    completed: false,
  });
  const handleAddTodo = () => {};
  const handleToggleTodo = () => {};
  const handleDeleteTodo = () => {};
  const handleClearTodo = () => {};
  const handleTodoFilter = () => {};
  return (
    <Container className="space-y-8">
      <header className="flex items-center justify-between">
        <Logo>Todo</Logo>
        <nav>
          <ThemeToggle />
        </nav>
      </header>
      <main className="space-y-4">
        <form onSubmit={handleAddTodo}>
          <TodoInput value={todo} onChange={setTodo} />
        </form>
        <TodoList
          todos={todos}
          filter="all"
          onClearCompleted={handleClearTodo}
          onDelete={handleDeleteTodo}
          onToggle={handleToggleTodo}
          onFilterChange={handleTodoFilter}
        />
      </main>
      <footer className="text-txt-muted flex items-center justify-center">
        <p>Drage and drop to reorder list</p>
      </footer>
    </Container>
  );
}

export default LandingPage;
