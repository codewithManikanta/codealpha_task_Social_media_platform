import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { UserAvatar } from "@/components/Avatar"
import { Image, X } from "lucide-react"

interface CreatePostFormProps {
  onSubmit: (content: string, imageFile?: File) => void
  currentUser?: {
    username: string
    avatar_url?: string
    full_name: string
  }
}

export function CreatePostForm({ onSubmit, currentUser }: CreatePostFormProps) {
  const [content, setContent] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      onSubmit(content, imageFile || undefined)
      setContent("")
      setImageFile(null)
      setImagePreview(null)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
  }

  return (
    <div className="post-card p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-start space-x-4">
          <UserAvatar 
            src={currentUser?.avatar_url} 
            username={currentUser?.username || "User"}
            size="md"
          />
          <div className="flex-1 space-y-4">
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[120px] border-none bg-transparent resize-none text-lg placeholder:text-muted-foreground focus-visible:ring-0"
            />
            
            {imagePreview && (
              <div className="relative rounded-xl overflow-hidden">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-auto object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button variant="ghost" size="sm" type="button" asChild>
                <span className="cursor-pointer">
                  <Image className="h-4 w-4" />
                  Photo
                </span>
              </Button>
            </label>
          </div>
          
          <Button 
            type="submit" 
            variant="hero" 
            disabled={!content.trim()}
            className="px-8"
          >
            Post
          </Button>
        </div>
      </form>
    </div>
  )
}