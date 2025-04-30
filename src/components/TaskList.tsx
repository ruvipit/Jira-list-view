import { cn } from "@/lib/utils"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { useState } from "react"
import {
  ChevronDown,
  ChevronRight,
  Filter,
  LayoutGrid,
  ListFilter,
  MoreHorizontal,
  Zap,
  RefreshCw,
  Ellipsis,
  Table2,
  PanelLeft,
  TableProperties,
} from "lucide-react"
import { SaveListModal } from "./SaveListModal"

const tasks = [
  {
    key: "ML-1",
    type: "Epic",
    summary: "Update header logo to svg",
    status: "TO DO",
    category: "Help platform",
    icon: "Zap", // Correct icon for Epic
  },
  {
    key: "ML-2",
    type: "Epic",
    summary: "Review header logo",
    status: "TO DO",
    category: "Creative",
    icon: "Zap", // Correct icon for Epic
  },
  {
    key: "ML-3",
    type: "Task",
    summary: "New template illustration",
    status: "TO DO",
    category: "Creative",
    icon: "Task (16px).svg", // Correct icon for Task
  },
  {
    key: "ML-4",
    type: "Task",
    summary: "Finalise marketing campaign presentation",
    status: "IN PROGRESS",
    category: "Help platform",
    icon: "Task (16px).svg", // Correct icon for Task
  },
  {
    key: "ML-5",
    type: "Task",
    summary: "New logo for client",
    status: "IN PROGRESS",
    category: "Social media",
    icon: "Task (16px).svg", // Correct icon for Task
  },
  {
    key: "ML-6",
    type: "Epic",
    summary: "Draft marketing campaign Q1",
    status: "IN PROGRESS",
    category: "Social media",
    icon: "Zap", // Correct icon for Epic
  },
  {
    key: "ML-7",
    type: "Epic",
    summary: "Review social media campaign",
    status: "DONE",
    category: "Help platform",
    icon: "Zap", // Correct icon for Epic
  },
]

export function TaskList() {
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (selectedTypes.length === 0) {
      return true; // Show all rows if no filters are selected
    }
    if (selectedTypes.includes("Epic") && selectedTypes.includes("Task")) {
      return true; // Show both Epics and Tasks
    }
    if (selectedTypes.includes("Epic")) {
      return ["ML-1", "ML-2", "ML-6", "ML-7"].includes(task.key); // Show only Epics
    }
    if (selectedTypes.includes("Task")) {
      return ["ML-3", "ML-4", "ML-5"].includes(task.key); // Show only Tasks
    }
    return false; // Hide rows if no matching filter is found
  });

  const handleSave = () => {
    console.log("List saved");
    setIsSaveModalOpen(false);
  };

  return (
    <div className="p-6">
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
                  <li className="flex items-center gap-2 cursor-pointer" onClick={() => toggleType("Epic")}> {/* Added onClick to toggle checkbox */}
                    <Checkbox
                      checked={selectedTypes.includes("Epic")}
                      onCheckedChange={(checked) => toggleType("Epic")}
                    />
                    <Zap className="h-4 w-4 text-purple-500" />
                    <span>Epic</span>
                  </li>
                  <li className="flex items-center gap-2 cursor-pointer" onClick={() => toggleType("Task")}> {/* Added onClick to toggle checkbox */}
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
              onClick={() => setSelectedTypes([])}
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
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSaveModalOpen(true)}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
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

      <div className="bg-white rounded-md border">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b text-sm">
              <th className="px-4 py-2 font-normal text-left w-8">
                <Checkbox />
              </th>
              <th className="px-4 py-2 font-normal text-left w-8"></th>
              <th className="px-4 py-2 font-normal text-left">Type</th>
              <th className="px-4 py-2 font-normal text-left">Key</th>
              <th className="px-4 py-2 font-normal text-left">Summary</th>
              <th className="px-4 py-2 font-normal text-left">Status</th>
              <th className="px-4 py-2 font-normal text-left">Category</th>
              <th className="px-4 py-2 font-normal text-left w-8"></th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.key} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">
                  <Checkbox />
                </td>
                <td className="px-4 py-2">
                  {task.key === "ML-1" || task.key === "ML-6" || task.key === "ML-7" ? (
                    <ChevronRight className="h-4 w-4" />
                  ) : task.key === "ML-2" ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <img src="/AllWorkHierarchyIcon.svg" alt="Hierarchy Icon" className="h-4 w-4" />
                  )}
                </td>
                <td className="px-4 py-2">
                  {task.icon === "Zap" ? (
                    <Zap className="h-4 w-4 text-purple-500" />
                  ) : (
                    <img src={`/${task.icon}`} alt="Task Icon" className="h-4 w-4" />
                  )}
                </td>
                <td className="px-4 py-2 text-blue-600">{task.key}</td>
                <td className="px-4 py-2">{task.summary}</td>
                <td className="px-4 py-2">
                  <Badge
                    variant="secondary"
                    className={cn(
                      task.status === "IN PROGRESS" && "bg-blue-50 text-blue-700",
                      task.status === "DONE" && "bg-green-50 text-green-700"
                    )}
                  >
                    {task.status}
                  </Badge>
                </td>
                <td className="px-4 py-2">
                  <Badge variant="outline">{task.category}</Badge>
                </td>
                <td className="px-4 py-2">
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
