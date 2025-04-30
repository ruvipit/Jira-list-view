
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Zap } from "lucide-react"

type TaskTypeFilterProps = {
  selectedTypes: string[];
  toggleType: (type: string) => void;
}

export function TaskTypeFilter({ selectedTypes, toggleType }: TaskTypeFilterProps) {
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false)

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "gap-1",
          isTypeDropdownOpen && "border-blue-500 text-blue-500 bg-blue-50"
        )}
        onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
      >
        Type
        <ChevronDown className="h-4 w-4" />
      </Button>
      {isTypeDropdownOpen && (
        <div className="absolute mt-2 w-48 bg-white border rounded-md shadow-md z-10">
          <ul className="p-2 space-y-2">
            <li className="flex items-center gap-2 cursor-pointer" onClick={() => toggleType("Epic")}> 
              <Checkbox
                checked={selectedTypes.includes("Epic")}
                onCheckedChange={(checked) => toggleType("Epic")}
              />
              <Zap className="h-4 w-4 text-purple-500" />
              <span>Epic</span>
            </li>
            <li className="flex items-center gap-2 cursor-pointer" onClick={() => toggleType("Task")}> 
              <Checkbox
                checked={selectedTypes.includes("Task")}
                onCheckedChange={(checked) => toggleType("Task")}
              />
              <img src="/Task (16px).svg" alt="Task Icon" className="h-4 w-4" />
              <span>Task</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
