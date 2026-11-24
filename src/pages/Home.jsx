import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

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
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>💸 Expense Tracker</CardTitle>
          <CardDescription>Enter your name to start tracking.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={start} className="space-y-3">
            <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            <Button type="submit" className="w-full" disabled={!name.trim()}>
              Get Started
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
