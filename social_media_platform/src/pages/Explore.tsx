import { useState, useEffect } from "react"
import { NavigationBar } from "@/components/NavigationBar"
import { PostCard } from "@/components/PostCard"
import { UserAvatar } from "@/components/Avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Post, Profile } from "@/lib/supabase"
import { Search, TrendingUp, Users, Hash } from "lucide-react"

const mockCurrentUser = {
  username: "johndoe",
  full_name: "John Doe",
  avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
}

const mockTrendingPosts: Post[] = [
  {
    id: "trending-1",
    user_id: "4",
    content: "The future of web development is here! 🚀 Just tried out the new React features and I'm blown away. The developer experience keeps getting better.",
    image_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    likes_count: 342,
    comments_count: 67,
    created_at: "2024-01-15T14:22:00Z",
    profile: {
      id: "4",
      username: "webdev_pro",
      full_name: "Emma Rodriguez",
      bio: "Frontend Developer | React Enthusiast | UI/UX Designer",
      avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      followers_count: 3240,
      following_count: 890,
      created_at: "2022-11-20T00:00:00Z"
    }
  },
  {
    id: "trending-2",
    user_id: "5",
    content: "Incredible street art discovery in downtown! 🎨 The talent of local artists never ceases to amaze me. Art has this unique power to transform spaces and communities.",
    image_url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop",
    likes_count: 278,
    comments_count: 43,
    created_at: "2024-01-15T11:15:00Z",
    profile: {
      id: "5",
      username: "art_explorer",
      full_name: "David Kim",
      bio: "Street art photographer | Urban culture enthusiast",
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      followers_count: 1890,
      following_count: 567,
      created_at: "2023-02-14T00:00:00Z"
    }
  }
]

const mockSuggestedUsers: Profile[] = [
  {
    id: "6",
    username: "chef_mario",
    full_name: "Mario Rossi",
    bio: "Professional chef | Food photographer | Recipe creator",
    avatar_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    followers_count: 4567,
    following_count: 234,
    created_at: "2022-08-10T00:00:00Z"
  },
  {
    id: "7",
    username: "music_maven",
    full_name: "Luna Chen",
    bio: "Music producer | DJ | Sound engineer",
    avatar_url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    followers_count: 2890,
    following_count: 445,
    created_at: "2023-04-05T00:00:00Z"
  },
  {
    id: "8",
    username: "travel_nomad",
    full_name: "Jake Wilson",
    bio: "Digital nomad | Travel blogger | Adventure seeker",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    followers_count: 1234,
    following_count: 678,
    created_at: "2023-07-22T00:00:00Z"
  }
]

const trendingTopics = [
  { tag: "webdevelopment", posts: 1234 },
  { tag: "photography", posts: 987 },
  { tag: "fitness", posts: 756 },
  { tag: "cooking", posts: 543 },
  { tag: "travel", posts: 432 }
]

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("")
  const [posts, setPosts] = useState<Post[]>([])
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set())

  useEffect(() => {
    setPosts(mockTrendingPosts)
  }, [])

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

  const handleFollow = (userId: string) => {
    const newFollowedUsers = new Set(followedUsers)
    if (followedUsers.has(userId)) {
      newFollowedUsers.delete(userId)
    } else {
      newFollowedUsers.add(userId)
    }
    setFollowedUsers(newFollowedUsers)
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar currentUser={mockCurrentUser} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts, users, and topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 rounded-xl border-border"
              />
            </div>

            {/* Trending Posts */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Trending Posts</h2>
              </div>
              
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  isLiked={likedPosts.has(post.id)}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <div className="post-card p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Hash className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-foreground">Trending Topics</h3>
              </div>
              <div className="space-y-3">
                {trendingTopics.map((topic) => (
                  <div key={topic.tag} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-smooth cursor-pointer">
                    <div>
                      <p className="font-medium text-foreground">#{topic.tag}</p>
                      <p className="text-sm text-muted-foreground">{topic.posts} posts</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Users */}
            <div className="post-card p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-foreground">Who to Follow</h3>
              </div>
              <div className="space-y-4">
                {mockSuggestedUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <UserAvatar 
                        src={user.avatar_url} 
                        username={user.username}
                        size="sm"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground truncate">{user.full_name}</p>
                        <p className="text-sm text-muted-foreground truncate">@{user.username}</p>
                      </div>
                    </div>
                    <Button
                      variant={followedUsers.has(user.id) ? "outline" : "follow"}
                      size="sm"
                      onClick={() => handleFollow(user.id)}
                    >
                      {followedUsers.has(user.id) ? "Following" : "Follow"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}