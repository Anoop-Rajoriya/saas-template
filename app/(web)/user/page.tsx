"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { Todo, NewTodo } from "@/components/types";
import {
  Container,
  Logo,
  Logout,
  ToggleTheme,
  TodoInput,
  TodoItem,
  Input,
} from "@/components";
import TodoApi from "@/lib/todo.api";
import { AlertCircleIcon } from "lucide-react";

type TabState = "all" | "active" | "completed";
type PlanType = "free" | "pro" | "enterprise";

interface PlanDetail {
  id: PlanType;
  label: string;
  price: string;
  description: string;
}

const PLANS: PlanDetail[] = [
  {
    id: "pro",
    label: "Pro",
    price: "₹199 / month",
    description: "For individual developers and freelancers",
  },
  {
    id: "enterprise",
    label: "Enterprise",
    price: "₹299 / month",
    description: "For teams, orgs, and serious scale",
  },
];

const PLAN_LIMITS: Record<PlanType, number> = {
  free: 3,
  pro: 7,
  enterprise: Infinity,
};

function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTab, setActiveTab] = useState<TabState>("all");
  const [isClearing, setIsClearing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<PlanType>("free");
  const [isSubscriptionExpired, setIsSubscriptionExpired] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [selectedUpgradePlan, setSelectedUpgradePlan] =
    useState<PlanType>("pro");
  const [isProcessingPlan, setIsProcessingPlan] = useState(false);

  const upgradePlanModalRef = useRef<HTMLDialogElement>(null);
  const cancelPlanModalRef = useRef<HTMLDialogElement>(null);

  // --- Logic & Handlers ---

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const data: any = await TodoApi.list();
      setTodos(Array.isArray(data.todos) ? data.todos : []);
      setCurrentPlan(data.subscriptionPlan || "free");
      setIsSubscriptionExpired(data.isExpired || false);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = async (todo: NewTodo) => {
    if (isSubscriptionExpired) {
      setAlertMessage("Your subscription has expired. Please upgrade.");
      return;
    }

    const limit = PLAN_LIMITS[currentPlan];
    if (todos.length >= limit) {
      setAlertMessage(`Limit reached for ${currentPlan} plan. Please upgrade.`);
      return;
    }

    try {
      const response: any = await TodoApi.add(todo);
      setTodos((prev) => [response.newTodo, ...prev]);
    } catch (error) {
      console.error("Add todo failed", error);
    }
  };

  const handleToggleTodo = async (id: string, completed: boolean) => {
    const previousTodos = [...todos];
    // Optimistic Update
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed } : t))
    );

    try {
      await TodoApi.toggle(id, completed);
    } catch (error) {
      setTodos(previousTodos);
      console.error("Toggle failed", error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    await TodoApi.remove(id);
  };

  const handleClearCompleted = async () => {
    const previousTodos = [...todos];
    setTodos((prev) => prev.filter((t) => !t.completed));
    try {
      setIsClearing(true);
      await TodoApi.clear();
    } catch (error) {
      setTodos(previousTodos);
    } finally {
      setIsClearing(false);
    }
  };
  const handleBuyPlan = async (e: React.FormEvent) => {
    e.preventDefault();
  };
  const handleCancelPlan = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  // --- Derived State (useMemo for Performance) ---

  const filteredTodos = useMemo(() => {
    switch (activeTab) {
      case "active":
        return todos.filter((t) => !t.completed);
      case "completed":
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, activeTab]);

  const itemsLeftCount = todos.filter((t) => !t.completed).length;
  const itemsLeftText =
    itemsLeftCount === 0
      ? "no items left"
      : `${itemsLeftCount} item${itemsLeftCount !== 1 ? "s" : ""} left`;

  // --- Modal Helpers ---

  const toggleUpgradeModal = () => {
    const modal = upgradePlanModalRef.current;
    if (!modal) return;
    modal.open ? modal.close() : modal.showModal();
  };
  const toggleCancelModal = () => {
    const modal = cancelPlanModalRef.current;
    if (!modal) return;
    modal.open ? modal.close() : modal.showModal();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Container showBg>
      <div className="space-y-12">
        <header className="flex items-center justify-between">
          <Logo>Todo</Logo>
          <nav className="flex items-center gap-4">
            <button
              onClick={toggleUpgradeModal}
              className="btn btn-sm bg-check-gradient text-white hover:opacity-80"
            >
              {currentPlan.toUpperCase().slice(0, 3)}
            </button>
            <ToggleTheme />
            <Logout />
          </nav>
        </header>

        <div className="space-y-4">
          <TodoInput onSubmit={handleAddTodo} />

          {alertMessage && (
            <div
              role="alert"
              className="alert bg-card-bg border-2 border-border-main rounded-sm flex justify-between"
            >
              <div className="flex items-center gap-2">
                <AlertCircleIcon size={18} />
                <span>{alertMessage}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setAlertMessage(null)}
                  className="btn btn-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={toggleUpgradeModal}
                  className="btn btn-xs btn-primary"
                >
                  Upgrade
                </button>
              </div>
            </div>
          )}

          <div className="bg-card-bg border-border-main border-2 rounded-sm">
            <ul>
              {isLoading ? (
                <p className="p-4 text-center text-text-muted font-semibold">
                  Loading todos...
                </p>
              ) : filteredTodos.length > 0 ? (
                filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggleTodo}
                    onDelete={handleDeleteTodo}
                    className="border-b-2 border-border-main"
                  />
                ))
              ) : (
                <p className="p-4 text-center text-text-muted font-semibold">
                  No items found!
                </p>
              )}
            </ul>

            <div className="flex items-center justify-between text-sm md:text-base font-semibold p-4">
              <span className="text-text-muted">{itemsLeftText}</span>

              <div className="hidden md:flex gap-4">
                {(["all", "active", "completed"] as TabState[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`capitalize transition-colors ${
                      activeTab === tab
                        ? "text-bright-blue"
                        : "text-text-muted hover:text-bright-blue"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <button
                onClick={handleClearCompleted}
                disabled={isClearing}
                className={`text-text-muted ${
                  isClearing ? "opacity-50" : "hover:text-bright-blue"
                }`}
              >
                {isClearing ? "Clearing..." : "Clear Completed"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm md:text-base font-semibold p-4 bg-card-bg md:hidden gap-4">
            {(["all", "active", "completed"] as TabState[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`capitalize transition-colors ${
                  activeTab === tab
                    ? "text-bright-blue"
                    : "text-text-muted hover:text-bright-blue"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      <dialog ref={upgradePlanModalRef} className="modal">
        <form
          onSubmit={handleBuyPlan}
          className="modal-box bg-card-bg border-2 border-border-main"
        >
          <button
            onClick={toggleUpgradeModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <h3 className="font-bold text-lg mb-4">Upgrade Plan</h3>
          <Input
            label="Full Name"
            value={userName}
            onChange={(val) => setUserName(val)}
            placeholder="Enter your name"
          />
          <div className="mt-4 space-y-2">
            {PLANS.map((p) => (
              <label
                key={p.id}
                className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:border-primary"
              >
                <input
                  type="radio"
                  checked={selectedUpgradePlan === p.id}
                  onChange={() => setSelectedUpgradePlan(p.id)}
                  className="radio radio-primary"
                />
                <div className="flex-1">
                  <div className="flex justify-between font-bold">
                    <span>{p.label}</span>
                    <span className="text-primary">{p.price}</span>
                  </div>
                  <p className="text-xs opacity-70">{p.description}</p>
                </div>
              </label>
            ))}
          </div>
          <button
            className="btn btn-primary w-full mt-6"
            disabled={isProcessingPlan}
          >
            {isProcessingPlan ? "Processing..." : "Continue to Purchase"}
          </button>
        </form>
      </dialog>
      {/* Cancle Model */}
      <dialog id="cancle-plan" ref={cancelPlanModalRef} className="modal">
        <form
          method="dialog"
          onSubmit={handleCancelPlan}
          className="modal-box bg-card-bg border-2 border-border-main"
        >
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>

          <h3 className="font-bold text-lg text-error">Cancel Subscription</h3>

          <p className="py-4 text-base-content/80">
            This will immediately cancel your current active plan. You will lose
            access to Pro / Enterprise features at the end of your billing
            cycle. This action cannot be undone.
          </p>

          <div className="modal-action flex gap-3">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => cancelPlanModalRef.current?.close()}
            >
              Keep Plan
            </button>

            <button
              type="submit"
              className="btn btn-error"
              disabled={isProcessingPlan}
            >
              {isProcessingPlan ? "Cancelling…" : "Cancel Plan"}
            </button>
          </div>
        </form>
      </dialog>
    </Container>
  );
}

export default HomePage;
