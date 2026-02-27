/**
 * Database types for Supabase
 * This file will be auto-generated later with: npx supabase gen types typescript
 * For now, we'll define manual types
 */

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          age: number | null
          retirement_age: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          age?: number | null
          retirement_age?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          age?: number | null
          retirement_age?: number | null
          updated_at?: string
        }
      }
      calculations: {
        Row: {
          id: string
          user_id: string
          current_age: number
          savings_amount: number
          monthly_expenses: number
          calculated_withdrawal: number
          ai_advice: string
          ai_reasoning: string | null
          ai_provider: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          current_age: number
          savings_amount: number
          monthly_expenses: number
          calculated_withdrawal: number
          ai_advice: string
          ai_reasoning?: string | null
          ai_provider?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          current_age?: number
          savings_amount?: number
          monthly_expenses?: number
          calculated_withdrawal?: number
          ai_advice?: string
          ai_reasoning?: string | null
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          stripe_customer_id: string
          stripe_subscription_id: string | null
          status: 'active' | 'canceled' | 'past_due'
          plan_type: 'monthly' | 'one_time'
          current_period_end: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_customer_id: string
          stripe_subscription_id?: string | null
          status: 'active' | 'canceled' | 'past_due'
          plan_type: 'monthly' | 'one_time'
          current_period_end?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          stripe_customer_id?: string
          stripe_subscription_id?: string | null
          status?: 'active' | 'canceled' | 'past_due'
          plan_type?: 'monthly' | 'one_time'
          current_period_end?: string | null
          updated_at?: string
        }
      }
    }
  }
}

export type UserProfile = Database['public']['Tables']['user_profiles']['Row']
export type Calculation = Database['public']['Tables']['calculations']['Row']
export type Subscription = Database['public']['Tables']['subscriptions']['Row']
