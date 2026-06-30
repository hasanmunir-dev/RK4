"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, Sigma } from "lucide-react";
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
        setError("Target x must be greater than x0.");
        return;
      }

      const result = rk4Solve(f, X0, Y0, H, nSteps);
      onResult(result, { fx, x0: X0, y0: Y0, h: H });
    } catch (e) {
      setError("Invalid function. Use x, y, +, -, *, /, ^, sin, cos, etc.");
    }
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sigma className="h-5 w-5" />
          Define your ODE
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>dy/dx = f(x, y)</Label>
          <Input value={fx} onChange={(e) => setFx(e.target.value)} placeholder="x + y" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>x₀</Label>
            <Input value={x0} onChange={(e) => setX0(e.target.value)} />
          </div>
          <div>
            <Label>y₀</Label>
            <Input value={y0} onChange={(e) => setY0(e.target.value)} />
          </div>
          <div>
            <Label>Step size (h)</Label>
            <Input value={h} onChange={(e) => setH(e.target.value)} />
          </div>
          <div>
            <Label>Find y at x =</Label>
            <Input value={target} onChange={(e) => setTarget(e.target.value)} />
          </div>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button onClick={handleSolve} className="w-full gap-2">
          <Calculator className="h-4 w-4" />
          Solve with RK4
        </Button>
      </CardContent>
    </Card>
  );
}