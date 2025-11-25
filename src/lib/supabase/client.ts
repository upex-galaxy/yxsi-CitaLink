
import { createBrowserClient } from '@supabase/ssr'
import { config } from '@/lib/config'
import type { Database } from '@/lib/database.types'

// Define a function to create a Supabase client for client-side operations
export function createClient() {
  return createBrowserClient<Database>(
    config.supabase.url,
    config.supabase.anonKey
  )
}
