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
    <div className="p-0 md:p-0 flex flex-col h-full">
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b px-6 pt-4 pb-3">
        <TaskListFilters 
          selectedTypes={selectedTypes} 
          toggleType={toggleType} 
          clearFilters={clearFilters}
        />
      </div>
      <div className="px-6 py-4 overflow-auto flex-1">
        <TaskListTable filteredTasks={filteredTasks} />
      </div>
    </div>
  )
}
