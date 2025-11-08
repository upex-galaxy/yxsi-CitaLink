import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

async function getData() {
  const base = process.env.NEXT_PUBLIC_APP_URL || "";
  const r = await fetch(`${base}/api/appointments`, { cache: "no-store" });
  return (await r.json()) as Array<{
    id: string; patientName: string; when: string; total: number; deposit: number; status: string;
  }>;
}

const Status = ({ s }: { s: string }) => {
  const map: Record<string, any> = {
    Pendiente: "outline",
    Confirmado: "default",
    Expirado: "secondary",
  };
  return <Badge variant={map[s] ?? "outline"}>{s}</Badge>;
};

export default async function List() {
  const data = await getData();
  return (
    <section className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">CitaLinks</h2>
        <Button asChild><Link href="/appointments/new">Nuevo</Link></Button>
      </div>

      <div className="rounded border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Paciente</TableHead>
              <TableHead>Fecha/Hora</TableHead>
              <TableHead className="text-center">Anticipo</TableHead>
              <TableHead className="text-center">Total</TableHead>
              <TableHead className="text-center">Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((x) => (
              <TableRow key={x.id}>
                <TableCell>{x.patientName}</TableCell>
                <TableCell>{x.when}</TableCell>
                <TableCell className="text-center">€ {x.deposit}</TableCell>
                <TableCell className="text-center">€ {x.total}</TableCell>
                <TableCell className="text-center"><Status s={x.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
