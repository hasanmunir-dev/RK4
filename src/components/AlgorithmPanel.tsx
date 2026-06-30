"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    label: "k₁",
    code: "k1 = h · f(x, y)",
    desc: "Slope at the start of the interval using current (x, y).",
    color: "text-blue-500",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    label: "k₂",
    code: "k2 = h · f(x + h/2, y + k₁/2)",
    desc: "Slope at the midpoint, estimated using k₁.",
    color: "text-violet-500",
    bg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    label: "k₃",
    code: "k3 = h · f(x + h/2, y + k₂/2)",
    desc: "Better midpoint slope, estimated using k₂.",
    color: "text-amber-500",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    label: "k₄",
    code: "k4 = h · f(x + h, y + k₃)",
    desc: "Slope at the end of the interval, estimated using k₃.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
];

const pythonCode = `def rk4(f, x0, y0, h, n_steps):
    x, y = x0, y0
    for i in range(n_steps):
        k1 = h * f(x,         y          )
        k2 = h * f(x + h/2,   y + k1/2   )
        k3 = h * f(x + h/2,   y + k2/2   )
        k4 = h * f(x + h,     y + k3     )
        y  = y + (k1 + 2*k2 + 2*k3 + k4) / 6
        x  = x + h
    return x, y`;

export default function AlgorithmPanel() {
  const [open, setOpen] = useState(false);

  return (
    <Card className="w-full border-border/60 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-1.5 rounded-md bg-primary/10 text-primary">
              <Code2 className="h-4 w-4" />
            </div>
            How RK4 Works
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen((o) => !o)}
            className="gap-1 text-xs text-muted-foreground"
          >
            {open ? (
              <>Hide <ChevronUp className="h-3.5 w-3.5" /></>
            ) : (
              <>Show <ChevronDown className="h-3.5 w-3.5" /></>
            )}
          </Button>
        </div>
      </CardHeader>

      {open && (
        <CardContent className="space-y-5 pt-0">
          {/* Four slopes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {steps.map((s) => (
              <div
                key={s.label}
                className={`rounded-lg border px-4 py-3 space-y-1 ${s.bg}`}
              >
                <div className={`text-xs font-bold uppercase tracking-wide ${s.color}`}>
                  {s.label}
                </div>
                <code className="block text-sm font-mono text-foreground">{s.code}</code>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Weighted average */}
          <div className="rounded-lg border border-primary/25 bg-primary/8 px-4 py-3 space-y-1">
            <div className="text-xs font-bold uppercase tracking-wide text-primary">Update</div>
            <code className="block text-sm font-mono text-foreground">
              y_new = y + (k₁ + 2·k₂ + 2·k₃ + k₄) / 6
            </code>
            <p className="text-xs text-muted-foreground">
              Weighted average of the four slopes — midpoint slopes (k₂, k₃) count twice because they are more accurate.
            </p>
          </div>

          {/* Python code */}
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Python implementation
            </p>
            <pre className="rounded-lg bg-muted border border-border/60 px-4 py-3 text-xs font-mono leading-relaxed overflow-x-auto text-foreground">
              {pythonCode}
            </pre>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
