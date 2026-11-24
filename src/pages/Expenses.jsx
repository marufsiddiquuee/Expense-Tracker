import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const CATEGORIES = ["Food", "Transport", "Study", "Other"];

export default function Expenses() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
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
    setExpenses([...expenses, { id: Date.now(), title: title.trim(), amount: value, category }]);
    setTitle("");
    setAmount("");
  }

  function removeExpense(id) {
    setExpenses(expenses.filter((x) => x.id !== id));
  }

  return (
    <div className="mx-auto max-w-lg space-y-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>{name}'s Expenses</CardTitle>
          <CardDescription>Total spent: ${total.toFixed(2)}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={addExpense} className="space-y-2">
            <Input placeholder="What did you buy?" value={title} onChange={(e) => setTitle(e.target.value)} />
            <div className="flex gap-2">
              <Input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-9 rounded-md border border-input bg-card px-2 text-sm"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <Button type="submit" className="w-full">Add Expense</Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {expenses.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">No expenses yet.</p>
        )}
        {expenses.map((x) => (
          <Card key={x.id}>
            <CardContent className="flex items-center justify-between gap-2 p-4">
              <div className="space-y-1">
                <p className="font-medium">{x.title}</p>
                <Badge>{x.category}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold">${x.amount.toFixed(2)}</span>
                <Button variant="destructive" size="sm" onClick={() => removeExpense(x.id)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" onClick={() => navigate("/")}>← Back</Button>
    </div>
  );
}
