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
          {
            foreignKeyName: "contractor_media_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "contractor_profiles_public"
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
      partner_access_requests: {
        Row: {
          company: string | null
          country: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          kind: string
          last_name: string
          message: string | null
          phone: string | null
          status: string
        }
        Insert: {
          company?: string | null
          country?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          kind?: string
          last_name: string
          message?: string | null
          phone?: string | null
          status?: string
        }
        Update: {
          company?: string | null
          country?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          kind?: string
          last_name?: string
          message?: string | null
          phone?: string | null
          status?: string
        }
        Relationships: []
      }
      partner_activity_log: {
        Row: {
          action: string
          created_at: string
          entity: string | null
          entity_id: string | null
          id: string
          ip: string | null
          meta: Json | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          entity?: string | null
          entity_id?: string | null
          id?: string
          ip?: string | null
          meta?: Json | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          entity?: string | null
          entity_id?: string | null
          id?: string
          ip?: string | null
          meta?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      partner_ai_simulations: {
        Row: {
          color: string | null
          created_at: string
          finish: string | null
          id: string
          product: string | null
          project_id: string | null
          result_image_url: string | null
          source_image_url: string | null
          surface_m2: number | null
          tech_sheet: Json | null
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          finish?: string | null
          id?: string
          product?: string | null
          project_id?: string | null
          result_image_url?: string | null
          source_image_url?: string | null
          surface_m2?: number | null
          tech_sheet?: Json | null
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string
          finish?: string | null
          id?: string
          product?: string | null
          project_id?: string | null
          result_image_url?: string | null
          source_image_url?: string | null
          surface_m2?: number | null
          tech_sheet?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "partner_ai_simulations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "partner_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_appointments: {
        Row: {
          created_at: string
          duration_min: number
          id: string
          kind: string
          notes: string | null
          scheduled_at: string
          status: string
          subject: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          duration_min?: number
          id?: string
          kind?: string
          notes?: string | null
          scheduled_at: string
          status?: string
          subject?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          duration_min?: number
          id?: string
          kind?: string
          notes?: string | null
          scheduled_at?: string
          status?: string
          subject?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      partner_clients: {
        Row: {
          address: string | null
          country: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string
          notes: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      partner_event_registrations: {
        Row: {
          created_at: string
          event_id: string
          id: string
          seats: number
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          seats?: number
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          seats?: number
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "partner_event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "partner_events"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_events: {
        Row: {
          capacity: number
          cover_url: string | null
          created_at: string
          description: string | null
          ends_at: string | null
          event_type: string | null
          id: string
          location: string | null
          starts_at: string
          title: string
          updated_at: string
        }
        Insert: {
          capacity?: number
          cover_url?: string | null
          created_at?: string
          description?: string | null
          ends_at?: string | null
          event_type?: string | null
          id?: string
          location?: string | null
          starts_at: string
          title: string
          updated_at?: string
        }
        Update: {
          capacity?: number
          cover_url?: string | null
          created_at?: string
          description?: string | null
          ends_at?: string | null
          event_type?: string | null
          id?: string
          location?: string | null
          starts_at?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      partner_media_library: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          downloadable: boolean
          id: string
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          url: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          downloadable?: boolean
          id?: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          url: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          downloadable?: boolean
          id?: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      partner_profiles: {
        Row: {
          address: string | null
          admin_documents: Json | null
          avatar_url: string | null
          company: string | null
          country: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          kind: string
          languages: string[] | null
          last_name: string | null
          logo_url: string | null
          phone: string | null
          private_gallery: Json | null
          professional_number: string | null
          service_areas: string[] | null
          specialty: string | null
          updated_at: string
          user_id: string
          website: string | null
          years_experience: number | null
        }
        Insert: {
          address?: string | null
          admin_documents?: Json | null
          avatar_url?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          kind?: string
          languages?: string[] | null
          last_name?: string | null
          logo_url?: string | null
          phone?: string | null
          private_gallery?: Json | null
          professional_number?: string | null
          service_areas?: string[] | null
          specialty?: string | null
          updated_at?: string
          user_id: string
          website?: string | null
          years_experience?: number | null
        }
        Update: {
          address?: string | null
          admin_documents?: Json | null
          avatar_url?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          kind?: string
          languages?: string[] | null
          last_name?: string | null
          logo_url?: string | null
          phone?: string | null
          private_gallery?: Json | null
          professional_number?: string | null
          service_areas?: string[] | null
          specialty?: string | null
          updated_at?: string
          user_id?: string
          website?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      partner_project_clients: {
        Row: {
          client_id: string
          project_id: string
          user_id: string
        }
        Insert: {
          client_id: string
          project_id: string
          user_id: string
        }
        Update: {
          client_id?: string
          project_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "partner_project_clients_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "partner_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_project_clients_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "partner_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_project_documents: {
        Row: {
          created_at: string
          id: string
          kind: string
          name: string
          project_id: string
          size_bytes: number | null
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          kind?: string
          name: string
          project_id: string
          size_bytes?: number | null
          url: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          kind?: string
          name?: string
          project_id?: string
          size_bytes?: number | null
          url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "partner_project_documents_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "partner_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_project_media: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          kind: string
          project_id: string
          sort_order: number
          url: string
          user_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: string
          kind?: string
          project_id: string
          sort_order?: number
          url: string
          user_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          kind?: string
          project_id?: string
          sort_order?: number
          url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "partner_project_media_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "partner_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_projects: {
        Row: {
          classification: string | null
          cost_labor: number | null
          cost_material: number | null
          created_at: string
          description: string | null
          estimated_price: number | null
          floors: number | null
          history: Json | null
          id: string
          internal_comments: string | null
          location_kind: string | null
          private_notes: string | null
          property_type: string | null
          rooms: number | null
          status: string
          surface_m2: number | null
          surface_sqft: number | null
          title: string
          total_budget: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          classification?: string | null
          cost_labor?: number | null
          cost_material?: number | null
          created_at?: string
          description?: string | null
          estimated_price?: number | null
          floors?: number | null
          history?: Json | null
          id?: string
          internal_comments?: string | null
          location_kind?: string | null
          private_notes?: string | null
          property_type?: string | null
          rooms?: number | null
          status?: string
          surface_m2?: number | null
          surface_sqft?: number | null
          title: string
          total_budget?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          classification?: string | null
          cost_labor?: number | null
          cost_material?: number | null
          created_at?: string
          description?: string | null
          estimated_price?: number | null
          floors?: number | null
          history?: Json | null
          id?: string
          internal_comments?: string | null
          location_kind?: string | null
          private_notes?: string | null
          property_type?: string | null
          rooms?: number | null
          status?: string
          surface_m2?: number | null
          surface_sqft?: number | null
          title?: string
          total_budget?: number | null
          updated_at?: string
          user_id?: string
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
          {
            foreignKeyName: "quote_requests_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "contractor_profiles_public"
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
      contractor_profiles_public: {
        Row: {
          address: string | null
          avatar_url: string | null
          bio: string | null
          certifications: string[] | null
          city: string | null
          company_name: string | null
          contact_name: string | null
          country: string | null
          cover_url: string | null
          created_at: string | null
          email: string | null
          facebook: string | null
          id: string | null
          instagram: string | null
          is_featured: boolean | null
          is_published: boolean | null
          phone: string | null
          service_areas: string[] | null
          show_address: boolean | null
          show_email: boolean | null
          show_phone: boolean | null
          show_social: boolean | null
          slug: string | null
          specialties: string[] | null
          tagline: string | null
          updated_at: string | null
          user_id: string | null
          website: string | null
          years_experience: number | null
        }
        Insert: {
          address?: never
          avatar_url?: string | null
          bio?: string | null
          certifications?: string[] | null
          city?: string | null
          company_name?: string | null
          contact_name?: string | null
          country?: string | null
          cover_url?: string | null
          created_at?: string | null
          email?: never
          facebook?: never
          id?: string | null
          instagram?: never
          is_featured?: boolean | null
          is_published?: boolean | null
          phone?: never
          service_areas?: string[] | null
          show_address?: boolean | null
          show_email?: boolean | null
          show_phone?: boolean | null
          show_social?: boolean | null
          slug?: string | null
          specialties?: string[] | null
          tagline?: string | null
          updated_at?: string | null
          user_id?: string | null
          website?: string | null
          years_experience?: number | null
        }
        Update: {
          address?: never
          avatar_url?: string | null
          bio?: string | null
          certifications?: string[] | null
          city?: string | null
          company_name?: string | null
          contact_name?: string | null
          country?: string | null
          cover_url?: string | null
          created_at?: string | null
          email?: never
          facebook?: never
          id?: string | null
          instagram?: never
          is_featured?: boolean | null
          is_published?: boolean | null
          phone?: never
          service_areas?: string[] | null
          show_address?: boolean | null
          show_email?: boolean | null
          show_phone?: boolean | null
          show_social?: boolean | null
          slug?: string | null
          specialties?: string[] | null
          tagline?: string | null
          updated_at?: string | null
          user_id?: string | null
          website?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      projects_public: {
        Row: {
          after_photo: string | null
          before_photo: string | null
          color: string | null
          created_at: string | null
          end_date: string | null
          id: string | null
          product_type: string | null
          short_description: string | null
          start_date: string | null
          status: Database["public"]["Enums"]["project_status"] | null
          surface_m2: number | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          after_photo?: string | null
          before_photo?: string | null
          color?: string | null
          created_at?: string | null
          end_date?: string | null
          id?: string | null
          product_type?: string | null
          short_description?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["project_status"] | null
          surface_m2?: number | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          after_photo?: string | null
          before_photo?: string | null
          color?: string | null
          created_at?: string | null
          end_date?: string | null
          id?: string | null
          product_type?: string | null
          short_description?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["project_status"] | null
          surface_m2?: number | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_partner: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "contractor" | "user" | "architect" | "builder"
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
      app_role: ["admin", "contractor", "user", "architect", "builder"],
      project_priority: ["low", "medium", "high", "urgent"],
      project_status: ["planned", "in_progress", "completed", "on_hold"],
    },
  },
} as const
