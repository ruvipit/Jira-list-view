import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { PlusIcon, MoreHorizontal, CalendarDays, ArrowUp } from "lucide-react";
import { Badge } from "./ui/badge";
import { BoardViewControls } from "./BoardViewControls";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import React, { useState } from "react";
import { Ripple } from "./magicui/ripple";

interface Task {
  id: string;
  title: string;
  tags: string[]; // labels
  assignee?: { name: string; avatar: string };
  dueDate?: string; // ISO or human date
  issueKey: string; // e.g. NUC-361
  storyPoints?: number;
  priority?: "low" | "medium" | "high";
}

interface Column {
  title: string;
  key: string;
  color: string; // tailwind color token for accent dot
  tasks: Task[];
}

const baseTasks: Task[] = [
  {
    id: "1",
    title: "Follow Annie's Goal Reach 50k customers",
    tags: ["Billing", "accounts", "50k"],
    dueDate: "24 Feb 2024",
    issueKey: "NUC-361",
    storyPoints: 6,
    priority: "high",
    assignee: { name: "Alex", avatar: "A" }
  },
  {
    id: "2",
    title: "Fluid responsive website on tablets",
    tags: ["Forms", "breakpoints", "booking", "tablet"],
    dueDate: "24 Feb 2024",
    issueKey: "NUC-361",
    storyPoints: 6,
    priority: "medium",
    assignee: { name: "Priya", avatar: "P" }
  },
  {
    id: "3",
    title: "Update API for outbound booking flows",
    tags: ["Teamwork", "collection", "booking", "assistance"],
    dueDate: "24 Feb 2024",
    issueKey: "NUC-361",
    storyPoints: 6,
    priority: "medium",
    assignee: { name: "Chen", avatar: "C" }
  },
  {
    id: "4",
    title: "Ship help agent",
    tags: ["Help", "agents", "AI", "customer help"],
    dueDate: "24 Feb 2024",
    issueKey: "NUC-361",
    storyPoints: 6,
    priority: "high",
    assignee: { name: "Sara", avatar: "S" }
  },
  {
    id: "5",
    title: "Color of pale yellow looks incorrect",
    tags: ["Collections", "accessibility", "color", "UI"],
    dueDate: "24 Feb 2024",
    issueKey: "NUC-361",
    storyPoints: 6,
    priority: "low",
    assignee: { name: "Ben", avatar: "B" }
  },
  {
    id: "6",
    title: "Product search optimization",
    tags: ["Billing", "search", "view"],
    dueDate: "24 Feb 2024",
    issueKey: "NUC-361",
    storyPoints: 6,
    priority: "medium",
    assignee: { name: "Alex", avatar: "A" }
  }
];

// Distribute sample tasks into columns to emulate screenshot
const columns: Column[] = [
  { title: "To do", key: "TO_DO", color: "bg-gray-300", tasks: [baseTasks[0], baseTasks[0], { ...baseTasks[0], id: "1c" }] },
  { title: "In progress", key: "IN_PROGRESS", color: "bg-blue-500", tasks: [baseTasks[1], baseTasks[1]] },
  { title: "In review", key: "IN_REVIEW", color: "bg-purple-500", tasks: [baseTasks[2], baseTasks[4]] },
  { title: "Done", key: "DONE", color: "bg-green-500", tasks: [baseTasks[3], baseTasks[5], baseTasks[4]] }
];

