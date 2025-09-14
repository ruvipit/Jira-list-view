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
  KanbanSquare,
} from "lucide-react"

export function ProjectHeader({ panelOpen }: { panelOpen?: boolean }) {
  const location = useLocation();

  return (
    <div className="border-b bg-white/80 backdrop-blur">
      <div className={
        "pt-3 pb-2 flex items-center justify-between transition-[padding] duration-300 ease-out " +
        (panelOpen ? "pl-6 pr-[460px]" : "px-6")
      }>
        <div className="flex flex-col gap-1">
          <div className="flex items-center text-xs text-gray-500 gap-1">
            <Link to="/" className="hover:underline text-gray-500">Projects</Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-tr from-yellow-300 via-amber-300 to-rose-300 border border-yellow-200 flex items-center justify-center text-sm font-semibold shadow-inner">
              <span role="img" aria-label="lightbulb">💡</span>
            </div>
            <span className="text-xl font-semibold tracking-tight text-gray-900">Marketing launches</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:text-gray-900">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:text-gray-900">
            <Zap className="h-4 w-4" />
          </Button>
        </div>
      </div>
  <div className={(panelOpen ? "pl-6 pr-[460px]" : "px-6") + " flex items-center gap-2 text-sm overflow-x-auto transition-[padding] duration-300 ease-out project-nav-row"}>
        <NavLink to="/summary" icon={<LayoutDashboard className="h-4 w-4" />} label="Summary" active={location.pathname === '/summary'} />
        <Button
          variant="ghost"
          className="gap-2"
          asChild
        >
          <Link to="/board" className={location.pathname === '/board' ? 'text-blue-600 font-semibold' : 'text-gray-600'}>
            <KanbanSquare className="h-4 w-4" />
            Board
          </Link>
        </Button>
        <NavLink to="/timeline" icon={<Clock className="h-4 w-4" />} label="Timeline" active={location.pathname === '/timeline'} />
        <Button
          variant="ghost"
          className="gap-2"
          asChild
        >
          <Link to="/calendar" className={location.pathname === '/calendar' ? 'text-blue-600 font-semibold' : 'text-gray-600'}>
            <Calendar className="h-4 w-4" />
            Calendar
          </Link>
        </Button>
        <NavLink to="/pages" icon={<FileText className="h-4 w-4" />} label="Pages" active={location.pathname === '/pages'} />
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

function NavLink({ to, icon, label, active }: { to: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <Link
      to={to}
      className={`relative inline-flex items-center gap-2 px-3 py-2 rounded-md text-[13px] font-medium transition-colors
        ${active ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'}
      `}
    >
      {icon}
      {label}
      {active && (
        <span className="absolute inset-x-2 -bottom-px h-[2px] rounded-full bg-blue-600" />
      )}
    </Link>
  )
}
