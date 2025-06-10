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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead style={{ paddingLeft: '2rem' }} className="p-2">
              <Checkbox />
            </TableHead>
            <TableHead className="p-2"></TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Key</TableHead>
            <TableHead>Summary</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="p-2"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTasks.map((task) => (
            <TableRow key={task.key} className="hover:bg-gray-50">
              <TableCell style={{ paddingLeft: '2rem' }} className="p-2">
                <Checkbox />
              </TableCell>
              <TableCell className="p-2">
                {task.key === "ML-1" || task.key === "ML-6" || task.key === "ML-7" ? (
                  <ChevronRight className="h-4 w-4" />
                ) : task.key === "ML-2" ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <div className="h-4 w-4" /> // Empty placeholder for alignment
                )}
              </TableCell>
              <TableCell className="p-4">
                {task.icon === "Zap" ? (
                  <Zap className="h-4 w-4 text-purple-500" />
                ) : task.icon === "Task (16px).svg" ? (
                  <img src="/Task (16px).svg" alt="Task Icon" className="h-4 w-4" />
                ) : (
                  <img src={`/${task.icon}`} alt="Task Icon" className="h-4 w-4" />
                )}
              </TableCell>
              <TableCell className="p-4 text-blue-600 font-medium">{task.key}</TableCell>
              <TableCell className="p-4">{task.summary}</TableCell>
              <TableCell className="p-2">
                <Badge
                  variant="secondary"
                  className={cn(
                    "uppercase text-xs font-semibold",
                    task.status === "TO DO" && "bg-gray-100 text-gray-800",
                    task.status === "IN PROGRESS" && "bg-blue-50 text-blue-700",
                    task.status === "DONE" && "bg-green-50 text-green-700"
                  )}
                >
                  {task.status}
                </Badge>
              </TableCell>
              <TableCell className="p-2">
                <Badge variant="outline" className="font-normal">
                  {task.category}
                </Badge>
              </TableCell>
              <TableCell className="p-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
