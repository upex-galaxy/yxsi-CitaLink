import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, Phone, Mail } from "lucide-react"
import type { Appointment } from "@/lib/types"

export default function CitasPage() {
  const mockAppointments: Appointment[] = [
    {
      id: "1",
      clinic_id: "clinic-1",
      patient_name: "Ana García",
      status: "confirmed",
      total_amount: 100.00,
      deposit_amount: 20.00,
      appointment_date: "2025-11-19T10:00:00Z",
      expires_at: "2025-11-19T09:00:00Z",
      created_at: "2025-11-18T09:00:00Z",
    },
    {
      id: "2",
      clinic_id: "clinic-1",
      patient_name: "Carlos Ruiz",
      status: "pending",
      total_amount: 150.00,
      deposit_amount: 30.00,
      appointment_date: "2025-11-19T11:30:00Z",
      expires_at: "2025-11-19T10:30:00Z",
      created_at: "2025-11-18T09:30:00Z",
    },
    {
      id: "3",
      clinic_id: "clinic-1",
      patient_name: "Marta López",
      status: "expired",
      total_amount: 80.00,
      deposit_amount: 15.00,
      appointment_date: "2025-11-20T14:00:00Z",
      expires_at: "2025-11-20T13:00:00Z",
      created_at: "2025-11-18T10:00:00Z",
    },
  ]

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="flex-1 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Citas</h2>
        <Button>Nueva Cita</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockAppointments.length === 0 ? (
          <p className="text-muted-foreground col-span-full">No hay citas programadas.</p>
        ) : (
          mockAppointments.map((cita) => (
            <Card key={cita.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{cita.patient_name}</span> {/* Display patient name as title */}
                  <span
                    className={`text-sm font-semibold px-2 py-1 rounded-full
                      ${cita.status === "confirmed" ? "bg-green-100 text-green-800" : ""}
                      ${cita.status === "pending" ? "bg-yellow-100 text-yellow-800" : ""}
                      ${cita.status === "expired" ? "bg-red-100 text-red-800" : ""}
                    `}
                  >
                    {cita.status === "confirmed" && "Confirmada"}
                    {cita.status === "pending" && "Pendiente"}
                    {cita.status === "expired" && "Expirada"}
                  </span>
                </CardTitle>
                <CardDescription className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(cita.appointment_date)}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Monto Total: {cita.total_amount}€</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Monto Depósito: {cita.deposit_amount}€</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Expira: {formatDate(cita.expires_at)}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
