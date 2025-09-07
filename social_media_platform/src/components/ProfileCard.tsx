import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/Avatar"
import { Profile } from "@/lib/supabase"
import { MapPin, Calendar, Link as LinkIcon } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface ProfileCardProps {
  profile: Profile
  isOwnProfile?: boolean
  isFollowing?: boolean
  onFollow?: () => void
  onEditProfile?: () => void
}

export function ProfileCard({ 
  profile, 
  isOwnProfile = false, 
  isFollowing = false, 
  onFollow, 
  onEditProfile 
}: ProfileCardProps) {
  return (
    <div className="post-card p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
        <UserAvatar 
          src={profile.avatar_url} 
          username={profile.username}
          size="xl"
          className="mx-auto md:mx-0"
        />
        
        <div className="flex-1 text-center md:text-left">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-foreground">{profile.full_name}</h1>
            <p className="text-muted-foreground">@{profile.username}</p>
          </div>
          
          {profile.bio && (
            <p className="text-foreground mb-4">{profile.bio}</p>
          )}
          
          <div className="flex items-center justify-center md:justify-start space-x-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Joined {formatDistanceToNow(new Date(profile.created_at), { addSuffix: true })}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center md:justify-start space-x-6 mb-6">
            <div className="text-center">
              <span className="block text-xl font-bold text-foreground">{profile.following_count}</span>
              <span className="text-sm text-muted-foreground">Following</span>
            </div>
            <div className="text-center">
              <span className="block text-xl font-bold text-foreground">{profile.followers_count}</span>
              <span className="text-sm text-muted-foreground">Followers</span>
            </div>
          </div>
          
          <div className="flex justify-center md:justify-start">
            {isOwnProfile ? (
              <Button variant="outline" onClick={onEditProfile}>
                Edit Profile
              </Button>
            ) : (
              <Button 
                variant={isFollowing ? "outline" : "follow"} 
                onClick={onFollow}
                className="px-8"
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}