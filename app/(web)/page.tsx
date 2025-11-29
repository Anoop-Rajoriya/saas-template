"use client";
import React, { ButtonHTMLAttributes, useState } from "react";
import { Container, ToggleTheme } from "@/components";
import Image from "next/image";

type Todo = {
  title: string;
  completed: boolean;
};

type Tab = "all" | "active" | "completed";

function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const handleAddTodo = function (event: React.FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const formValues = {
      title: String(formData.get("title")),
      completed: formData.get("completed") === "on" ? true : false,
    };
    setError("");

    if (!formValues.title || !formValues.title.trim()) {
      return setError("Title required");
    }

    if (formValues.title.length < 4) {
      return setError("Title at least 4 char long");
    }

    setTodos((pre) => [formValues, ...pre]);
  };
  const handleClearCompletedTodos = function () {};
  const handleChangeTab = function (e: any) {
    const name = e.currentTarget.getAttribute("name");
    if (activeTab !== name) setActiveTab(name);
  };
  const getTodoCounts = function () {
    const notCompletedTodos = todos.filter(({ completed }) => !completed);
    return notCompletedTodos.length
      ? `${notCompletedTodos.length}
    items left`
      : "no items left";
  };
  const getTodos = function (): Todo[] {
    return todos.filter((todo) => {
      if (activeTab === "all") return true;
      if (activeTab === "active") return !todo.completed;
      if (activeTab === "completed") return todo.completed;
    });
  };
  const handleTodoComplete = function () {};

  return (
    <Container>
      <div className="flex flex-col gap-10">
        <header className="flex justify-between items-center">
          <h1 className="lg:text-3xl text-2xl font-bold uppercase font-josefin tracking-[0.4em] text-gray-200">
            todo
          </h1>
          <div>
            <ToggleTheme />
          </div>
        </header>
        <section className="mx-auto w-full max-w-2xl space-y-4">
          <form
            onSubmit={handleAddTodo}
            className="bg-card-bg px-4 flex items-center justify-center"
          >
            <label className="border-2 border-border-main size-5 md:size-6 rounded-full flex items-center justify-center relative p-0.5 has-checked:bg-check-gradient">
              <input
                name="completed"
                type="checkbox"
                className="absolute opacity-0 peer"
              />
              <Image
                src={"/icons/icon-check.svg"}
                alt="check icon"
                width={16}
                height={16}
                className="peer-checked:inline-block hidden"
              />
            </label>
            <input
              name="title"
              type="text"
              placeholder="Add a new todo..."
              className="flex-1 focus-within:outline-none pl-4 py-4 pt-5 leading-0 text-lg md:text-xl text-text-main"
            />
          </form>
          <div className="p-2 bg-card-bg">
            {getTodos().length ? (
              <ul>
                {getTodos().map((todo, index) => (
                  <li
                    key={index}
                    className="flex py-4 px-2 border-b-2 border-border-main space-x-4"
                  >
                    <label className="border-2 border-border-main size-5 md:size-6 rounded-full flex items-center justify-center relative p-0.5 has-checked:bg-check-gradient">
                      <input
                        name="completed"
                        type="checkbox"
                        checked={todo.completed ? true : false}
                        onChange={handleTodoComplete}
                        className="absolute opacity-0 peer"
                      />
                      <Image
                        src={"/icons/icon-check.svg"}
                        alt="check icon"
                        width={16}
                        height={16}
                        className="peer-checked:inline-block hidden"
                      />
                    </label>
                    <p
                      className={
                        todo.completed
                          ? "line-through text-text-muted"
                          : "text-text-main"
                      }
                    >
                      {todo.title}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <ul>no items available</ul>
            )}
            <div className="flex gap-2 justify-between items-center py-4 px-2 text-text-muted font-bold">
              <span className="text-text-muted">{getTodoCounts()}</span>
              <div className="flex gap-4">
                <button
                  onClick={handleChangeTab}
                  name="all"
                  className={
                    activeTab === "all"
                      ? "text-bright-blue"
                      : "hover:text-text-main"
                  }
                >
                  All
                </button>
                <button
                  onClick={handleChangeTab}
                  name="active"
                  className={
                    activeTab === "active"
                      ? "text-bright-blue"
                      : "hover:text-text-main"
                  }
                >
                  Active
                </button>
                <button
                  onClick={handleChangeTab}
                  name="completed"
                  className={
                    activeTab === "completed"
                      ? "text-bright-blue"
                      : "hover:text-text-main"
                  }
                >
                  Completed
                </button>
              </div>
              <button
                onClick={handleClearCompletedTodos}
                className="hover:text-text-main"
              >
                Clear Completed
              </button>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default Home;
