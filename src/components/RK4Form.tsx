"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, SquareFunction } from "lucide-react";
import { buildFunction } from "@/lib/parseFunction";
import { rk4Solve, RK4Result } from "@/lib/rk4";

interface Props {
  onResult: (result: RK4Result, meta: { fx: string; x0: number; y0: number; h: number }) => void;
}

export default function RK4Form({ onResult }: Props) {
  const [fx, setFx] = useState("x + y");
  const [x0, setX0] = useState("0");
  const [y0, setY0] = useState("1");
  const [h, setH] = useState("0.2");
  const [target, setTarget] = useState("0.4");
  const [error, setError] = useState("");

  const handleSolve = () => {
    try {
      setError("");
      const f = buildFunction(fx);
      const X0 = parseFloat(x0);
      const Y0 = parseFloat(y0);
      const H = parseFloat(h);
      const Target = parseFloat(target);
      const nSteps = Math.round((Target - X0) / H);

      if (nSteps <= 0) {
        setError("Target x must be greater than x₀.");
        return;
      }

      const result = rk4Solve(f, X0, Y0, H, nSteps);
      onResult(result, { fx, x0: X0, y0: Y0, h: H });
    } catch {
      setError("Invalid expression. Use x, y, +, -, *, /, ^, sin, cos, exp, etc.");
    }
  };

  return (
    <Card className="w-full shadow-lg border-border/60 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-1.5 rounded-md bg-primary/10 text-primary">
            <SquareFunction className="h-4 w-4" />
          </div>
          Define your ODE
        </CardTitle>
        <CardDescription>
          Enter the right-hand side of your differential equation and the initial conditions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">
            dy/dx = f(x, y)
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-mono select-none">
              f =
            </span>
            <Input
              value={fx}
              onChange={(e) => setFx(e.target.value)}
              placeholder="x + y"
              className="pl-9 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Initial x₀</Label>
            <Input
              value={x0}
              onChange={(e) => setX0(e.target.value)}
              className="font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Initial y₀</Label>
            <Input
              value={y0}
              onChange={(e) => setY0(e.target.value)}
              className="font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Step size (h)</Label>
            <Input
              value={h}
              onChange={(e) => setH(e.target.value)}
              className="font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Find y at x =</Label>
            <Input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="font-mono"
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive bg-destructive/8 border border-destructive/20 px-3 py-2 rounded-md">
            {error}
          </p>
        )}

        <Button onClick={handleSolve} className="w-full gap-2 font-semibold h-10">
          <Calculator className="h-4 w-4" />
          Solve with RK4
        </Button>
      </CardContent>
    </Card>
  );
}
