import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dzgowhsmcaphgzjdyegt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6Z293aHNtY2FwaGd6amR5ZWd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MDgwNzYsImV4cCI6MjA3MTI4NDA3Nn0.zH3F7nLquYEnX4ocWuXbBnsoA2iEegCQgw5h3-FF3QI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface DbCharacter {
  id: string
  name: string
  height: number // in meters
  cat_ids: number[]
  media_type: string
  media_url: string | null
  thumbnail_url: string | null
  color: string | null
  color_customizable: boolean
  color_property: string | null
  order_num: number
  gender: string | null
  description: string | null
  source: string | null
  created_at: string
  updated_at: string
}

export interface DbCategory {
  id: number
  name: string
  path: string
  pid: number | null
  created_at: string
  updated_at: string
}
