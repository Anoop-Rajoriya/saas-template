"use client";
import React, { useEffect, useState } from "react";
import { Todo, NewTodo } from "@/components/types";
import {
  Container,
  Logo,
  Logout,
  ToggleTheme,
  TodoInput,
  TodoItem,
} from "@/components";
import TodoApi from "@/lib/todo.api";

type TabSatate = "all" | "active" | "completed";

function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTab, setActiveTab] = useState<TabSatate>("all");
  const [clearing, setClearing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    TodoApi.list()
      .then((data: any) => {
        setTodos(data.todos);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(todo: NewTodo) {
    const response: any = await TodoApi.add(todo);
    console.log(response);
    setTodos((pre) => [response.newTodo, ...pre]);
  }
  async function handleToggle(id: string, completed: boolean) {
    setTodos((pre) =>
      pre.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );
    try {
      await TodoApi.toggle(id, completed);
    } catch (error) {
      setTodos((pre) =>
        pre.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
      console.error(`Todo Toggle error: ${error}`);
      throw new Error("Toggle failed!");
    }
  }

  async function handleDelete(id: string) {
    setTodos((pre) => pre.filter((todo) => todo.id !== id));
    await TodoApi.remove(id);
  }

  async function handleClearCompleted() {
    setTodos((pre) => pre.filter((todo) => !todo.completed));
    try {
      setClearing(true);
      await TodoApi.clear();
    } catch (error) {
      throw error;
    } finally {
      setClearing(false);
    }
  }

  function getTodos(): Todo[] {
    if (activeTab === "active") {
      return todos.filter((todo) => !todo.completed);
    } else if (activeTab === "completed") {
      return todos.filter((todo) => todo.completed);
    } else {
      return todos;
    }
  }
  const unCompletedTodos = (): string => {
    const count = todos.filter((todo) => !todo.completed).length;
    if (count > 1) {
      return `${count} items left`;
    } else if (count > 0) {
      return "1 item left";
    } else {
      return "no items left";
    }
  };

  return (
    <Container showBg>
      <div className="space-y-12">
        <header className="flex items-center justify-between">
          <Logo>Todo</Logo>
          <nav className="space-x-4">
            <ToggleTheme />
            <Logout />
          </nav>
        </header>
        <div className="space-y-4">
          <TodoInput onSubmit={handleAdd} />
          <div className="bg-card-bg border-border-main border-2 rounded-sm">
            <ul>
              {loading ? (
                <p className="p-4 text-center text-text-muted font-semibold">
                  loading todos...
                </p>
              ) : getTodos().length > 0 ? (
                getTodos().map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                    className="border-b-2 border-border-main"
                  />
                ))
              ) : (
                <p className="p-4 text-center text-text-muted font-semibold">
                  no items found!
                </p>
              )}
            </ul>
            <div className="flex items-center  justify-between text-sm md:text-base font-semibold p-4">
              <button className="text-text-muted">{unCompletedTodos()}</button>
              <div className="hidden md:flex items-center justify-between gap-4">
                {[
                  {
                    id: "all",
                    label: "All",
                    handler: () => setActiveTab("all"),
                  },
                  {
                    id: "active",
                    label: "Active",
                    handler: () => setActiveTab("active"),
                  },
                  {
                    id: "completed",
                    label: "Completed",
                    handler: () => setActiveTab("completed"),
                  },
                ].map(({ id, label, handler }) => (
                  <button
                    key={id}
                    onClick={handler}
                    className={`cursor-pointer transition-colors ease-out duration-100 ${
                      activeTab === id
                        ? "text-bright-blue"
                        : "text-text-muted hover:text-bright-blue active:text-text-main"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <button
                onClick={handleClearCompleted}
                disabled={clearing}
                className={`text-text-muted ${
                  clearing
                    ? "cursor-not-allowed"
                    : "hover:text-bright-blue active:text-text-main cursor-pointer"
                }`}
              >
                {clearing ? "Clearing..." : "Clear Completed"}
              </button>
            </div>
          </div>
          <div className="flex md:hidden items-center justify-between gap-4 bg-card-bg p-4 border-2 border-border-main rounded-sm">
            {[
              {
                id: "all",
                label: "All",
                handler: () => setActiveTab("all"),
              },
              {
                id: "active",
                label: "Active",
                handler: () => setActiveTab("active"),
              },
              {
                id: "completed",
                label: "Completed",
                handler: () => setActiveTab("completed"),
              },
            ].map(({ id, label, handler }) => (
              <button
                key={id}
                onClick={handler}
                className={`cursor-pointer transition-colors ease-out duration-100 ${
                  activeTab === id
                    ? "text-bright-blue"
                    : "text-text-muted hover:text-bright-blue active:text-text-main"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default HomePage;
