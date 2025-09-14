import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Zap, 
  ChevronDown,
  TableProperties,
  PanelLeft,
  RefreshCw,
  Ellipsis,
  ListFilter
} from "lucide-react"
import { TaskTypeFilter } from "./TaskTypeFilter"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SaveListModal } from "../SaveListModal"

type TaskListFiltersProps = {
  selectedTypes: string[];
  toggleType: (type: string) => void;
  clearFilters: () => void;
}

export function TaskListFilters({ selectedTypes, toggleType, clearFilters }: TaskListFiltersProps) {
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const handleSave = () => {
    console.log("List saved");
    setIsSaveModalOpen(false);
  };
  
  const handleResetChanges = () => {
    // Logic to reset changes would go here
    console.log("Resetting to last saved state");
  };

  return (
    <div className="flex flex-wrap items-center gap-3 justify-between">
      <div className="flex items-center gap-2 flex-wrap">
        <button className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md text-[13px] font-medium bg-white border border-gray-200 shadow-sm hover:bg-gray-50">
          <Zap className="h-4 w-4 text-purple-500" />
          AI
        </button>
        <div className="flex items-center h-8 rounded-md border border-gray-200 bg-white overflow-hidden">
          <button className="px-3 h-full text-[13px] font-medium bg-blue-50 text-blue-600 border-r border-gray-200">Basic</button>
          <button className="px-3 h-full text-[13px] text-gray-600 hover:text-gray-800">JQL</button>
        </div>
        <div className="relative">
          <input type="text" placeholder="Search work" className="h-8 w-60 rounded-md border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <ToolbarButton label="Assignee" />
        <TaskTypeFilter selectedTypes={selectedTypes} toggleType={toggleType} />
        <ToolbarButton label="Status" />
        <ToolbarButton label="More filters" />
        {selectedTypes.length > 0 && (
          <button onClick={clearFilters} className="h-8 px-2 text-blue-600 text-[13px] font-medium hover:underline">Clear</button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <ToolbarIconButton icon={<ListFilter className="h-4 w-4" />} />
        <ToolbarButton label="Group" />
        <div className="flex items-center h-8 rounded-md border border-gray-200 overflow-hidden bg-white">
          <button className="w-9 h-full flex items-center justify-center bg-blue-50 text-blue-600 border-r border-gray-200" title="Table view"><TableProperties className="h-4 w-4" /></button>
          <button className="w-9 h-full flex items-center justify-center text-gray-600 hover:text-gray-800" title="Detail pane"><PanelLeft className="h-4 w-4" /></button>
        </div>
        {selectedTypes.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-gray-200 bg-white hover:bg-gray-50">
                <RefreshCw className="h-4 w-4 text-gray-600" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuItem className="cursor-pointer py-2 px-4 text-sm focus:bg-gray-100" onClick={() => setIsSaveModalOpen(true)}>Save list</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer py-2 px-4 text-sm focus:bg-gray-100" onClick={handleResetChanges}>Reset to last saved</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <SaveListModal isOpen={isSaveModalOpen} onClose={() => setIsSaveModalOpen(false)} onSave={handleSave} />
        <ToolbarIconButton icon={<Ellipsis className="h-4 w-4" />} />
      </div>
    </div>
  )
}

function ToolbarButton({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center h-8 px-3 rounded-md border border-gray-200 bg-white text-[13px] text-gray-700 hover:bg-gray-50 font-medium">
      {label}
      <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
    </button>
  )
}

function ToolbarIconButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-600">
      {icon}
    </button>
  )
}
