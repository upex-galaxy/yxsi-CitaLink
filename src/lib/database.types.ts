
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string 
          email: string
          created_at: string 
        }
        Insert: {
          id: string 
          email: string
          created_at?: string
        }
        Update: {
          email?: string
        }
      }
      clinics: {
        Row: {
          id: string 
          name: string
          stripe_account_id: string | null
          settings: Json | null
          created_at: string 
          owner_id: string 
        }
        Insert: {
          id?: string
          name: string
          stripe_account_id?: string | null
          settings?: Json | null
          created_at?: string
          owner_id: string
        }
        Update: {
          name?: string
          stripe_account_id?: string | null
          settings?: Json | null
        }
      }
      appointments: {
        Row: {
          id: string 
          clinic_id: string 
          patient_name: string
          status: "pending" | "confirmed" | "expired"
          total_amount: number 
          deposit_amount: number 
          appointment_date: string 
          expires_at: string 
          created_at: string 
        }
        Insert: {
          id?: string
          clinic_id: string
          patient_name: string
          status?: "pending" | "confirmed" | "expired"
          total_amount: number
          deposit_amount: number
          appointment_date: string
          expires_at: string
          created_at?: string
        }
        Update: {
          status?: "pending" | "confirmed" | "expired"
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
