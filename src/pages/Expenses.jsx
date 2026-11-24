import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = {
  Food: { emoji: "🍔", color: "bg-orange-100 text-orange-700" },
  Transport: { emoji: "🚌", color: "bg-sky-100 text-sky-700" },
  Study: { emoji: "📚", color: "bg-violet-100 text-violet-700" },
  Other: { emoji: "🧾", color: "bg-slate-100 text-slate-700" },
};
const NAMES = Object.keys(CATEGORIES);

export default function Expenses() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(NAMES[0]);
  const [expenses, setExpenses] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("expenses")) || [];
    } catch {
      return [];
    }
  });

  // Redirect to Home if no name was entered
  useEffect(() => {
    if (!name) navigate("/");
  }, [name, navigate]);

  // Save expenses and update the tab title whenever they change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    document.title = `Expenses (${expenses.length})`;
  }, [expenses]);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  function addExpense(e) {
    e.preventDefault();
    const value = parseFloat(amount);
    if (!title.trim() || isNaN(value) || value <= 0) return;
    setExpenses([
      { id: Date.now(), title: title.trim(), amount: value, category },
      ...expenses,
    ]);
    setTitle("");
    setAmount("");
  }

  function removeExpense(id) {
    setExpenses(expenses.filter((x) => x.id !== id));
  }

  return (
    <div className="mx-auto max-w-lg space-y-4 p-4 pb-10">
      <div className="flex items-center justify-between pt-2">
        <h1 className="text-xl font-bold">Hi, {name} 👋</h1>
        <Button variant="outline" size="sm" onClick={() => navigate("/")}>
          Switch user
        </Button>
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 p-6 text-white shadow-lg">
        <p className="text-sm opacity-80">Total spent</p>
        <p className="text-4xl font-bold tracking-tight">${total.toFixed(2)}</p>
        <p className="mt-1 text-sm opacity-80">{expenses.length} expenses</p>
      </div>

      <form onSubmit={addExpense} className="space-y-2 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
        <Input placeholder="What did you buy?" value={title} onChange={(e) => setTitle(e.target.value)} />
        <div className="flex gap-2">
          <Input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-9 rounded-md border border-input bg-card px-2 text-sm"
          >
            {NAMES.map((c) => (
              <option key={c} value={c}>
                {CATEGORIES[c].emoji} {c}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" className="w-full">+ Add Expense</Button>
      </form>

      <div className="space-y-2">
        {expenses.length === 0 && (
          <div className="rounded-2xl border border-dashed bg-white/60 p-8 text-center text-sm text-muted-foreground">
            <p className="mb-1 text-3xl">🪙</p>
            No expenses yet. Add your first one above.
          </div>
        )}
        {expenses.map((x) => {
          const cat = CATEGORIES[x.category] || CATEGORIES.Other;
          return (
            <div key={x.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-xl">
                {cat.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{x.title}</p>
                <Badge className={cat.color}>{x.category}</Badge>
              </div>
              <span className="font-semibold">${x.amount.toFixed(2)}</span>
              <button
                onClick={() => removeExpense(x.id)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-muted-foreground hover:bg-red-50 hover:text-destructive"
                aria-label="Delete expense"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
