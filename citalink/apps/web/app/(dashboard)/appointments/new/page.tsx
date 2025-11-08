"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function NewAppointment() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const body = Object.fromEntries(new FormData(e.currentTarget) as any);
    const r = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const res = await r.json();
    setLoading(false);
    alert(`CitaLink creado (demo).\nURL de pago: ${res.payUrl}`);
  }

  return (
    <form onSubmit={onSubmit} className="grid max-w-md gap-4">
      <h2 className="text-2xl font-semibold">Nuevo CitaLink</h2>
      <div className="grid gap-2">
        <Label>Paciente</Label>
        <Input name="patientName" placeholder="Nombre y apellido" required />
      </div>
      <div className="grid gap-2">
        <Label>Fecha y hora</Label>
        <Input name="appointmentDateTime" placeholder="YYYY-MM-DD HH:mm" required />
      </div>
      <div className="grid gap-2">
        <Label>Importe total (€)</Label>
        <Input name="totalAmount" type="number" min="0" step="0.01" required />
      </div>
      <Button disabled={loading}>{loading ? "Creando…" : "Crear (demo)"}</Button>
    </form>
  );
}
