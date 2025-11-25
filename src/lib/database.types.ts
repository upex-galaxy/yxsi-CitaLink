export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_date: string
          clinic_id: string
          created_at: string
          deposit_amount: number
          expires_at: string
          id: string
          patient_name: string
          status: string
          total_amount: number
        }
        Insert: {
          appointment_date: string
          clinic_id: string
          created_at?: string
          deposit_amount: number
          expires_at: string
          id?: string
          patient_name: string
          status?: string
          total_amount: number
        }
        Update: {
          appointment_date?: string
          clinic_id?: string
          created_at?: string
          deposit_amount?: number
          expires_at?: string
          id?: string
          patient_name?: string
          status?: string
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "appointments_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          }
        ]
      }
      clinics: {
        Row: {
          created_at: string
          id: string
          name: string
          settings: Json | null
          stripe_account_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          settings?: Json | null
          stripe_account_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          settings?: Json | null
          stripe_account_id?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          clinic_id: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          clinic_id?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          clinic_id?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_clinic_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
