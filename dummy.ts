import { Todo } from "./app/generated/prisma/client"; // If you have generated prisma client

export const DUMMY_TODOS: Partial<Todo>[] = [
  {
    id: "clq4j2s00000108l4f1x2a3b",
    title: "Complete online JavaScript course",
    completed: true,
    description: "Finish the module on Asynchronous JavaScript and Promises.",
    createdAt: new Date("2023-11-20T10:00:00Z"),
    updatedAt: new Date("2023-11-21T14:30:00Z"),
  },
  {
    id: "clq4j3k00000208l4h5y6c7d",
    title: "Jog around the park 3x",
    completed: false,
    description: null,
    createdAt: new Date("2023-11-22T06:30:00Z"),
    updatedAt: new Date("2023-11-22T06:30:00Z"),
  },
  {
    id: "clq4j4m00000308l4j8z9e0f",
    title: "10 minutes meditation",
    completed: false,
    description: "Use the Headspace app for guided focus.",
    createdAt: new Date("2023-11-22T07:15:00Z"),
    updatedAt: new Date("2023-11-22T07:15:00Z"),
  },
  {
    id: "clq4j5n00000408l4k1w2g3h",
    title: "Read for 1 hour",
    completed: false,
    description: null,
    createdAt: new Date("2023-11-22T20:00:00Z"),
    updatedAt: new Date("2023-11-22T20:00:00Z"),
  },
  {
    id: "clq4j6p00000508l4m4r5i6j",
    title: "Pick up groceries",
    completed: false,
    description: "Milk, Eggs, Bread, and Coffee.",
    createdAt: new Date("2023-11-23T09:00:00Z"),
    updatedAt: new Date("2023-11-23T09:00:00Z"),
  },
  {
    id: "clq4j7q00000608l4o7t8k9l",
    title: "Complete Todo App on Frontend Mentor",
    completed: false,
    description: "Implement drag and drop functionality and dark mode toggle.",
    createdAt: new Date("2023-11-23T11:00:00Z"),
    updatedAt: new Date("2023-11-23T15:45:00Z"),
  },
];
