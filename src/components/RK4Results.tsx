import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RK4Result } from "@/lib/rk4";
import { CircleCheck, ListOrdered } from "lucide-react";

export default function RK4Results({
  result,
  meta,
}: {
  result: RK4Result;
  meta: { fx: string; x0: number; y0: number; h: number };
}) {
  return (
    <div className="space-y-4">
      {/* Final answer banner */}
      <div className="rounded-xl border border-primary/30 bg-primary/8 p-5 flex items-start gap-4">
        <div className="mt-0.5 p-2 rounded-full bg-primary/15 text-primary shrink-0">
          <CircleCheck className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Result</p>
          <p className="text-2xl font-bold font-mono text-primary">
            y({result.finalX.toFixed(2)}) ≈ {result.finalY.toFixed(6)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            dy/dx = {meta.fx}, &nbsp; y({meta.x0}) = {meta.y0}, &nbsp; h = {meta.h}
          </p>
        </div>
      </div>

      {/* Step table */}
      <Card className="w-full shadow-lg border-border/60 bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <div className="p-1.5 rounded-md bg-primary/10 text-primary">
              <ListOrdered className="h-4 w-4" />
            </div>
            Step-by-step solution
          </CardTitle>
          <CardDescription>
            Each row shows the four RK4 slope estimates and the updated y value.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="w-14 pl-6">Step</TableHead>
                  <TableHead className="font-mono">x</TableHead>
                  <TableHead className="font-mono text-chart-1">k₁</TableHead>
                  <TableHead className="font-mono text-chart-2">k₂</TableHead>
                  <TableHead className="font-mono text-chart-3">k₃</TableHead>
                  <TableHead className="font-mono text-chart-4">k₄</TableHead>
                  <TableHead className="font-mono font-semibold pr-6">y</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.steps.map((s) => (
                  <TableRow key={s.step} className="group">
                    <TableCell className="pl-6 text-muted-foreground text-xs">{s.step}</TableCell>
                    <TableCell className="font-mono text-sm">{s.x.toFixed(4)}</TableCell>
                    <TableCell className="font-mono text-xs text-chart-1">{s.k1.toFixed(6)}</TableCell>
                    <TableCell className="font-mono text-xs text-chart-2">{s.k2.toFixed(6)}</TableCell>
                    <TableCell className="font-mono text-xs text-chart-3">{s.k3.toFixed(6)}</TableCell>
                    <TableCell className="font-mono text-xs text-chart-4">{s.k4.toFixed(6)}</TableCell>
                    <TableCell className="font-mono text-sm font-semibold text-primary pr-6">
                      {s.y.toFixed(6)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
