import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Middleware básico: deja pasar la request tal cual.
// Más adelante aquí podrás meter lógica de auth / sesiones si la necesitas.
export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

// Ajusta las rutas que quieras “proteger” o interceptar con el middleware.
// Si quieres que aplique a toda la app, puedes usar:
// matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
export const config = {
  matcher: ["/dashboard/:path*", "/citas/:path*"],
}
