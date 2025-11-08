"use client";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Settings = { depositPct: number; expiresHours: number; waTemplate: string };
const KEY = "citalink:settings";

export default function SettingsPage() {
  const [s, setS] = useState<Settings>({
    depositPct: 30,
    expiresHours: 24,
    waTemplate: "Hola {nombre}, confirma tu cita aquí: {link}",
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setS(JSON.parse(raw));
    } catch {}
  }, []);

  function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    localStorage.setItem(KEY, JSON.stringify(s));
    alert("Ajustes guardados (demo).");
  }

  return (
    <form onSubmit={save} className="grid max-w-2xl gap-4">
      <h2 className="text-2xl font-semibold">Ajustes (demo)</h2>

      <div className="grid gap-2">
        <Label>% anticipo (ej. 30)</Label>
        <Input
          type="number"
          min={0}
          max={100}
          value={s.depositPct}
          onChange={(e)=>setS({...s, depositPct: Number(e.target.value || 0)})}
        />
        <p className="text-sm text-gray-500">Usaremos este porcentaje para calcular el anticipo del pago.</p>
      </div>

      <div className="grid gap-2">
        <Label>Horas de expiración (ej. 24)</Label>
        <Input
          type="number"
          min={1}
          value={s.expiresHours}
          onChange={(e)=>setS({...s, expiresHours: Number(e.target.value || 1)})}
        />
        <p className="text-sm text-gray-500">Tras este tiempo, el link de pago caducará.</p>
      </div>

      <div className="grid gap-2">
        <Label>Plantilla WhatsApp</Label>
        <Textarea
          rows={4}
          value={s.waTemplate}
          onChange={(e)=>setS({...s, waTemplate: e.target.value})}
        />
        <p className="text-sm text-gray-500">Puedes usar {`{nombre}`} y {`{link}`} en el mensaje.</p>
      </div>

      <div className="flex gap-3">
        <Button type="submit">Guardar cambios</Button>
        <Button type="button" variant="outline"
          onClick={()=>{ localStorage.removeItem(KEY); location.reload(); }}>
          Reiniciar demo
        </Button>
      </div>
    </form>
  );
}
