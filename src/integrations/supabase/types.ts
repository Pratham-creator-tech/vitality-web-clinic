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
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_date: string
          created_at: string
          doctor_id: string
          id: string
          notes: string | null
          patient_id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          appointment_date: string
          created_at?: string
          doctor_id: string
          id?: string
          notes?: string | null
          patient_id: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          appointment_date?: string
          created_at?: string
          doctor_id?: string
          id?: string
          notes?: string | null
          patient_id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          author_id: string | null
          content: string
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          published: boolean
          published_at: string | null
          reading_time: number | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean
          published_at?: string | null
          reading_time?: number | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean
          published_at?: string | null
          reading_time?: number | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          responded_at: string | null
          status: string
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          responded_at?: string | null
          status?: string
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          responded_at?: string | null
          status?: string
          subject?: string | null
        }
        Relationships: []
      }
      diagnoses: {
        Row: {
          condition: string
          created_at: string
          description: string | null
          diagnosis_date: string
          doctor_id: string
          id: string
          patient_id: string
          treatment_plan: string | null
          updated_at: string
        }
        Insert: {
          condition: string
          created_at?: string
          description?: string | null
          diagnosis_date?: string
          doctor_id: string
          id?: string
          patient_id: string
          treatment_plan?: string | null
          updated_at?: string
        }
        Update: {
          condition?: string
          created_at?: string
          description?: string | null
          diagnosis_date?: string
          doctor_id?: string
          id?: string
          patient_id?: string
          treatment_plan?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "diagnoses_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diagnoses_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      doctor_certifications: {
        Row: {
          certification_name: string
          created_at: string
          doctor_id: string
          expiry_date: string | null
          id: string
          issue_date: string
          issuing_organization: string
          updated_at: string
        }
        Insert: {
          certification_name: string
          created_at?: string
          doctor_id: string
          expiry_date?: string | null
          id?: string
          issue_date: string
          issuing_organization: string
          updated_at?: string
        }
        Update: {
          certification_name?: string
          created_at?: string
          doctor_id?: string
          expiry_date?: string | null
          id?: string
          issue_date?: string
          issuing_organization?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "doctor_certifications_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
        ]
      }
      doctor_education: {
        Row: {
          created_at: string
          degree: string
          doctor_id: string
          end_date: string | null
          field_of_study: string
          id: string
          institution: string
          start_date: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          degree: string
          doctor_id: string
          end_date?: string | null
          field_of_study: string
          id?: string
          institution: string
          start_date: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          degree?: string
          doctor_id?: string
          end_date?: string | null
          field_of_study?: string
          id?: string
          institution?: string
          start_date?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "doctor_education_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
        ]
      }
      doctor_schedule: {
        Row: {
          created_at: string
          day_of_week: number
          doctor_id: string
          end_time: string
          id: string
          is_available: boolean
          start_time: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          day_of_week: number
          doctor_id: string
          end_time: string
          id?: string
          is_available?: boolean
          start_time: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          day_of_week?: number
          doctor_id?: string
          end_time?: string
          id?: string
          is_available?: boolean
          start_time?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "doctor_schedule_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
        ]
      }
      doctors: {
        Row: {
          about: string | null
          awards: string[] | null
          clinic_address: string | null
          created_at: string
          email: string
          experience_years: number | null
          full_name: string
          id: string
          languages: string[] | null
          phone: string | null
          professional_memberships: string[] | null
          profile_image: string | null
          services: string[] | null
          specialization: string | null
          subscription_end_date: string | null
          subscription_start_date: string | null
          subscription_status: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string
          verification_documents: Json | null
          verification_notes: string | null
          verification_status: string | null
        }
        Insert: {
          about?: string | null
          awards?: string[] | null
          clinic_address?: string | null
          created_at?: string
          email: string
          experience_years?: number | null
          full_name: string
          id?: string
          languages?: string[] | null
          phone?: string | null
          professional_memberships?: string[] | null
          profile_image?: string | null
          services?: string[] | null
          specialization?: string | null
          subscription_end_date?: string | null
          subscription_start_date?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id: string
          verification_documents?: Json | null
          verification_notes?: string | null
          verification_status?: string | null
        }
        Update: {
          about?: string | null
          awards?: string[] | null
          clinic_address?: string | null
          created_at?: string
          email?: string
          experience_years?: number | null
          full_name?: string
          id?: string
          languages?: string[] | null
          phone?: string | null
          professional_memberships?: string[] | null
          profile_image?: string | null
          services?: string[] | null
          specialization?: string | null
          subscription_end_date?: string | null
          subscription_start_date?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string
          verification_documents?: Json | null
          verification_notes?: string | null
          verification_status?: string | null
        }
        Relationships: []
      }
      exercise_prescriptions: {
        Row: {
          created_at: string | null
          description: string | null
          doctor_id: string
          duration: string | null
          exercise_name: string
          frequency: string | null
          id: string
          instructions: string | null
          is_active: boolean | null
          patient_id: string
          reps: number | null
          sets: number | null
          treatment_plan_id: string | null
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          doctor_id: string
          duration?: string | null
          exercise_name: string
          frequency?: string | null
          id?: string
          instructions?: string | null
          is_active?: boolean | null
          patient_id: string
          reps?: number | null
          sets?: number | null
          treatment_plan_id?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          doctor_id?: string
          duration?: string | null
          exercise_name?: string
          frequency?: string | null
          id?: string
          instructions?: string | null
          is_active?: boolean | null
          patient_id?: string
          reps?: number | null
          sets?: number | null
          treatment_plan_id?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exercise_prescriptions_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercise_prescriptions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercise_prescriptions_treatment_plan_id_fkey"
            columns: ["treatment_plan_id"]
            isOneToOne: false
            referencedRelation: "treatment_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      faqs: {
        Row: {
          answer: string
          category: string | null
          created_at: string
          id: string
          is_active: boolean
          order_index: number | null
          question: string
          updated_at: string
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          order_index?: number | null
          question: string
          updated_at?: string
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          order_index?: number | null
          question?: string
          updated_at?: string
        }
        Relationships: []
      }
      insurance_providers: {
        Row: {
          contact_email: string | null
          contact_phone: string | null
          coverage_details: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          logo_url: string | null
          name: string
          updated_at: string
          website: string | null
        }
        Insert: {
          contact_email?: string | null
          contact_phone?: string | null
          coverage_details?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          contact_email?: string | null
          contact_phone?: string | null
          coverage_details?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      invoices: {
        Row: {
          amount: number
          appointment_id: string | null
          created_at: string
          doctor_id: string
          due_date: string
          id: string
          invoice_date: string
          invoice_number: string
          patient_id: string
          payment_date: string | null
          payment_status: string
          services: Json
          tax: number | null
          total_amount: number
          updated_at: string
        }
        Insert: {
          amount: number
          appointment_id?: string | null
          created_at?: string
          doctor_id: string
          due_date: string
          id?: string
          invoice_date?: string
          invoice_number: string
          patient_id: string
          payment_date?: string | null
          payment_status?: string
          services: Json
          tax?: number | null
          total_amount: number
          updated_at?: string
        }
        Update: {
          amount?: number
          appointment_id?: string | null
          created_at?: string
          doctor_id?: string
          due_date?: string
          id?: string
          invoice_date?: string
          invoice_number?: string
          patient_id?: string
          payment_date?: string | null
          payment_status?: string
          services?: Json
          tax?: number | null
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      meeting_details: {
        Row: {
          appointment_date: string
          booking_time: string | null
          created_at: string | null
          id: string
          is_host: boolean | null
          is_new_patient: boolean | null
          meeting_id: string
          meeting_link: string
          message: string | null
          patient_email: string
          patient_id: string
          patient_name: string
          patient_phone: string
          service: string
          status: string | null
          therapist: string
          time_slot: string
          updated_at: string | null
        }
        Insert: {
          appointment_date: string
          booking_time?: string | null
          created_at?: string | null
          id?: string
          is_host?: boolean | null
          is_new_patient?: boolean | null
          meeting_id: string
          meeting_link: string
          message?: string | null
          patient_email: string
          patient_id: string
          patient_name: string
          patient_phone: string
          service: string
          status?: string | null
          therapist: string
          time_slot: string
          updated_at?: string | null
        }
        Update: {
          appointment_date?: string
          booking_time?: string | null
          created_at?: string | null
          id?: string
          is_host?: boolean | null
          is_new_patient?: boolean | null
          meeting_id?: string
          meeting_link?: string
          message?: string | null
          patient_email?: string
          patient_id?: string
          patient_name?: string
          patient_phone?: string
          service?: string
          status?: string | null
          therapist?: string
          time_slot?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      patient_diagnoses_history: {
        Row: {
          created_at: string
          diagnosis_date: string | null
          diagnosis_name: string
          document_url: string | null
          id: string
          notes: string | null
          patient_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          diagnosis_date?: string | null
          diagnosis_name: string
          document_url?: string | null
          id?: string
          notes?: string | null
          patient_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          diagnosis_date?: string | null
          diagnosis_name?: string
          document_url?: string | null
          id?: string
          notes?: string | null
          patient_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_diagnoses_history_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_emergency_contacts: {
        Row: {
          created_at: string
          id: string
          name: string
          patient_id: string
          phone: string
          relationship: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          patient_id: string
          phone: string
          relationship: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          patient_id?: string
          phone?: string
          relationship?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_emergency_contacts_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_files: {
        Row: {
          created_at: string
          file_name: string
          file_path: string
          file_size: number | null
          file_type: string
          id: string
          mime_type: string | null
          patient_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_path: string
          file_size?: number | null
          file_type?: string
          id?: string
          mime_type?: string | null
          patient_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          file_type?: string
          id?: string
          mime_type?: string | null
          patient_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_files_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_medical_data: {
        Row: {
          allergies: string | null
          created_at: string
          current_medications: string | null
          family_medical_history: string | null
          id: string
          patient_id: string
          updated_at: string
        }
        Insert: {
          allergies?: string | null
          created_at?: string
          current_medications?: string | null
          family_medical_history?: string | null
          id?: string
          patient_id: string
          updated_at?: string
        }
        Update: {
          allergies?: string | null
          created_at?: string
          current_medications?: string | null
          family_medical_history?: string | null
          id?: string
          patient_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_medical_data_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          address: string | null
          created_at: string
          dob: string | null
          email: string
          full_name: string
          gender: string | null
          id: string
          medical_history: string | null
          phone: string | null
          profile_image: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          dob?: string | null
          email: string
          full_name: string
          gender?: string | null
          id?: string
          medical_history?: string | null
          phone?: string | null
          profile_image?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          created_at?: string
          dob?: string | null
          email?: string
          full_name?: string
          gender?: string | null
          id?: string
          medical_history?: string | null
          phone?: string | null
          profile_image?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          description: string | null
          id: string
          metadata: Json | null
          payment_date: string
          payment_method: string | null
          payment_status: string
          stripe_payment_id: string | null
          stripe_session_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          payment_date?: string
          payment_method?: string | null
          payment_status: string
          stripe_payment_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          payment_date?: string
          payment_method?: string | null
          payment_status?: string
          stripe_payment_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      prescriptions: {
        Row: {
          appointment_id: string | null
          created_at: string
          doctor_id: string
          id: string
          instructions: string | null
          medicines: Json | null
          patient_id: string
          prescription_date: string
          treatments: Json | null
          updated_at: string
          valid_until: string | null
        }
        Insert: {
          appointment_id?: string | null
          created_at?: string
          doctor_id: string
          id?: string
          instructions?: string | null
          medicines?: Json | null
          patient_id: string
          prescription_date?: string
          treatments?: Json | null
          updated_at?: string
          valid_until?: string | null
        }
        Update: {
          appointment_id?: string | null
          created_at?: string
          doctor_id?: string
          id?: string
          instructions?: string | null
          medicines?: Json | null
          patient_id?: string
          prescription_date?: string
          treatments?: Json | null
          updated_at?: string
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          completed_at: string | null
          created_at: string | null
          expires_at: string | null
          id: string
          referee_email: string
          referee_name: string | null
          referral_code: string
          referrer_id: string
          reward_amount: number | null
          reward_status: string | null
          status: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          referee_email: string
          referee_name?: string | null
          referral_code: string
          referrer_id: string
          reward_amount?: number | null
          reward_status?: string | null
          status?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          referee_email?: string
          referee_name?: string | null
          referral_code?: string
          referrer_id?: string
          reward_amount?: number | null
          reward_status?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      service_details: {
        Row: {
          benefits: string[] | null
          created_at: string
          description: string
          detailed_content: string
          duration: string | null
          featured_image: string | null
          gallery_images: string[] | null
          id: string
          is_active: boolean
          meta_description: string | null
          meta_title: string | null
          price_range: string | null
          process_steps: string[] | null
          service_slug: string
          title: string
          updated_at: string
        }
        Insert: {
          benefits?: string[] | null
          created_at?: string
          description: string
          detailed_content: string
          duration?: string | null
          featured_image?: string | null
          gallery_images?: string[] | null
          id?: string
          is_active?: boolean
          meta_description?: string | null
          meta_title?: string | null
          price_range?: string | null
          process_steps?: string[] | null
          service_slug: string
          title: string
          updated_at?: string
        }
        Update: {
          benefits?: string[] | null
          created_at?: string
          description?: string
          detailed_content?: string
          duration?: string | null
          featured_image?: string | null
          gallery_images?: string[] | null
          id?: string
          is_active?: boolean
          meta_description?: string | null
          meta_title?: string | null
          price_range?: string | null
          process_steps?: string[] | null
          service_slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          created_at: string
          featured: boolean
          id: string
          location: string | null
          patient_image: string | null
          patient_name: string
          rating: number
          service_related: string | null
          testimonial_text: string
          updated_at: string
          verified: boolean
        }
        Insert: {
          created_at?: string
          featured?: boolean
          id?: string
          location?: string | null
          patient_image?: string | null
          patient_name: string
          rating: number
          service_related?: string | null
          testimonial_text: string
          updated_at?: string
          verified?: boolean
        }
        Update: {
          created_at?: string
          featured?: boolean
          id?: string
          location?: string | null
          patient_image?: string | null
          patient_name?: string
          rating?: number
          service_related?: string | null
          testimonial_text?: string
          updated_at?: string
          verified?: boolean
        }
        Relationships: []
      }
      treatment_plans: {
        Row: {
          created_at: string | null
          description: string | null
          doctor_id: string
          end_date: string | null
          goals: Json | null
          id: string
          notes: string | null
          patient_id: string
          start_date: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          doctor_id: string
          end_date?: string | null
          goals?: Json | null
          id?: string
          notes?: string | null
          patient_id: string
          start_date: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          doctor_id?: string
          end_date?: string | null
          goals?: Json | null
          id?: string
          notes?: string | null
          patient_id?: string
          start_date?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "treatment_plans_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "treatment_plans_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      user_feedback: {
        Row: {
          admin_notes: string | null
          created_at: string | null
          email: string
          feedback_type: string
          id: string
          is_anonymous: boolean | null
          message: string
          name: string
          page_url: string | null
          rating: number | null
          status: string | null
          subject: string | null
          updated_at: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string | null
          email: string
          feedback_type: string
          id?: string
          is_anonymous?: boolean | null
          message: string
          name: string
          page_url?: string | null
          rating?: number | null
          status?: string | null
          subject?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string | null
          email?: string
          feedback_type?: string
          id?: string
          is_anonymous?: boolean | null
          message?: string
          name?: string
          page_url?: string | null
          rating?: number | null
          status?: string | null
          subject?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role:
        | { Args: never; Returns: string }
        | { Args: { user_uuid: string }; Returns: string }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
