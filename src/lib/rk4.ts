export interface RK4Step {
  step: number;
  x: number;
  y: number;
  k1: number;
  k2: number;
  k3: number;
  k4: number;
}

export interface RK4Result {
  steps: RK4Step[];
  finalX: number;
  finalY: number;
}

export function rk4Solve(
  f: (x: number, y: number) => number,
  x0: number,
  y0: number,
  h: number,
  nSteps: number
): RK4Result {
  let x = x0;
  let y = y0;
  const steps: RK4Step[] = [];

  for (let i = 1; i <= nSteps; i++) {
    const k1 = h * f(x, y);
    const k2 = h * f(x + h / 2, y + k1 / 2);
    const k3 = h * f(x + h / 2, y + k2 / 2);
    const k4 = h * f(x + h, y + k3);

    y = y + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
    x = x + h;

    steps.push({ step: i, x, y, k1, k2, k3, k4 });
  }

  return { steps, finalX: x, finalY: y };
}