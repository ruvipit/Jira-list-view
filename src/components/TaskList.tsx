
import { cn } from "@/lib/utils"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import {
  ChevronDown,
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
  },
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
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-4">
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
        <Button variant="outline" size="sm" className="gap-1">
          Type
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          Status
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          More filters
          <Filter className="h-4 w-4" />
        </Button>
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
            {tasks.map((task) => (
              <tr key={task.key} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">
                  <Checkbox />
                </td>
                <td className="px-4 py-2">
                  <ChevronDown className="h-4 w-4" />
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
