export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      contractor_media: {
        Row: {
          caption: string | null
          contractor_id: string
          created_at: string
          id: string
          sort_order: number
          type: string
          url: string
        }
        Insert: {
          caption?: string | null
          contractor_id: string
          created_at?: string
          id?: string
          sort_order?: number
          type?: string
          url: string
        }
        Update: {
          caption?: string | null
          contractor_id?: string
          created_at?: string
          id?: string
          sort_order?: number
          type?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "contractor_media_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "contractor_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contractor_profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          bio: string | null
          certifications: string[] | null
          city: string | null
          company_name: string
          contact_name: string | null
          country: string | null
          cover_url: string | null
          created_at: string
          email: string | null
          facebook: string | null
          id: string
          instagram: string | null
          is_featured: boolean
          is_published: boolean
          phone: string | null
          service_areas: string[]
          show_address: boolean
          show_email: boolean
          show_phone: boolean
          show_social: boolean
          slug: string
          specialties: string[] | null
          tagline: string | null
          updated_at: string
          user_id: string
          website: string | null
          years_experience: number | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          bio?: string | null
          certifications?: string[] | null
          city?: string | null
          company_name: string
          contact_name?: string | null
          country?: string | null
          cover_url?: string | null
          created_at?: string
          email?: string | null
          facebook?: string | null
          id?: string
          instagram?: string | null
          is_featured?: boolean
          is_published?: boolean
          phone?: string | null
          service_areas?: string[]
          show_address?: boolean
          show_email?: boolean
          show_phone?: boolean
          show_social?: boolean
          slug: string
          specialties?: string[] | null
          tagline?: string | null
          updated_at?: string
          user_id: string
          website?: string | null
          years_experience?: number | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          bio?: string | null
          certifications?: string[] | null
          city?: string | null
          company_name?: string
          contact_name?: string | null
          country?: string | null
          cover_url?: string | null
          created_at?: string
          email?: string | null
          facebook?: string | null
          id?: string
          instagram?: string | null
          is_featured?: boolean
          is_published?: boolean
          phone?: string | null
          service_areas?: string[]
          show_address?: boolean
          show_email?: boolean
          show_phone?: boolean
          show_social?: boolean
          slug?: string
          specialties?: string[] | null
          tagline?: string | null
          updated_at?: string
          user_id?: string
          website?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          address: string | null
          after_photo: string | null
          before_photo: string | null
          client_name: string | null
          color: string | null
          cost_labor: number
          cost_material: number
          created_at: string
          end_date: string | null
          id: string
          is_public: boolean
          notes: string | null
          priority: Database["public"]["Enums"]["project_priority"]
          product_type: string | null
          revenue: number | null
          short_description: string | null
          start_date: string | null
          status: Database["public"]["Enums"]["project_status"]
          surface_m2: number | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          after_photo?: string | null
          before_photo?: string | null
          client_name?: string | null
          color?: string | null
          cost_labor?: number
          cost_material?: number
          created_at?: string
          end_date?: string | null
          id?: string
          is_public?: boolean
          notes?: string | null
          priority?: Database["public"]["Enums"]["project_priority"]
          product_type?: string | null
          revenue?: number | null
          short_description?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["project_status"]
          surface_m2?: number | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          after_photo?: string | null
          before_photo?: string | null
          client_name?: string | null
          color?: string | null
          cost_labor?: number
          cost_material?: number
          created_at?: string
          end_date?: string | null
          id?: string
          is_public?: boolean
          notes?: string | null
          priority?: Database["public"]["Enums"]["project_priority"]
          product_type?: string | null
          revenue?: number | null
          short_description?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["project_status"]
          surface_m2?: number | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      quote_requests: {
        Row: {
          contractor_id: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          project_type: string | null
          surface_m2: number | null
        }
        Insert: {
          contractor_id?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          project_type?: string | null
          surface_m2?: number | null
        }
        Update: {
          contractor_id?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          project_type?: string | null
          surface_m2?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quote_requests_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "contractor_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "contractor" | "user"
      project_priority: "low" | "medium" | "high" | "urgent"
      project_status: "planned" | "in_progress" | "completed" | "on_hold"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "contractor", "user"],
      project_priority: ["low", "medium", "high", "urgent"],
      project_status: ["planned", "in_progress", "completed", "on_hold"],
    },
  },
} as const
