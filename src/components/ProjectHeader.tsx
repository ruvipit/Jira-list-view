import { Button } from "./ui/button"
import { Link, useLocation } from "react-router-dom"
import {
  Calendar,
  LayoutDashboard,
  Clock,
  FileText,
  ListTodo,
  Share2,
  Zap,
} from "lucide-react"

export function ProjectHeader() {
  const location = useLocation();

  return (
    <div className="border-b">
      <div className="px-8 py-4 flex items-center justify-between">
        <span className="text-xl font-semibold">Marketing launches</span>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Zap className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="px-8 flex items-center gap-6 text-sm">
        <Button variant="ghost" className="gap-2">
          <LayoutDashboard className="h-4 w-4" />
          Summary
        </Button>
        <Button
          variant="ghost"
          className="gap-2"
          asChild
        >
          <Link to="/board" className={location.pathname === '/board' ? 'text-blue-600 font-semibold' : 'text-gray-600'}>
            <LayoutDashboard className="h-4 w-4" />
            Board
          </Link>
        </Button>
        <Button variant="ghost" className="gap-2">
          <Clock className="h-4 w-4" />
          Timeline
        </Button>
        <Button variant="ghost" className="gap-2">
          <Calendar className="h-4 w-4" />
          Calendar
        </Button>
        <Button variant="ghost" className="gap-2">
          <FileText className="h-4 w-4" />
          Pages
        </Button>
        <Button
          variant="ghost"
          className="gap-2"
          asChild
        >
          <Link to="/" className={location.pathname === '/' ? 'text-blue-600 font-semibold' : 'text-gray-600'}>
            <ListTodo className="h-4 w-4" />
            Tasks
          </Link>
        </Button>
      </div>
    </div>
  )
}
