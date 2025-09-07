import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/Avatar"
import { Post } from "@/lib/supabase"
import { formatDistanceToNow } from "date-fns"

interface PostCardProps {
  post: Post
  onLike?: (postId: string) => void
  onComment?: (postId: string) => void
  isLiked?: boolean
}

export function PostCard({ post, onLike, onComment, isLiked = false }: PostCardProps) {
  return (
    <div className="post-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <UserAvatar 
            src={post.profile.avatar_url} 
            username={post.profile.username}
            size="md"
          />
          <div>
            <h3 className="font-semibold text-foreground">{post.profile.full_name}</h3>
            <p className="text-sm text-muted-foreground">@{post.profile.username}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
          </span>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-foreground whitespace-pre-wrap">{post.content}</p>
        {post.image_url && (
          <div className="mt-4 rounded-xl overflow-hidden">
            <img 
              src={post.image_url} 
              alt="Post image" 
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <Button 
            variant="like" 
            size="sm"
            onClick={() => onLike?.(post.id)}
            className={isLiked ? "text-destructive" : ""}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            {post.likes_count}
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onComment?.(post.id)}
          >
            <MessageCircle className="h-4 w-4" />
            {post.comments_count}
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}