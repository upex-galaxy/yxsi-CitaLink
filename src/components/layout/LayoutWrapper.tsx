"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "./Navbar"
import { Sidebar } from "./Sidebar"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/"

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
