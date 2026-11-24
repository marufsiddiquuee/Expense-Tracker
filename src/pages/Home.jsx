import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const navigate = useNavigate();

  function start(e) {
    e.preventDefault();
    if (!name.trim()) return;
    localStorage.setItem("name", name.trim());
    navigate("/expenses");
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-3xl bg-white/80 p-8 text-center shadow-xl ring-1 ring-black/5 backdrop-blur">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-3xl shadow-lg">
          💸
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Expense Tracker</h1>
        <p className="mb-6 mt-1 text-sm text-muted-foreground">
          Know where your money goes.
        </p>
        <form onSubmit={start} className="space-y-3">
          <Input
            className="h-11 text-center"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit" className="h-11 w-full text-base" disabled={!name.trim()}>
            Get Started →
          </Button>
        </form>
      </div>
    </div>
  );
}
