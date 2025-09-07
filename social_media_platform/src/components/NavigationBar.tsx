import { Home, Search, Bell, User, LogOut, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/Avatar"
import { Link, useLocation } from "react-router-dom"

interface NavigationBarProps {
  currentUser?: {
    username: string
    avatar_url?: string
    full_name: string
  }
  onLogout?: () => void
}

export function NavigationBar({ currentUser, onLogout }: NavigationBarProps) {
  const location = useLocation()
  
  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl text-foreground">Social</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/">
              <Button 
                variant={isActive("/") ? "default" : "ghost"} 
                size="sm"
                className="space-x-2"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
            </Link>
            <Link to="/explore">
              <Button 
                variant={isActive("/explore") ? "default" : "ghost"} 
                size="sm"
                className="space-x-2"
              >
                <Search className="h-4 w-4" />
                <span>Explore</span>
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="space-x-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </Button>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-2">
            <Button variant="hero" size="sm" className="hidden md:flex space-x-2">
              <Plus className="h-4 w-4" />
              <span>Post</span>
            </Button>
            
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <Link to={`/profile/${currentUser.username}`}>
                  <UserAvatar 
                    src={currentUser.avatar_url} 
                    username={currentUser.username}
                    size="sm"
                    className="cursor-pointer hover:ring-primary/40 transition-smooth"
                  />
                </Link>
                <Button variant="ghost" size="icon" onClick={onLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="hero" size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}