import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LayoutDashboard, Calendar, Users, Settings } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "Citas Hoy",
      value: "12",
      icon: Calendar,
      description: "Citas programadas para hoy",
    },
    {
      title: "Nuevos Pacientes",
      value: "3",
      icon: Users,
      description: "Pacientes registrados esta semana",
    },
    {
      title: "Citas Pendientes",
      value: "45",
      icon: LayoutDashboard,
      description: "Total de citas por confirmar",
    },
    {
      title: "Configuraciones",
      value: "OK",
      icon: Settings,
      description: "Estado de la configuración de la clínica",
    },
  ]

  return (
    <div className="flex-1 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold tracking-tight mb-4">Próximas Citas</h3>
        <Card>
          <CardHeader>
            <CardTitle>Lista de Citas</CardTitle>
            <CardDescription>Aquí se mostrarán las próximas citas.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for a list or table of appointments */}
            <p className="text-muted-foreground">No hay citas próximas para mostrar.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}