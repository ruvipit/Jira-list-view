
import { useState } from "react"
import { ListFilter } from "lucide-react"
import { TaskListFilters } from "./TaskFilters/TaskListFilters"
import { TaskListTable } from "./TaskTable/TaskListTable"
import { tasks } from "@/data/mockTasks"

export function TaskList() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
  }

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

  return (
    <div className="p-6">
      <TaskListFilters 
        selectedTypes={selectedTypes} 
        toggleType={toggleType} 
        clearFilters={clearFilters}
      />
      <TaskListTable filteredTasks={filteredTasks} />
    </div>
  )
}
