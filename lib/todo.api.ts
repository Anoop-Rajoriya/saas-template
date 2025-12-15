import api from "./axios";
import { NewTodo, Todo } from "@/components/types";

export default {
  async list(): Promise<Todo[]> {
    const res = await api.get("/todos");
    return res.data;
  },
  async add(payload: NewTodo): Promise<Todo> {
    const res = await api.post("/todos", payload);
    return res.data;
  },
  async toggle(id: string, completed: boolean): Promise<void> {
    await api.patch(`/todos/${id}`, { completed });
  },
  async remove(id: string): Promise<void> {
    await api.delete(`/todos/${id}`);
  },
  async clear(): Promise<void> {
    await api.delete("/todos/clear");
  },
};
