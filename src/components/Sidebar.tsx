
import {
  Home,
  Clock,
  Star,
  LayoutDashboard,
  GridIcon,
  FolderKanban,
  Filter,
  ChevronDown,
  CheckSquare,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

interface NavItemProps {
  icon: typeof Home
  children: React.ReactNode
  className?: string
  active?: boolean
}

function NavItem({ icon: Icon, children, className, active }: NavItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2 pl-2",
        active && "bg-blue-50 text-blue-600",
        className
      )}
    >
      <Icon className="h-4 w-4" />
      {children}
    </Button>
  )
}

export function Sidebar() {
  return (
    <div className="w-64 border-r bg-gray-50/50 flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="p-3 space-y-1">
        <NavItem icon={Home}>Your work</NavItem>
        <NavItem icon={Clock}>Recent</NavItem>
        <NavItem icon={Star}>Starred</NavItem>
        <NavItem icon={LayoutDashboard}>Dashboard</NavItem>
        <NavItem icon={GridIcon}>Apps</NavItem>
        <NavItem icon={FolderKanban}>Projects</NavItem>
      </div>
      
      <div className="border-t mt-2 pt-2 p-3">
        <div className="flex items-center justify-between text-sm font-medium mb-2">
          <span>Starred</span>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
        <NavItem icon={CheckSquare} className="text-sm" active>
          Marketing launches
        </NavItem>
      </div>

      <div className="border-t mt-2 pt-2 p-3">
        <div className="flex items-center justify-between text-sm font-medium mb-2">
          <span>Recent</span>
        </div>
        <NavItem icon={User} className="text-sm">
          Beyond gravity
        </NavItem>
      </div>

      <div className="mt-auto border-t p-3">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>
    </div>
  )
}
