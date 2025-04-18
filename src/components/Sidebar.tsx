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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useState } from "react";

interface NavItemProps {
  icon: typeof Home;
  children: React.ReactNode;
  className?: string;
  active?: boolean;
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
  );
}

export function Sidebar() {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  return (
    <aside className="w-64 bg-white h-screen border-r border-gray-300">
      <ul className="text-black text-sm leading-5">
        <li className="p-2 h-8 flex items-center">
          <div className="h-6 w-6 flex items-center justify-center mr-1">
            <Home className="h-4 w-4" />
          </div>
          For You
        </li>
        <li className="p-2 h-8 flex items-center">
          <div className="h-6 w-6 flex items-center justify-center mr-1">
            <Star className="h-4 w-4" />
          </div>
          Starred
        </li>
        <li className="p-2 h-8 relative">
          <button
            className="w-full text-left flex items-center"
            onClick={() => setIsProjectsOpen(!isProjectsOpen)}
          >
            <div className="h-6 w-6 flex items-center justify-center mr-1">
              <FolderKanban className="h-4 w-4" />
            </div>
            Projects
          </button>
          {isProjectsOpen && (
            <ul className="pl-0 mb-4">
              <li className="p-2 h-8 bg-blue-50 text-blue-600 flex items-center relative" style={{ paddingLeft: '40px' }}>
                <div className="h-6 w-6 flex items-center justify-center mr-[2px] absolute left-2">
                  <FolderKanban className="h-4 w-4" />
                </div>
                Marketing Launches
              </li>
            </ul>
          )}
        </li>
        {/* Ensure proper spacing by dynamically adjusting margin */}
        {isProjectsOpen && <div style={{ marginBottom: '32px' }}></div>}
        <li className="p-2 h-8 flex items-center">
          <div className="h-6 w-6 flex items-center justify-center mr-1">
            <Filter className="h-4 w-4" />
          </div>
          Filters
        </li>
        <li className="p-2 h-8 flex items-center">
          <div className="h-6 w-6 flex items-center justify-center mr-1">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          Dashboards
        </li>
      </ul>
    </aside>
  );
}
