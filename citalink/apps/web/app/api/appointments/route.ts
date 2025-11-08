import { NextResponse } from "next/server";

type Row = {
  id: string;
  patientName: string;
  when: string;
  total: number;
  deposit: number;
  status: "Pendiente" | "Confirmado" | "Expirado";
};

const mem: Row[] = [
  { id: "A1", patientName: "Ana Pérez",   when: "2025-11-10 10:00", total: 100, deposit: 30, status: "Pendiente" },
  { id: "A2", patientName: "Luis Gómez",  when: "2025-11-11 12:30", total: 80,  deposit: 24, status: "Pendiente" },
  { id: "A3", patientName: "María Ruiz",  when: "2025-11-11 15:00", total: 120, deposit: 36, status: "Confirmado" },
  { id: "A4", patientName: "Óscar León",  when: "2025-11-12 09:00", total: 60,  deposit: 18, status: "Pendiente" },
  { id: "A5", patientName: "Elena Gil",   when: "2025-11-12 11:30", total: 95,  deposit: 28.5, status: "Expirado" },
  { id: "A6", patientName: "Nora Díaz",   when: "2025-11-13 10:15", total: 70,  deposit: 21, status: "Pendiente" },
  { id: "A7", patientName: "Hugo Vera",   when: "2025-11-13 12:00", total: 110, deposit: 33, status: "Confirmado" },
  { id: "A8", patientName: "Iris Soto",   when: "2025-11-14 16:45", total: 85,  deposit: 25.5, status: "Pendiente" },
];

export async function GET() {
  return NextResponse.json(mem);
}

export async function POST(req: Request) {
  const b = await req.json();
  const pct = 0.30;
  const total = Number(b.totalAmount || 0);
  const row: Row = {
    id: Math.random().toString(36).slice(2),
    patientName: String(b.patientName || "Paciente"),
    when: String(b.appointmentDateTime || ""),
    total,
    deposit: Math.round(total * pct * 100) / 100,
    status: "Pendiente",
  };
  mem.unshift(row);
  return NextResponse.json({ ok: true, id: row.id, payUrl: `/pay/${row.id}` });
}
