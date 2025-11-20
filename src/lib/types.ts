import type { Database } from './database.types'

// Extract table row types
export type User = Database['public']['Tables']['users']['Row']
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type UserUpdate = Database['public']['Tables']['users']['Update']

// Add more types as needed based on your schema
export type Appointment = Database['public']['Tables']['appointments']['Row']
export type Clinic = Database['public']['Tables']['clinics']['Row']


// Helper type for API responses
export type ApiResponse<T> = {
  data: T | null
  error: string | null
}