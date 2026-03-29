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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          author_id: string
          author_name: string
          author_role: string
          created_at: string
          id: string
          message: string
          priority: string
          school_id: string
          target_class: string | null
          title: string
        }
        Insert: {
          author_id: string
          author_name?: string
          author_role?: string
          created_at?: string
          id?: string
          message?: string
          priority?: string
          school_id: string
          target_class?: string | null
          title: string
        }
        Update: {
          author_id?: string
          author_name?: string
          author_role?: string
          created_at?: string
          id?: string
          message?: string
          priority?: string
          school_id?: string
          target_class?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "announcements_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      assignments: {
        Row: {
          assignment_type: string
          created_at: string
          description: string | null
          difficulty_level: string | null
          due_date: string | null
          id: string
          questions: Json
          school_id: string
          status: string
          subject: string | null
          target_class: string
          teacher_id: string
          title: string
          updated_at: string
        }
        Insert: {
          assignment_type?: string
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          due_date?: string | null
          id?: string
          questions?: Json
          school_id: string
          status?: string
          subject?: string | null
          target_class: string
          teacher_id: string
          title: string
          updated_at?: string
        }
        Update: {
          assignment_type?: string
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          due_date?: string | null
          id?: string
          questions?: Json
          school_id?: string
          status?: string
          subject?: string | null
          target_class?: string
          teacher_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignments_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance: {
        Row: {
          date: string
          id: string
          marked_at: string
          school_id: string
          status: string
          student_id: string
          teacher_id: string
        }
        Insert: {
          date?: string
          id?: string
          marked_at?: string
          school_id: string
          status?: string
          student_id: string
          teacher_id: string
        }
        Update: {
          date?: string
          id?: string
          marked_at?: string
          school_id?: string
          status?: string
          student_id?: string
          teacher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      discussion_replies: {
        Row: {
          author_id: string
          author_name: string
          author_role: string
          created_at: string
          discussion_id: string
          id: string
          message: string
        }
        Insert: {
          author_id: string
          author_name?: string
          author_role?: string
          created_at?: string
          discussion_id: string
          id?: string
          message?: string
        }
        Update: {
          author_id?: string
          author_name?: string
          author_role?: string
          created_at?: string
          discussion_id?: string
          id?: string
          message?: string
        }
        Relationships: [
          {
            foreignKeyName: "discussion_replies_discussion_id_fkey"
            columns: ["discussion_id"]
            isOneToOne: false
            referencedRelation: "discussions"
            referencedColumns: ["id"]
          },
        ]
      }
      discussions: {
        Row: {
          author_id: string
          author_name: string
          author_role: string
          class_name: string
          created_at: string
          id: string
          is_pinned: boolean
          is_resolved: boolean
          message: string
          school_id: string
          title: string
          topic_id: string | null
        }
        Insert: {
          author_id: string
          author_name?: string
          author_role?: string
          class_name: string
          created_at?: string
          id?: string
          is_pinned?: boolean
          is_resolved?: boolean
          message?: string
          school_id: string
          title: string
          topic_id?: string | null
        }
        Update: {
          author_id?: string
          author_name?: string
          author_role?: string
          class_name?: string
          created_at?: string
          id?: string
          is_pinned?: boolean
          is_resolved?: boolean
          message?: string
          school_id?: string
          title?: string
          topic_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "discussions_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message: string
          reference_id: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          reference_id?: string | null
          title?: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          reference_id?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      project_submissions: {
        Row: {
          allow_resubmission: boolean | null
          checklist_progress: Json | null
          code_content: string | null
          evaluated_at: string | null
          evaluated_by: string | null
          evaluation_status: string | null
          feedback: string | null
          file_url: string | null
          grade: string | null
          id: string
          improvements: string | null
          link_url: string | null
          marks: number | null
          notes: string
          project_id: string
          strengths: string | null
          student_id: string
          submission_type: string | null
          submitted_at: string
        }
        Insert: {
          allow_resubmission?: boolean | null
          checklist_progress?: Json | null
          code_content?: string | null
          evaluated_at?: string | null
          evaluated_by?: string | null
          evaluation_status?: string | null
          feedback?: string | null
          file_url?: string | null
          grade?: string | null
          id?: string
          improvements?: string | null
          link_url?: string | null
          marks?: number | null
          notes?: string
          project_id: string
          strengths?: string | null
          student_id: string
          submission_type?: string | null
          submitted_at?: string
        }
        Update: {
          allow_resubmission?: boolean | null
          checklist_progress?: Json | null
          code_content?: string | null
          evaluated_at?: string | null
          evaluated_by?: string | null
          evaluation_status?: string | null
          feedback?: string | null
          file_url?: string | null
          grade?: string | null
          id?: string
          improvements?: string | null
          link_url?: string | null
          marks?: number | null
          notes?: string
          project_id?: string
          strengths?: string | null
          student_id?: string
          submission_type?: string | null
          submitted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_submissions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_submissions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          description: string
          difficulty_level: string | null
          due_date: string | null
          estimated_time: string | null
          expected_output: string | null
          id: string
          instructions: Json | null
          learning_objective: string | null
          max_marks: number | null
          reference_resources: Json | null
          school_id: string
          submission_type: string | null
          target_class: string
          teacher_id: string
          technology: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string
          difficulty_level?: string | null
          due_date?: string | null
          estimated_time?: string | null
          expected_output?: string | null
          id?: string
          instructions?: Json | null
          learning_objective?: string | null
          max_marks?: number | null
          reference_resources?: Json | null
          school_id: string
          submission_type?: string | null
          target_class: string
          teacher_id: string
          technology?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          difficulty_level?: string | null
          due_date?: string | null
          estimated_time?: string | null
          expected_output?: string | null
          id?: string
          instructions?: Json | null
          learning_objective?: string | null
          max_marks?: number | null
          reference_resources?: Json | null
          school_id?: string
          submission_type?: string | null
          target_class?: string
          teacher_id?: string
          technology?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_attempts: {
        Row: {
          answers: Json
          id: string
          score: number
          student_id: string
          submitted_at: string
          topic_id: string
          total_questions: number
          xp_earned: number
        }
        Insert: {
          answers?: Json
          id?: string
          score?: number
          student_id: string
          submitted_at?: string
          topic_id: string
          total_questions?: number
          xp_earned?: number
        }
        Update: {
          answers?: Json
          id?: string
          score?: number
          student_id?: string
          submitted_at?: string
          topic_id?: string
          total_questions?: number
          xp_earned?: number
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      schools: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          id: string
          logo: string | null
          name: string
          phone: string | null
          sections: string[] | null
          state: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          id?: string
          logo?: string | null
          name: string
          phone?: string | null
          sections?: string[] | null
          state?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          id?: string
          logo?: string | null
          name?: string
          phone?: string | null
          sections?: string[] | null
          state?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      student_notes: {
        Row: {
          content: string
          id: string
          student_id: string
          topic_id: string
          updated_at: string
        }
        Insert: {
          content?: string
          id?: string
          student_id: string
          topic_id: string
          updated_at?: string
        }
        Update: {
          content?: string
          id?: string
          student_id?: string
          topic_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_notes_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          class: string | null
          created_at: string
          father_name: string | null
          id: string
          name: string
          progress: number | null
          roll_no: string | null
          school_id: string
          section: string | null
          teacher_id: string | null
          updated_at: string
          user_id: string | null
          xp: number | null
        }
        Insert: {
          class?: string | null
          created_at?: string
          father_name?: string | null
          id?: string
          name: string
          progress?: number | null
          roll_no?: string | null
          school_id: string
          section?: string | null
          teacher_id?: string | null
          updated_at?: string
          user_id?: string | null
          xp?: number | null
        }
        Update: {
          class?: string | null
          created_at?: string
          father_name?: string | null
          id?: string
          name?: string
          progress?: number | null
          roll_no?: string | null
          school_id?: string
          section?: string | null
          teacher_id?: string | null
          updated_at?: string
          user_id?: string | null
          xp?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "students_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      submissions: {
        Row: {
          answers: Json
          assignment_id: string
          id: string
          score: number
          student_id: string
          submitted_at: string
          total_questions: number
        }
        Insert: {
          answers?: Json
          assignment_id: string
          id?: string
          score?: number
          student_id: string
          submitted_at?: string
          total_questions?: number
        }
        Update: {
          answers?: Json
          assignment_id?: string
          id?: string
          score?: number
          student_id?: string
          submitted_at?: string
          total_questions?: number
        }
        Relationships: [
          {
            foreignKeyName: "submissions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      teachers: {
        Row: {
          classes: string[] | null
          created_at: string
          first_name: string
          id: string
          last_name: string | null
          school_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          classes?: string[] | null
          created_at?: string
          first_name: string
          id?: string
          last_name?: string | null
          school_id: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          classes?: string[] | null
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string | null
          school_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teachers_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      topic_completions: {
        Row: {
          completed_at: string
          id: string
          student_id: string
          topic_id: string
        }
        Insert: {
          completed_at?: string
          id?: string
          student_id: string
          topic_id: string
        }
        Update: {
          completed_at?: string
          id?: string
          student_id?: string
          topic_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "topic_completions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      typing_scores: {
        Row: {
          accuracy: number
          created_at: string
          duration: number
          id: string
          passage_level: string
          student_id: string
          wpm: number
        }
        Insert: {
          accuracy?: number
          created_at?: string
          duration?: number
          id?: string
          passage_level?: string
          student_id: string
          wpm?: number
        }
        Update: {
          accuracy?: number
          created_at?: string
          duration?: number
          id?: string
          passage_level?: string
          student_id?: string
          wpm?: number
        }
        Relationships: [
          {
            foreignKeyName: "typing_scores_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_security: {
        Row: {
          created_at: string
          id: string
          pin: string
          security_answer: string
          security_question: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          pin: string
          security_answer: string
          security_question: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          pin?: string
          security_answer?: string
          security_question?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_school_id_for_user: { Args: { _user_id: string }; Returns: string }
      get_student_school_id: { Args: { _user_id: string }; Returns: string }
      get_student_teacher_id: { Args: { _user_id: string }; Returns: string }
      get_teacher_id_for_user: { Args: { _user_id: string }; Returns: string }
      get_teacher_school_id: { Args: { _user_id: string }; Returns: string }
      get_user_profile: { Args: { _user_id: string }; Returns: Json }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "school" | "teacher" | "student"
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
      app_role: ["admin", "school", "teacher", "student"],
    },
  },
} as const
