
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Zap, 
  ChevronDown,
  TableProperties,
  PanelLeft,
  RefreshCw,
  Ellipsis
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
    <div className="flex flex-wrap items-center gap-2 mb-4 justify-between">
      <div className="flex items-center gap-2 flex-wrap"> {/* Left group */}
        <Button variant="outline" size="sm" className="gap-1">
          <Zap className="h-4 w-4" />
          AI
        </Button>
        <div className="flex items-center border border-gray-300 rounded-sm w-[104px] h-[36px] pl-[1px]">
          <button
            className="flex-1 h-[32px] text-sm font-medium text-blue-500 bg-[#E9F2FE] border border-[#1868DB] rounded-[2px] flex items-center justify-center"
            onClick={() => console.log("Basic selected")}
          >
            Basic
          </button>
          <button
            className="flex-1 h-[32px] text-sm font-medium text-gray-500 bg-white rounded-[2px] flex items-center justify-center"
            onClick={() => console.log("JQL selected")}
          >
            JQL
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search work"
            className="pl-4 pr-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-sm"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          Assignee
          <ChevronDown className="h-4 w-4" />
        </Button>
        <TaskTypeFilter selectedTypes={selectedTypes} toggleType={toggleType} />
        <Button variant="outline" size="sm" className="gap-1">
          Status
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          More filters
          <ChevronDown className="h-4 w-4" />
        </Button>
        {selectedTypes.length > 0 && (
          <Button
            variant="link"
            size="sm"
            className="text-blue-500"
            onClick={clearFilters}
          >
            Clear filters
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2"> {/* Right group */}
       
        <Button variant="outline" size="sm">
          <ListFilter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm">
          Group
        </Button>
        <div className="flex items-center border border-gray-300 rounded-sm w-[64px] h-[36px] pl-[1px]">
          <button
            className="w-[32px] h-[32px] font-medium text-blue-500 bg-[#E9F2FE] border border-[#1868DB] rounded-[2px] flex items-center justify-center"
            onClick={() => console.log("Table selected")}
          >
            <TableProperties className="h-4 w-4" /> 
          </button>
          <button
            className="w-[32px] h-[32px] font-medium text-black-500 bg-white rounded-[2px] flex items-center justify-center"
            onClick={() => console.log("Detail selected")}
          >
            <PanelLeft className="h-4 w-4" />
          </button>
        </div>
        {selectedTypes.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
              >
                <RefreshCw className="h-4 w-4" />
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
        )}
        <SaveListModal
          isOpen={isSaveModalOpen}
          onClose={() => setIsSaveModalOpen(false)}
          onSave={handleSave}
        />
        <Button variant="outline" size="sm">
          <Ellipsis className="h-4 w-4" />
        </Button>
       
      </div>
    </div>
  )
}
