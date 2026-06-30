import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RK4Result } from "@/lib/rk4";

export default function RK4Results({
  result,
  meta,
}: {
  result: RK4Result;
  meta: { fx: string; x0: number; y0: number; h: number };
}) {
  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle>Step-by-step solution</CardTitle>
        <p className="text-sm text-muted-foreground">
          dy/dx = {meta.fx}, y({meta.x0}) = {meta.y0}, h = {meta.h}
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Step</TableHead>
                <TableHead>x</TableHead>
                <TableHead>k1</TableHead>
                <TableHead>k2</TableHead>
                <TableHead>k3</TableHead>
                <TableHead>k4</TableHead>
                <TableHead>y</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.steps.map((s) => (
                <TableRow key={s.step}>
                  <TableCell>{s.step}</TableCell>
                  <TableCell>{s.x.toFixed(4)}</TableCell>
                  <TableCell>{s.k1.toFixed(6)}</TableCell>
                  <TableCell>{s.k2.toFixed(6)}</TableCell>
                  <TableCell>{s.k3.toFixed(6)}</TableCell>
                  <TableCell>{s.k4.toFixed(6)}</TableCell>
                  <TableCell className="font-medium">{s.y.toFixed(6)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4">
          <Badge className="text-base px-4 py-2">
            y({result.finalX.toFixed(2)}) = {result.finalY.toFixed(6)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}