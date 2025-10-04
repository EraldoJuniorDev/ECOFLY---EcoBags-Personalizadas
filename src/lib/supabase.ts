import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos TypeScript para a tabela feedbacks
export interface FeedbackRow {
  id: string
  name: string
  email?: string
  product?: string
  message: string
  rating: number
  created_at: string
}

export interface FeedbackInsert {
  name: string
  email?: string
  product?: string
  message: string
  rating: number
}