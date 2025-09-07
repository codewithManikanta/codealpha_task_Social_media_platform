import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { NavigationBar } from "@/components/NavigationBar"
import { ProfileCard } from "@/components/ProfileCard"
import { PostCard } from "@/components/PostCard"
import { Profile as ProfileType, Post } from "@/lib/supabase"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"

const mockCurrentUser = {
  username: "johndoe",
  full_name: "John Doe", 
  avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
}

const mockProfiles: Record<string, ProfileType> = {
  johndoe: {
    id: "current-user",
    username: "johndoe",
    full_name: "John Doe",
    bio: "Software developer passionate about creating amazing user experiences. Love hiking, photography, and good coffee ☕",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    followers_count: 567,
    following_count: 223,
    created_at: "2023-08-15T00:00:00Z"
  },
  fitguru: {
    id: "1",
    username: "fitguru",
    full_name: "Alex Thompson",
    bio: "Fitness enthusiast and personal trainer. Helping people achieve their health goals 💪 DM for coaching!",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    followers_count: 1250,
    following_count: 320,
    created_at: "2023-06-01T00:00:00Z"
  },
  naturelover: {
    id: "2",
    username: "naturelover", 
    full_name: "Sarah Johnson",
    bio: "Adventure seeker | Photographer | Mountain climber 🏔️ Capturing the beauty of our natural world",
    avatar_url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    followers_count: 890,
    following_count: 445,
    created_at: "2023-03-15T00:00:00Z"
  }
}

const mockUserPosts: Record<string, Post[]> = {
  johndoe: [
    {
      id: "user-1",
      user_id: "current-user",
      content: "Just deployed my latest React project! 🚀 So excited to share this with the community. Built with TypeScript and Tailwind CSS.",
      image_url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
      likes_count: 45,
      comments_count: 8,
      created_at: "2024-01-14T16:20:00Z",
      profile: mockProfiles.johndoe
    }
  ],
  fitguru: [
    {
      id: "fit-1",
      user_id: "1",
      content: "Morning workout complete! 💪 Remember, consistency is key. Even 20 minutes a day makes a difference.",
      image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      likes_count: 78,
      comments_count: 12,
      created_at: "2024-01-14T08:30:00Z",
      profile: mockProfiles.fitguru
    }
  ],
  naturelover: [
    {
      id: "nature-1",
      user_id: "2", 
      content: "Early morning hike to catch the sunrise 🌅 The mountains were calling and I had to answer!",
      image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      likes_count: 124,
      comments_count: 18,
      created_at: "2024-01-14T06:45:00Z",
      profile: mockProfiles.naturelover
    }
  ]
}

export default function Profile() {
  const { username } = useParams<{ username: string }>()
  const [profile, setProfile] = useState<ProfileType | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false)
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (username && mockProfiles[username]) {
      setTimeout(() => {
        setProfile(mockProfiles[username])
        setPosts(mockUserPosts[username] || [])
        setIsFollowing(username !== "johndoe" && Math.random() > 0.5)
        setLoading(false)
      }, 500)
    } else {
      setLoading(false)
    }
  }, [username])

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    if (profile) {
      setProfile({
        ...profile,
        followers_count: profile.followers_count + (isFollowing ? -1 : 1)
      })
    }
  }

  const handleLike = (postId: string) => {
    const newLikedPosts = new Set(likedPosts)
    if (likedPosts.has(postId)) {
      newLikedPosts.delete(postId)
    } else {
      newLikedPosts.add(postId)
    }
    setLikedPosts(newLikedPosts)
    
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes_count: post.likes_count + (likedPosts.has(postId) ? -1 : 1) }
        : post
    ))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationBar currentUser={mockCurrentUser} />
        <main className="feed-container py-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </main>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationBar currentUser={mockCurrentUser} />
        <main className="feed-container py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-foreground mb-2">User not found</h1>
            <p className="text-muted-foreground">The profile you're looking for doesn't exist.</p>
          </div>
        </main>
      </div>
    )
  }

  const isOwnProfile = username === mockCurrentUser.username

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar currentUser={mockCurrentUser} />
      
      <main className="feed-container py-8">
        <ProfileCard
          profile={profile}
          isOwnProfile={isOwnProfile}
          isFollowing={isFollowing}
          onFollow={handleFollow}
        />

        <div className="mt-8">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="likes">Likes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts" className="mt-6">
              <div className="space-y-6">
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onLike={handleLike}
                      isLiked={likedPosts.has(post.id)}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No posts yet</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="media" className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {posts
                  .filter(post => post.image_url)
                  .map((post) => (
                    <div key={post.id} className="aspect-square rounded-xl overflow-hidden">
                      <img 
                        src={post.image_url} 
                        alt="Post media" 
                        className="w-full h-full object-cover hover:scale-105 transition-smooth cursor-pointer"
                      />
                    </div>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="likes" className="mt-6">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Liked posts appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}