
import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "./avatar"

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars: { src: string; alt: string }[]
  max?: number
}

export function AvatarGroup({ avatars, max = 3, className, ...props }: AvatarGroupProps) {
  const displayAvatars = avatars.slice(0, max)
  const remainingCount = avatars.length - max

  return (
    <div className={cn("flex -space-x-2", className)} {...props}>
      {displayAvatars.map((avatar, i) => (
        <Avatar key={i} className="border-2 border-background">
          <AvatarImage src={avatar.src} alt={avatar.alt} />
        </Avatar>
      ))}
      {remainingCount > 0 && (
        <Avatar className="border-2 border-background">
          <span className="text-xs font-medium">+{remainingCount}</span>
        </Avatar>
      )}
    </div>
  )
}
