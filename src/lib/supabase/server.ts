import { config } from "@/lib/config"
import type { Database } from "@/lib/database.types"
import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"

export function createServer() {
  // Forzamos el tipo para evitar el conflicto con Promise<ReadonlyRequestCookies>
  // En tiempo de ejecución cookies() es síncrono y funciona correctamente.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cookieStore = cookies() as any

  return createServerClient<Database>(config.supabase.url, config.supabase.anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch {
          // Si se llama desde un Server Component, Next puede no permitir setear cookies directamente.
          // Se puede ignorar si tienes middleware que refresca sesiones.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options })
        } catch {
          // Ídem que en set(): en algunos contextos Next no permite modificar cookies aquí.
        }
      },
    },
  })
}
