
import { Search, Settings, BellDot, HelpCircle, MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"

export function TopNav() {
  return (
    <nav className="h-14 border-b flex items-center px-4 justify-between bg-white">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <img src="/lovable-uploads/e3d3ec96-a1c4-4971-a8b6-e1c89a5e2647.png" alt="Jira" className="h-6" />
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="pl-8 pr-4 py-2 rounded-md bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <MessageCircle className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <BellDot className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  )
}
