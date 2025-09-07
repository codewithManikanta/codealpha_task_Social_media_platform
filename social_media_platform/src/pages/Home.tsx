import { useState, useEffect } from "react"
import { NavigationBar } from "@/components/NavigationBar"
import { CreatePostForm } from "@/components/CreatePostForm"
import { PostCard } from "@/components/PostCard"
import { Post } from "@/lib/supabase"
import { Loader2 } from "lucide-react"

// Mock data for demonstration
const mockUser = {
  username: "johndoe",
  full_name: "John Doe",
  avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
}

const mockPosts: Post[] = [
  {
    id: "1",
    user_id: "1",
    content: "Just finished an amazing workout session! 💪 Feeling stronger every day. What's your favorite way to stay active?",
    image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    likes_count: 24,
    comments_count: 5,
    created_at: "2024-01-15T10:30:00Z",
    profile: {
      id: "1",
      username: "fitguru",
      full_name: "Alex Thompson",
      bio: "Fitness enthusiast and personal trainer",
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      followers_count: 1250,
      following_count: 320,
      created_at: "2023-06-01T00:00:00Z"
    }
  },
  {
    id: "2", 
    user_id: "2",
    content: "Beautiful sunset from my hike today 🌅 Nature never fails to amaze me. There's something magical about watching the day transition into night from a mountain peak.",
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    likes_count: 89,
    comments_count: 12,
    created_at: "2024-01-15T18:45:00Z",
    profile: {
      id: "2",
      username: "naturelover",
      full_name: "Sarah Johnson",
      bio: "Adventure seeker | Photographer | Mountain climber",
      avatar_url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      followers_count: 890,
      following_count: 445,
      created_at: "2023-03-15T00:00:00Z"
    }
  },
  {
    id: "3",
    user_id: "3", 
    content: "Coding late into the night again 👨‍💻 Working on something exciting that I can't wait to share with you all! The debugging phase is always challenging but so rewarding when everything finally clicks.",
    likes_count: 156,
    comments_count: 23,
    created_at: "2024-01-15T23:15:00Z",
    profile: {
      id: "3",
      username: "codemaster",
      full_name: "Mike Chen",
      bio: "Full-stack developer | Tech enthusiast | Coffee addict",
      avatar_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      followers_count: 2340,
      following_count: 567,
      created_at: "2023-01-10T00:00:00Z"
    }
  }
]

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Simulate loading posts
    setTimeout(() => {
      setPosts(mockPosts)
      setLoading(false)
    }, 1000)
  }, [])

  const handleCreatePost = (content: string, imageFile?: File) => {
    const newPost: Post = {
      id: Date.now().toString(),
      user_id: "current-user",
      content,
      image_url: imageFile ? URL.createObjectURL(imageFile) : undefined,
      likes_count: 0,
      comments_count: 0,
      created_at: new Date().toISOString(),
      profile: {
        id: "current-user",
        username: mockUser.username,
        full_name: mockUser.full_name,
        bio: "New user",
        avatar_url: mockUser.avatar_url,
        followers_count: 0,
        following_count: 0,
        created_at: new Date().toISOString()
      }
    }
    setPosts([newPost, ...posts])
  }

  const handleLike = (postId: string) => {
    const newLikedPosts = new Set(likedPosts)
    if (likedPosts.has(postId)) {
      newLikedPosts.delete(postId)
    } else {
      newLikedPosts.add(postId)
    }
    setLikedPosts(newLikedPosts)
    
    // Update post likes count
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes_count: post.likes_count + (likedPosts.has(postId) ? -1 : 1) }
        : post
    ))
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar currentUser={mockUser} />
      
      <main className="feed-container py-8">
        {/* Create Post */}
        <CreatePostForm onSubmit={handleCreatePost} currentUser={mockUser} />
        
        {/* Posts Feed */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                isLiked={likedPosts.has(post.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}