export function BoardView() {
  const [boardColumns, setBoardColumns] = useState(columns);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [justDroppedTaskId, setJustDroppedTaskId] = useState<string | null>(null);
  const [rippleTaskId, setRippleTaskId] = useState<string | null>(null);

  function onDragEnd(result: DropResult) {
    const { source, destination, draggableId } = result;
    setDraggedTaskId(null);
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceColIdx = boardColumns.findIndex(col => col.title === source.droppableId);
    const destColIdx = boardColumns.findIndex(col => col.title === destination.droppableId);
    const sourceCol = boardColumns[sourceColIdx];
    const destCol = boardColumns[destColIdx];
    const task = sourceCol.tasks[source.index];

    // Remove from source
    const newSourceTasks = Array.from(sourceCol.tasks);
    newSourceTasks.splice(source.index, 1);
    // Add to destination
    const newDestTasks = Array.from(destCol.tasks);
    newDestTasks.splice(destination.index, 0, task);

    const newColumns = [...boardColumns];
    newColumns[sourceColIdx] = { ...sourceCol, tasks: newSourceTasks };
    newColumns[destColIdx] = { ...destCol, tasks: newDestTasks };
    setBoardColumns(newColumns);
    setRippleTaskId(draggableId); // Ripple starts immediately
    setTimeout(() => setRippleTaskId(null), 200); // Ripple duration matches animation
  }

  return (
    <div className="p-6">
      <BoardViewControls />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4 pr-2">
          {boardColumns.map((column) => (
            <Droppable droppableId={column.title} key={column.key}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-72 shrink-0 bg-gray-50/60 backdrop-blur-sm border border-gray-200 rounded-lg p-3 flex flex-col"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${column.color}`} />
                      <span className="font-medium text-sm text-gray-800">{column.title}</span>
                      <span className="text-xs text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded-full">
                        {column.tasks.length}
                      </span>
                    </div>
                    <button className="h-6 w-6 inline-flex items-center justify-center rounded hover:bg-gray-100">
                      <MoreHorizontal className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                  <div className="flex-1 space-y-2.5">
                    {column.tasks.map((task, taskIdx) => (
                      <Draggable draggableId={task.id} index={taskIdx} key={task.id}>
                        {(provided, snapshot) => {
                          const showRipple = rippleTaskId === task.id;
                          const priorityColor = task.priority === 'high' ? 'text-red-500' : task.priority === 'medium' ? 'text-amber-500' : 'text-gray-400';
                          return (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`group relative pl-2 pr-3 py-3 bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all rounded-md overflow-hidden ${snapshot.isDragging ? 'ring-2 ring-blue-400' : ''}`}
                            >
                              <span className={`absolute left-0 top-0 h-full w-1 rounded-l-md ${priorityColor === 'text-red-500' ? 'bg-red-400' : priorityColor === 'text-amber-500' ? 'bg-amber-400' : 'bg-gray-300'}`} />
                              {showRipple && <Ripple color="#3b82f6" duration={400} />}
                              <div className="space-y-2">
                                <h3 className="text-[13px] font-medium leading-snug text-gray-900 line-clamp-3 pr-4">{task.title}</h3>
                                <div className="flex flex-wrap gap-1.5">
                                  {task.tags.map(tag => (
                                    <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-sm bg-neutral-50 text-neutral-700 border border-neutral-200 shadow-xs">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                <div className="flex items-center justify-between text-[11px] text-gray-600">
                                  <div className="flex items-center gap-1">
                                    <ArrowUp className={`h-3 w-3 ${priorityColor}`} />
                                    <span className="text-gray-700 font-medium tracking-tight">{task.issueKey}</span>
                                    {task.storyPoints && <span className="text-gray-400">·</span>}
                                    {task.storyPoints && <span className="text-gray-700">{task.storyPoints}</span>}
                                  </div>
                                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="h-5 w-5 rounded hover:bg-gray-100 flex items-center justify-center">
                                      <MoreHorizontal className="h-3.5 w-3.5 text-gray-500" />
                                    </button>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                  {task.assignee && (
                                    <Avatar className="h-6 w-6 border border-gray-200">
                                      <AvatarFallback className="bg-blue-600 text-white text-[10px] font-medium">
                                        {task.assignee.avatar}
                                      </AvatarFallback>
                                    </Avatar>
                                  )}
                                  {task.dueDate && (
                                    <div className="flex items-center gap-1 text-[10px] text-gray-600 bg-gray-50 px-2 py-1 rounded-full border border-gray-200">
                                      <CalendarDays className="h-3 w-3" />
                                      <span>{task.dueDate}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Card>
                          );
                        }}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                  <button className="mt-3 w-full text-[13px] font-medium text-gray-600 hover:text-blue-600 flex items-center gap-1.5 px-2 py-1 rounded hover:bg-gray-100/70 transition">
                    <PlusIcon className="h-4 w-4" />
                    Add
                  </button>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
