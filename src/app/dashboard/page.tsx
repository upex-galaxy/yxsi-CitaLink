"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Calendar, Users, DollarSign, Clock, ArrowRight } from "lucide-react"
import type { Appointment } from "@/lib/types"
import Link from "next/link"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  // Mock appointments usando tipos del backend
  const mockAppointments: Appointment[] = [
    {
      id: "1",
      clinic_id: "clinic-1",
      patient_name: "Ana García Rodríguez",
      status: "confirmed",
      total_amount: 120.00,
      deposit_amount: 25.00,
      appointment_date: "2025-11-20T10:00:00Z",
      expires_at: "2025-11-20T09:00:00Z",
      created_at: "2025-11-18T09:00:00Z",
    },
    {
      id: "2",
      clinic_id: "clinic-1",
      patient_name: "Carlos Ruiz Martínez",
      status: "pending",
      total_amount: 150.00,
      deposit_amount: 30.00,
      appointment_date: "2025-11-20T11:30:00Z",
      expires_at: "2025-11-20T10:30:00Z",
      created_at: "2025-11-18T09:30:00Z",
    },
    {
      id: "3",
      clinic_id: "clinic-1",
      patient_name: "María López Fernández",
      status: "confirmed",
      total_amount: 80.00,
      deposit_amount: 15.00,
      appointment_date: "2025-11-20T14:00:00Z",
      expires_at: "2025-11-20T13:00:00Z",
      created_at: "2025-11-18T10:00:00Z",
    },
    {
      id: "4",
      clinic_id: "clinic-1",
      patient_name: "Juan Pérez Sánchez",
      status: "pending",
      total_amount: 95.00,
      deposit_amount: 20.00,
      appointment_date: "2025-11-20T15:30:00Z",
      expires_at: "2025-11-20T14:30:00Z",
      created_at: "2025-11-19T08:00:00Z",
    },
    {
      id: "5",
      clinic_id: "clinic-1",
      patient_name: "Laura Sánchez González",
      status: "expired",
      total_amount: 110.00,
      deposit_amount: 22.00,
      appointment_date: "2025-11-21T09:00:00Z",
      expires_at: "2025-11-21T08:00:00Z",
      created_at: "2025-11-19T10:00:00Z",
    },
    {
      id: "6",
      clinic_id: "clinic-1",
      patient_name: "David Torres Ramírez",
      status: "confirmed",
      total_amount: 135.00,
      deposit_amount: 27.00,
      appointment_date: "2025-11-21T16:00:00Z",
      expires_at: "2025-11-21T15:00:00Z",
      created_at: "2025-11-19T11:00:00Z",
    },
  ]

  // Calcular stats desde los appointments
  const todayAppointments = mockAppointments.filter(appt => {
    const apptDate = new Date(appt.appointment_date)
    const today = new Date()
    return apptDate.toDateString() === today.toDateString()
  })

  const pendingAppointments = mockAppointments.filter(appt => appt.status === "pending")
  const confirmedToday = todayAppointments.filter(appt => appt.status === "confirmed")
  const totalRevenue = mockAppointments
    .filter(appt => appt.status === "confirmed")
    .reduce((sum, appt) => sum + appt.deposit_amount, 0)

  const stats = [
    {
      title: "Citas Hoy",
      value: todayAppointments.length.toString(),
      icon: Calendar,
      description: `${confirmedToday.length} confirmadas`,
      trend: "+2 vs ayer",
    },
    {
      title: "Pendientes de Pago",
      value: pendingAppointments.length.toString(),
      icon: Clock,
      description: "Esperando confirmación",
      trend: "⚠️ Requieren atención",
    },
    {
      title: "Ingresos Confirmados",
      value: `€${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      description: "Anticipos cobrados",
      trend: "+€45 esta semana",
    },
    {
      title: "Total de Citas",
      value: mockAppointments.length.toString(),
      icon: LayoutDashboard,
      description: "Citas en el sistema",
      trend: "+3 este mes",
    },
  ]

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'short'
    }
    return new Date(dateString).toLocaleDateString('es-ES', options)
  }

  const formatTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(dateString).toLocaleTimeString('es-ES', options)
  }

  // Simular carga de datos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  const getStatusBadge = (status: "pending" | "confirmed" | "expired") => {
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

  // Obtener próximas 5 citas (ordenadas por fecha)
  const upcomingAppointments = [...mockAppointments]
    .sort((a, b) => new Date(a.appointment_date).getTime() - new Date(b.appointment_date).getTime())
    .slice(0, 5)

  return (
    <div className="flex-1 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Vista general de tu clínica
          </p>
        </div>
        <Link href="/citas">
          <Button>
            Ver Todas las Citas
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-4 rounded" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-[60px] mb-2" />
                <Skeleton className="h-3 w-[120px]" />
              </CardContent>
            </Card>
          ))
        ) : (
          // Real stats
          stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
                <p className="text-xs text-primary mt-1 font-medium">
                  {stat.trend}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Próximas Citas */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold tracking-tight">Próximas Citas</h3>
            <p className="text-sm text-muted-foreground">
              Citas programadas en orden cronológico
            </p>
          </div>
        </div>

        {isLoading ? (
          // Loading skeleton
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[150px]" />
              <Skeleton className="h-4 w-[250px]" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-3 w-[150px]" />
                  </div>
                  <Skeleton className="h-6 w-[80px]" />
                </div>
              ))}
            </CardContent>
          </Card>
        ) : upcomingAppointments.length === 0 ? (
          // Empty state mejorado
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay citas programadas</h3>
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Crea tu primera cita para comenzar a gestionar tus pacientes
              </p>
              <Link href="/citas">
                <Button>
                  <Calendar className="mr-2 h-4 w-4" />
                  Nueva Cita
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          // Lista de citas
          <Card>
            <CardHeader>
              <CardTitle>Lista de Citas</CardTitle>
              <CardDescription>
                Mostrando las próximas {upcomingAppointments.length} citas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{appt.patient_name}</p>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(appt.appointment_date)}</span>
                          <span>•</span>
                          <Clock className="h-3 w-3" />
                          <span>{formatTime(appt.appointment_date)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">€{appt.deposit_amount.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">Anticipo</p>
                      </div>
                      {getStatusBadge(appt.status)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link href="/citas">
                  <Button variant="outline" className="w-full">
                    Ver Todas las Citas
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
