import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Search, SlidersHorizontal, Bell, BarChart2, Settings, Plus, MoreHorizontal } from "lucide-react"
import { useState } from "react"

const assignees = [
  { id: "1", name: "John", avatar: "J" },
  { id: "2", name: "Sarah", avatar: "S" },
  { id: "3", name: "Mike", avatar: "M" },
  { id: "4", name: "Carl", avatar: "C" },
]

export function BoardViewControls() {
  const [filterCount] = useState(5); // static placeholder

  return (
    <div className="flex items-center justify-between pb-6 gap-6">
      {/* Left cluster: search + avatars */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="relative w-56">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search board"
              className="pl-9 h-9 text-sm"
            />
        </div>
        <div className="flex -space-x-2">
          {assignees.map(a => (
            <Avatar key={a.id} className="h-8 w-8 ring-2 ring-white bg-white shadow-sm">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-xs font-medium">
                {a.avatar}
              </AvatarFallback>
            </Avatar>
          ))}
          <button className="h-8 w-8 rounded-full ring-2 ring-white bg-gray-50 text-xs font-medium text-gray-600 flex items-center justify-center shadow-sm hover:bg-gray-100">+3</button>
        </div>
      </div>

      {/* Right cluster: filter button, icons, primary action */}
      <div className="flex items-center gap-1.5">
        <Button variant="ghost" className="h-9 gap-2 px-3 text-gray-700 hover:text-gray-900">
          <SlidersHorizontal className="h-4 w-4" />
          <span className="text-sm">Filters</span>
          <span className="text-[11px] font-medium bg-white text-gray-700 border border-gray-200 px-1.5 py-0.5 rounded-md leading-none shadow-sm">
            {filterCount}
          </span>
        </Button>
        <div className="flex items-center gap-1 pl-1 pr-2 rounded-md bg-transparent">
          <IconBtn icon={<Bell className="h-4 w-4" />} label="Notifications" />
          <IconBtn icon={<BarChart2 className="h-4 w-4" />} label="Reports" />
          <IconBtn icon={<Settings className="h-4 w-4" />} label="Settings" />
          <IconBtn icon={<Plus className="h-4 w-4" />} label="Add" />
          <IconBtn icon={<MoreHorizontal className="h-4 w-4" />} label="More" />
        </div>
        <Button className="ml-1 h-9 px-4 text-sm font-medium shadow-sm">Complete sprint</Button>
      </div>
    </div>
  )
}

// Small internal reusable icon button component
function IconBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      aria-label={label}
      className="h-9 w-9 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors"
    >
      {icon}
    </button>
  )
}
