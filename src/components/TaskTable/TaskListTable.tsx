
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  Zap,
} from "lucide-react"

type Task = {
  key: string;
  type: string;
  summary: string;
  status: string;
  category: string;
  icon: string;
}

type TaskListTableProps = {
  filteredTasks: Task[];
}

export function TaskListTable({ filteredTasks }: TaskListTableProps) {
  return (
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
  )
}
