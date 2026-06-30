"use client";

import { useState } from "react";
import RK4Form from "@/components/RK4Form";
import RK4Results from "@/components/RK4Results";
import Footer from "@/components/Footer";
import { RK4Result } from "@/lib/rk4";
import { Cpu } from "lucide-react";
import AlgorithmPanel from "@/components/AlgorithmPanel";

export default function Home() {
  const [result, setResult] = useState<RK4Result | null>(null);
  const [meta, setMeta] = useState<{ fx: string; x0: number; y0: number; h: number } | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12 space-y-8">
        {/* Hero */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-2 border border-primary/20">
            <Cpu className="h-3.5 w-3.5" />
            Numerical Methods · 4th Order
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
            RK4 ODE Solver
          </h1>
          <p className="text-muted-foreground text-base max-w-md mx-auto leading-relaxed">
            Enter any <span className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded text-foreground">dy/dx = f(x, y)</span>, set your initial conditions, and get a full step-by-step Runge-Kutta solution instantly.
          </p>
        </div>

        <AlgorithmPanel />

        <RK4Form
          onResult={(r, m) => {
            setResult(r);
            setMeta(m);
          }}
        />

        {result && meta && <RK4Results result={result} meta={meta} />}
      </main>

      <Footer />
    </div>
  );
}
