
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Search, RefreshCw } from "lucide-react"
import { useState } from "react"
import { SaveListModal } from "./SaveListModal"

const assignees = [
  { id: "1", name: "John", avatar: "J" },
  { id: "2", name: "Sarah", avatar: "S" },
  { id: "3", name: "Mike", avatar: "M" },
]

export function BoardViewControls() {
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)
  const [showSaveButton, setShowSaveButton] = useState(true)

  const handleSave = () => {
    // Simulating a save operation
    setTimeout(() => {
      setIsSaveModalOpen(false)
      setShowSaveButton(false)
    }, 1000)
  }
  
  const handleResetChanges = () => {
    // Logic to reset changes would go here
    console.log("Resetting to last saved state")
  }

  return (
    <>
      <div className="flex items-center gap-3 pb-6">
        <div className="relative flex-1 max-w-[240px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search board"
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {assignees.map((user) => (
              <Avatar key={user.id} className="border-2 border-white h-8 w-8">
                <AvatarFallback className="bg-blue-500 text-white text-sm">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
            ))}
            <button className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-50 hover:bg-gray-100">
              <span className="text-sm text-gray-600">+3</span>
            </button>
          </div>

          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Assignee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All assignees</SelectItem>
              <SelectItem value="john">John</SelectItem>
              <SelectItem value="sarah">Sarah</SelectItem>
              <SelectItem value="mike">Mike</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="epic">Epic</SelectItem>
              <SelectItem value="task">Task</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>

          {showSaveButton && (
            <>
              <Button 
                className="ml-4"
              >
                Complete sprint
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10"
                  >
                    <RefreshCw className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuItem 
                    className="cursor-pointer py-2 px-4 text-base focus:bg-gray-100"
                    onClick={() => setIsSaveModalOpen(true)}
                  >
                    Save list
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer py-2 px-4 text-base focus:bg-gray-100"
                    onClick={handleResetChanges}
                  >
                    Reset to last saved
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No grouping</SelectItem>
              <SelectItem value="assignee">By Assignee</SelectItem>
              <SelectItem value="type">By Type</SelectItem>
              <SelectItem value="status">By Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <SaveListModal 
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSave}
      />
    </>
  )
}
