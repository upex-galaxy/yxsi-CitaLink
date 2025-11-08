"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function NewAppointment() {
  const [patientName, setPatientName] = useState("");
  const [patientNameError, setPatientNameError] = useState("");
  const [appointmentDateTime, setAppointmentDateTime] = useState("");
  const [appointmentDateTimeError, setAppointmentDateTimeError] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [totalAmountError, setTotalAmountError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    // Reset errors
    setPatientNameError("");
    setAppointmentDateTimeError("");
    setTotalAmountError("");

    let hasError = false;

    if (!patientName.trim()) {
      setPatientNameError("El nombre del paciente es requerido.");
      hasError = true;
    }

    if (!appointmentDateTime.trim()) {
      setAppointmentDateTimeError("La fecha y hora son requeridas.");
      hasError = true;
    }

    const amount = parseFloat(totalAmount);
    if (!totalAmount.trim() || isNaN(amount) || amount <= 0) {
      setTotalAmountError("El importe total debe ser un número mayor que 0.");
      hasError = true;
    }

    if (hasError) {
      setIsSubmitting(false);
      return;
    }

    const body = { patientName, appointmentDateTime, totalAmount: amount };
    try {
      const r = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const res = await r.json();
      alert(`CitaLink creado (demo).\nURL de pago: ${res.payUrl}`);
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("Error al crear la cita.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid max-w-md gap-4">
      <h2 className="text-2xl font-semibold">Nuevo CitaLink</h2>
      <div className="grid gap-2">
        <Label>Paciente</Label>
        <Input
          name="patientName"
          placeholder="Nombre y apellido"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          required
        />
        {patientNameError && <p className="text-sm text-red-500">{patientNameError}</p>}
      </div>
      <div className="grid gap-2">
        <Label>Fecha y hora</Label>
        <Input
          name="appointmentDateTime"
          placeholder="YYYY-MM-DD HH:mm"
          value={appointmentDateTime}
          onChange={(e) => setAppointmentDateTime(e.target.value)}
          required
        />
        {appointmentDateTimeError && <p className="text-sm text-red-500">{appointmentDateTimeError}</p>}
      </div>
      <div className="grid gap-2">
        <Label>Importe total (€)</Label>
        <Input
          name="totalAmount"
          type="number"
          min="0.01" // Changed to 0.01 to reflect validation of > 0
          step="0.01"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
          required
        />
        {totalAmountError && <p className="text-sm text-red-500">{totalAmountError}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Creando…" : "Crear (demo)"}</Button>
    </form>
  );
}
