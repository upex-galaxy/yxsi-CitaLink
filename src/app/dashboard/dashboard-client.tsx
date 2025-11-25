"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Appointment } from "@/lib/types";
import { ArrowRight, Calendar, Clock, DollarSign, LayoutDashboard, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface DashboardClientProps {
  appointments: Appointment[];
}

export function DashboardClient({ appointments: initialAppointments }: DashboardClientProps) {
  const [appointments] = useState(initialAppointments);

  const today = new Date();

  const todayAppointments = appointments.filter((appt) => {
    if (!appt.appointment_date) return false;
    const date = new Date(appt.appointment_date);
    return date.toDateString() === today.toDateString();
  });

  const upcomingAppointments = appointments
    .filter((appt) => appt.appointment_date && new Date(appt.appointment_date) > today)
    .sort(
      (a, b) =>
        new Date(a.appointment_date as string).getTime() -
        new Date(b.appointment_date as string).getTime()
    )
    .slice(0, 5);

  const totalConfirmed = appointments.filter((a) => a.status === "confirmed").length;
  const totalPending = appointments.filter((a) => a.status === "pending").length;
  const totalExpired = appointments.filter((a) => a.status === "expired").length;
  const totalCancelled = appointments.filter((a) => a.status === "cancelled").length;

  const totalRevenue = appointments.reduce((sum, appt) => {
    const amount = Number(appt.total_amount) || 0;
    return sum + amount;
  }, 0);

  const confirmedRevenue = appointments.reduce((sum, appt) => {
    const amount = Number(appt.total_amount) || 0;
    return appt.status === "confirmed" ? sum + amount : sum;
  }, 0);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(amount);

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getStatusBadge = (status: Appointment["status"]) => {
    if (!status) return null;

    if (
      status !== "confirmed" &&
      status !== "pending" &&
      status !== "expired" &&
      status !== "cancelled"
    ) {
      return null;
    }

    const variants = {
      confirmed: "default" as const,
      pending: "secondary" as const,
      expired: "destructive" as const,
      cancelled: "outline" as const,
    };

    const labels = {
      confirmed: "Confirmada",
      pending: "Pendiente",
      expired: "Expirada",
      cancelled: "Cancelada",
    };

    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Cabecera */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Panel de control</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Resumen rápido de tus citas y actividad reciente
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/citas">
            <Button variant="outline" size="sm">
              Ver todas las citas
            </Button>
          </Link>
          <Link href="/citas">
            <Button size="sm">
              Nueva cita
            </Button>
          </Link>
        </div>
      </div>

      {/* Tarjetas resumen */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Citas de hoy</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              {todayAppointments.length > 0
                ? "Revisa la agenda del día"
                : "No hay citas programadas para hoy"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Confirmadas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConfirmed}</div>
            <p className="text-xs text-muted-foreground">
              {totalConfirmed > 0
                ? "Pacientes con cita asegurada"
                : "Todavía no hay citas confirmadas"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ingresos estimados</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              {confirmedRevenue > 0
                ? `${formatCurrency(confirmedRevenue)} ya confirmados`
                : "Aún no hay ingresos confirmados"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pendientes / Expiradas</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalPending + totalExpired + totalCancelled}
            </div>
            <p className="text-xs text-muted-foreground">
              {totalPending > 0 || totalExpired > 0 || totalCancelled > 0
                ? `${totalPending} pendientes · ${totalExpired} expiradas · ${totalCancelled} canceladas`
                : "Todo en orden, sin citas en riesgo"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Próximas citas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Próximas citas
          </CardTitle>
          <CardDescription>Citas programadas para los próximos días</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingAppointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Calendar className="h-10 w-10 text-muted-foreground mb-3" />
              <p className="text-sm font-medium">No hay citas próximas</p>
              <p className="text-xs text-muted-foreground mb-4">
                Cuando crees nuevas citas, aparecerán aquí para un vistazo rápido.
              </p>
              <Link href="/citas">
                <Button size="sm">Crear primera cita</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingAppointments.map((appt) => (
                <div
                  key={appt.id}
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">
                        {appt.patient_name || "Paciente sin nombre"}
                      </p>
                      {getStatusBadge(appt.status)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatDateTime(appt.appointment_date ?? null)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {formatCurrency(Number(appt.total_amount) || 0)}
                    </p>
                    {appt.deposit_amount && (
                      <p className="text-xs text-muted-foreground">
                        Anticipo: {formatCurrency(Number(appt.deposit_amount) || 0)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* CTA inferior */}
      <div className="mt-4 text-center">
        <Link href="/citas">
          <Button variant="outline" className="w-full md:w-auto">
            Ver todas las citas
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
