import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://placeholder-supabase-url.supabase.co'
const supabaseKey = 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types
export interface Profile {
  id: string
  username: string
  full_name: string
  bio: string
  avatar_url: string
  followers_count: number
  following_count: number
  created_at: string
}

export interface Post {
  id: string
  user_id: string
  content: string
  image_url?: string
  likes_count: number
  comments_count: number
  created_at: string
  profile: Profile
}

export interface Comment {
  id: string
  post_id: string
  user_id: string
  content: string
  created_at: string
  profile: Profile
}

export interface Like {
  id: string
  post_id: string
  user_id: string
  created_at: string
}

export interface Follow {
  id: string
  follower_id: string
  following_id: string
  created_at: string
}