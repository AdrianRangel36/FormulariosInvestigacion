import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY environment variables.',
  )
}

// The anon key is meant to be public/client-side by Supabase's design: it
// only identifies the "anon" role. Row Level Security policies (see the
// form_submissions table) are the actual security boundary, not key secrecy.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
