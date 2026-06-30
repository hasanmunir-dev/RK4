"use client";

import { useState } from "react";
import RK4Form from "@/components/RK4Form";
import RK4Results from "@/components/RK4Results";
import Footer from "@/components/Footer";
import { RK4Result } from "@/lib/rk4";

export default function Home() {
  const [result, setResult] = useState<RK4Result | null>(null);
  const [meta, setMeta] = useState<{ fx: string; x0: number; y0: number; h: number } | null>(null);

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">RK4 ODE Solver</h1>
        <p className="text-muted-foreground">
          4th Order Runge-Kutta method — type any dy/dx, get the full worked solution.
        </p>
      </div>

      <RK4Form
        onResult={(r, m) => {
          setResult(r);
          setMeta(m);
        }}
      />

      {result && meta && <RK4Results result={result} meta={meta} />}

      <Footer />
    </main>
  );
}