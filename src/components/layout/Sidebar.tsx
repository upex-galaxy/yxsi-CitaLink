"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Calendar, Users, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Citas",
      href: "/citas",
      icon: Calendar,
    },
    {
      name: "Pacientes",
      href: "/pacientes",
      icon: Users,
    },
    {
      name: "Configuración",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 bg-card border-r border-border shadow-md p-4">
      <div className="mb-8">
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo-CitaLink.png" alt="CitaLink Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-foreground">CitaLink</span>
        </Link>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 p-2 rounded-md text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}