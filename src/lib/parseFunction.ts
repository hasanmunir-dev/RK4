import { evaluate } from "mathjs";

export function buildFunction(expr: string) {
  return (x: number, y: number): number => {
    return evaluate(expr, { x, y });
  };
}
// usage: buildFunction("x + y^2") -> f(x,y)