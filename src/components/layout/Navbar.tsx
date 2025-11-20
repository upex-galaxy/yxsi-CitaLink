"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, LayoutDashboard, Calendar, Users, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-card border-b border-border px-4 py-2 flex items-center justify-between shadow-sm">
      <div className="flex items-center">
        <Link href="/" className="flex items-center space-x-2">
          {/* Placeholder for logo */}
          <img src="/logo-CitaLink.png" alt="CitaLink Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-foreground">CitaLink</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-4">
        <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
          <LayoutDashboard className="h-5 w-5 inline-block mr-1" /> Dashboard
        </Link>
        <Link href="/citas" className="text-muted-foreground hover:text-primary transition-colors">
          <Calendar className="h-5 w-5 inline-block mr-1" /> Citas
        </Link>
        <Link href="/pacientes" className="text-muted-foreground hover:text-primary transition-colors">
          <Users className="h-5 w-5 inline-block mr-1" /> Pacientes
        </Link>
        <Link href="/settings" className="text-muted-foreground hover:text-primary transition-colors">
          <Settings className="h-5 w-5 inline-block mr-1" /> Configuración
        </Link>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button variant="ghost" size="icon" onClick={toggleMenu}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-14 left-0 w-full bg-card border-b border-border shadow-lg md:hidden z-50">
          <div className="flex flex-col p-4 space-y-2">
            <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>
              <LayoutDashboard className="h-5 w-5 inline-block mr-2" /> Dashboard
            </Link>
            <Link href="/citas" className="text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>
              <Calendar className="h-5 w-5 inline-block mr-2" /> Citas
            </Link>
            <Link href="/pacientes" className="text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>
              <Users className="h-5 w-5 inline-block mr-2" /> Pacientes
            </Link>
            <Link href="/settings" className="text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>
              <Settings className="h-5 w-5 inline-block mr-2" /> Configuración
            </Link>
            <div className="flex items-center space-x-2 mt-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground">Usuario</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}