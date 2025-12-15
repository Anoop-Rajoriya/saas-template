import { ComponentProps } from "react";

export interface AuthForm extends Omit<ComponentProps<"form">, "onSubmit"> {
  onSubmit: () => Promise<void>;
  isLoading: boolean;
  loadingLable?: string;
  initialLable?: string;
  error?: string;
}

export interface AuthInput extends Omit<ComponentProps<"input">, "onChange"> {
  label: string;
  onChange: (value: string) => void;
  error?: string;
  value?: string;
  validationMessage?: string;
}

export type Container = {
  children: React.ReactNode;
  showBg?: boolean;
  className?: string;
};

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};
export type NewTodo = Omit<Todo, "id">;

export type TodoInput = {
  value?: Todo;
  onSubmit: (val: NewTodo) => Promise<void>;
};

export type TodoItem = {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  className?: string;
};

export type TodoCheckInput = {
  checked: boolean;
  onChange: (completed: boolean) => void;
  disabled?: boolean; // syncing / deleting
};
