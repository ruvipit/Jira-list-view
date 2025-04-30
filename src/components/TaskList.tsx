
import { useState } from "react"
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

  const filteredTasks = selectedTypes.length === 0 
    ? tasks 
    : tasks.filter(task => {
        if (selectedTypes.includes("Epic") && task.type === "Epic") return true;
        if (selectedTypes.includes("Task") && task.type === "Task") return true;
        return false;
      });

  return (
    <div>
      <TaskListFilters 
        selectedTypes={selectedTypes} 
        toggleType={toggleType} 
        clearFilters={clearFilters}
      />
      <TaskListTable filteredTasks={filteredTasks} />
    </div>
  )
}
