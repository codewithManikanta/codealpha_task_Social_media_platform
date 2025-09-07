import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface UserAvatarProps {
  src?: string
  alt?: string
  username: string
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-12 w-12", 
  lg: "h-16 w-16",
  xl: "h-24 w-24"
}

export function UserAvatar({ src, alt, username, className, size = "md" }: UserAvatarProps) {
  return (
    <Avatar className={cn(sizeClasses[size], "avatar-ring", className)}>
      <AvatarImage src={src} alt={alt || username} />
      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
        {username?.charAt(0)?.toUpperCase() || '?'}
      </AvatarFallback>
    </Avatar>
  )
}