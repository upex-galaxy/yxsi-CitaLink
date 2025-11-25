"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import type { Appointment } from "@/lib/types"
import { Calendar, Clock, DollarSign, Edit, Eye, Link as LinkIcon, MoreVertical, Plus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

export default function CitasPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const { toast } = useToast()

  // Mock appointments iniciales
  const initialMockAppointments: Appointment[] = [
    {
      id: "1",
      clinic_id: "clinic-1",
      patient_name: "Ana García Rodríguez",
      status: "confirmed",
      total_amount: 120.0,
      deposit_amount: 25.0,
      appointment_date: "2025-11-20T10:00:00Z",
      expires_at: "2025-11-20T09:00:00Z",
      created_at: "2025-11-18T09:00:00Z",
    },
    {
      id: "2",
      clinic_id: "clinic-1",
      patient_name: "Carlos Ruiz Martínez",
      status: "pending",
      total_amount: 150.0,
      deposit_amount: 30.0,
      appointment_date: "2025-11-20T11:30:00Z",
      expires_at: "2025-11-20T10:30:00Z",
      created_at: "2025-11-18T09:30:00Z",
    },
    {
      id: "3",
      clinic_id: "clinic-1",
      patient_name: "María López Fernández",
      status: "confirmed",
      total_amount: 80.0,
      deposit_amount: 15.0,
      appointment_date: "2025-11-20T14:00:00Z",
      expires_at: "2025-11-20T13:00:00Z",
      created_at: "2025-11-18T10:00:00Z",
    },
    {
      id: "4",
      clinic_id: "clinic-1",
      patient_name: "Juan Pérez Sánchez",
      status: "pending",
      total_amount: 95.0,
      deposit_amount: 20.0,
      appointment_date: "2025-11-20T15:30:00Z",
      expires_at: "2025-11-20T14:30:00Z",
      created_at: "2025-11-19T08:00:00Z",
    },
    {
      id: "5",
      clinic_id: "clinic-1",
      patient_name: "Laura Sánchez González",
      status: "expired",
      total_amount: 110.0,
      deposit_amount: 22.0,
      appointment_date: "2025-11-21T09:00:00Z",
      expires_at: "2025-11-21T08:00:00Z",
      created_at: "2025-11-19T10:00:00Z",
    },
    {
      id: "6",
      clinic_id: "clinic-1",
      patient_name: "David Torres Ramírez",
      status: "confirmed",
      total_amount: 135.0,
      deposit_amount: 27.0,
      appointment_date: "2025-11-21T16:00:00Z",
      expires_at: "2025-11-21T15:00:00Z",
      created_at: "2025-11-19T11:00:00Z",
    },
    {
      id: "7",
      clinic_id: "clinic-1",
      patient_name: "Elena Martínez Díaz",
      status: "pending",
      total_amount: 100.0,
      deposit_amount: 20.0,
      appointment_date: "2025-11-22T10:00:00Z",
      expires_at: "2025-11-22T09:00:00Z",
      created_at: "2025-11-19T12:00:00Z",
    },
    {
      id: "8",
      clinic_id: "clinic-1",
      patient_name: "Roberto Fernández López",
      status: "confirmed",
      total_amount: 145.0,
      deposit_amount: 29.0,
      appointment_date: "2025-11-22T14:30:00Z",
      expires_at: "2025-11-22T13:30:00Z",
      created_at: "2025-11-19T13:00:00Z",
    },
  ]

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleDateString("es-ES", options)
  }

  const formatShortDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleDateString("es-ES", options)
  }

  // Simular carga de datos
  useEffect(() => {
    const timer = setTimeout(() => {
      setAppointments(initialMockAppointments)
      setIsLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  // 👇 Corregido: usamos el tipo real de Appointment["status"] y
  // estrechamos a los estados que este componente sabe pintar.
  const getStatusBadge = (status: Appointment["status"]) => {
    if (status !== "confirmed" && status !== "pending" && status !== "expired") {
      return null
    }

    const variants = {
      confirmed: "default" as const,
      pending: "secondary" as const,
      expired: "destructive" as const,
    }

    const labels = {
      confirmed: "Confirmada",
      pending: "Pendiente",
      expired: "Expirada",
    }

    return <Badge variant={variants[status]}>{labels[status]}</Badge>
  }

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault()

    // Simular creación de cita
    toast({
      title: "Cita creada exitosamente",
      description: "El link de pago ha sido generado y enviado al paciente.",
    })

    setIsDialogOpen(false)
  }

  const handleViewDetails = (appt: Appointment) => {
    toast({
      title: "Ver detalles",
      description: `Mostrando detalles de la cita de ${appt.patient_name}`,
    })
  }

  const handleEdit = (appt: Appointment) => {
    toast({
      title: "Editar cita",
      description: `Editando cita de ${appt.patient_name}`,
    })
  }

  const handleDelete = (appt: Appointment) => {
    toast({
      title: "Cita eliminada",
      description: `La cita de ${appt.patient_name} ha sido eliminada.`,
      variant: "destructive",
    })
  }

  const handleCopyLink = (appt: Appointment) => {
    toast({
      title: "Link copiado",
      description: "El link de pago ha sido copiado al portapapeles.",
    })
  }

  // Estadísticas rápidas
  const confirmedCount = appointments.filter((a) => a.status === "confirmed").length
  const pendingCount = appointments.filter((a) => a.status === "pending").length
  const expiredCount = appointments.filter((a) => a.status === "expired").length

  return (
    <div className="flex-1 p-8 pt-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Citas</h2>
          <p className="text-muted-foreground">Administra todas las citas de tu clínica</p>
        </div>

        {/* Dialog para crear nueva cita */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Cita
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleCreateAppointment}>
              <DialogHeader>
                <DialogTitle>Crear Nueva Cita</DialogTitle>
                <DialogDescription>
                  Completa los datos del paciente y genera un link de pago único.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="patient_name">Nombre del Paciente</Label>
                  <Input id="patient_name" placeholder="Ej: María García López" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="total_amount">Monto Total (€)</Label>
                    <Input id="total_amount" type="number" placeholder="150.00" step="0.01" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="deposit_amount">Anticipo (€)</Label>
                    <Input id="deposit_amount" type="number" placeholder="30.00" step="0.01" required />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="appointment_date">Fecha y Hora</Label>
                  <Input id="appointment_date" type="datetime-local" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Notas (Opcional)</Label>
                  <Textarea id="notes" placeholder="Agrega notas adicionales sobre la cita..." rows={3} />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Crear Cita y Generar Link</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas rápidas */}
      {!isLoading && (
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Confirmadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{confirmedCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pendientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Expiradas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{expiredCount}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Grid de citas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-[180px]" />
                  <Skeleton className="h-5 w-[80px]" />
                </div>
                <Skeleton className="h-4 w-[120px]" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[80%]" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-9 w-full" />
              </CardFooter>
            </Card>
          ))
        ) : appointments.length === 0 ? (
          // Empty state mejorado
          <div className="col-span-full">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No hay citas programadas</h3>
                <p className="text-sm text-muted-foreground mb-6 text-center max-w-sm">
                  Comienza creando tu primera cita. Genera links de pago únicos para tus pacientes.
                </p>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg">
                      <Plus className="mr-2 h-5 w-5" />
                      Crear Primera Cita
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <form onSubmit={handleCreateAppointment}>
                      <DialogHeader>
                        <DialogTitle>Crear Nueva Cita</DialogTitle>
                        <DialogDescription>
                          Completa los datos del paciente y genera un link de pago único.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="patient_name_empty">Nombre del Paciente</Label>
                          <Input
                            id="patient_name_empty"
                            placeholder="Ej: María García López"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="total_amount_empty">Monto Total (€)</Label>
                            <Input
                              id="total_amount_empty"
                              type="number"
                              placeholder="150.00"
                              step="0.01"
                              required
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="deposit_amount_empty">Anticipo (€)</Label>
                            <Input
                              id="deposit_amount_empty"
                              type="number"
                              placeholder="30.00"
                              step="0.01"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="appointment_date_empty">Fecha y Hora</Label>
                          <Input id="appointment_date_empty" type="datetime-local" required />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="notes_empty">Notas (Opcional)</Label>
                          <Textarea
                            id="notes_empty"
                            placeholder="Agrega notas adicionales sobre la cita..."
                            rows={3}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button type="submit">Crear Cita y Generar Link</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Lista de citas
          appointments.map((cita) => (
            <Card key={cita.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{cita.patient_name}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetails(cita)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCopyLink(cita)}>
                        <LinkIcon className="mr-2 h-4 w-4" />
                        Copiar Link
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(cita)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(cita)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center gap-2">{getStatusBadge(cita.status)}</div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{formatShortDate(cita.appointment_date)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span>Total: €{cita.total_amount.toFixed(2)}</span>
                  </div>
                  <div className="font-semibold text-primary">
                    Anticipo: €{cita.deposit_amount.toFixed(2)}
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Expira: {formatShortDate(cita.expires_at)}</span>
                </div>
              </CardContent>
              <CardFooter className="pt-3">
                <Button variant="outline" className="w-full" onClick={() => handleViewDetails(cita)}>
                  <Eye className="mr-2 h-4 w-4" />
                  Ver Detalles
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
