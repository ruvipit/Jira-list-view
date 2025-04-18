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
} from "lucide-react"

const tasks = [
  {
    key: "ML-1",
    summary: "Update header logo to svg",
    status: "TO DO",
    category: "Help platform",
  },
  {
    key: "ML-2",
    summary: "Review header logo",
    status: "TO DO",
    category: "Creative",
    subTasks: [
      {
        key: "ML-3",
        summary: "New template illustration",
        status: "TO DO",
        category: "Creative",
      },
      {
        key: "ML-4",
        summary: "Finalise marketing campaign presentation",
        status: "IN PROGRESS",
        category: "Help platform",
      },
      {
        key: "ML-5",
        summary: "New logo for client",
        status: "IN PROGRESS",
        category: "Social media",
      },
    ],
  },
  {
    key: "ML-6",
    summary: "Draft marketing campaign Q1",
    status: "IN PROGRESS",
    category: "Social media",
  },
  {
    key: "ML-7",
    summary: "Review social media campaign",
    status: "DONE",
    category: "Help platform",
  },
]

export function TaskList() {
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const filteredTasks = selectedTypes.length
    ? tasks.filter((task) =>
        selectedTypes.includes("Task")
          ? task.summary === "Task"
          : true
      )
    : tasks;

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center gap-2 mb-4 justify-between">
        <div className="flex items-center gap-2 flex-wrap"> {/* Left group */}
          <Button variant="outline" size="sm" className="gap-1">
            <Zap className="h-4 w-4" />
            AI
          </Button>
          <Button variant="outline" size="sm">
            Basic
          </Button>
          <Button variant="outline" size="sm">
            JQL
          </Button>
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
        </div>
        <div className="flex items-center gap-2"> {/* Right group */}
          <Button variant="outline" size="sm">
            <ListFilter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            Group
          </Button>
          <Button variant="outline" size="sm">
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-md border">
        <table className="w-full">
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
              <>
                <tr key={task.key} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <Checkbox />
                  </td>
                  <td className="px-4 py-2">
                    {task.key === "ML-1" || task.key === "ML-6" || task.key === "ML-7" ? (
                      <ChevronRight className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <Zap className="h-4 w-4 text-purple-500" />
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
                {task.subTasks &&
                  task.subTasks.map((subTask) => (
                    <tr
                      key={subTask.key}
                      className={`border-b hover:bg-gray-50 pl-8 ${
                        selectedTypes.includes("Task") && subTask.summary !== "Task" ? "hidden" : ""
                      }`}
                    >
                      <td className="px-4 py-2">
                        <Checkbox />
                      </td>
                      <td className="px-4 py-2">
                        <img src="/AllWorkHierarchyIcon.svg" alt="Hierarchy Icon" className="h-4 w-4" />
                      </td>
                      <td className="px-4 py-2">
                        <img src="/Task (16px).svg" alt="Task Icon" className="h-4 w-4" />
                      </td>
                      <td className="px-4 py-2 text-blue-600">{subTask.key}</td>
                      <td className="px-4 py-2">{subTask.summary}</td>
                      <td className="px-4 py-2">
                        <Badge
                          variant="secondary"
                          className={cn(
                            subTask.status === "IN PROGRESS" && "bg-blue-50 text-blue-700",
                            subTask.status === "DONE" && "bg-green-50 text-green-700"
                          )}
                        >
                          {subTask.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-2">
                        <Badge variant="outline">{subTask.category}</Badge>
                      </td>
                      <td className="px-4 py-2">
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
