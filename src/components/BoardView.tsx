import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { PlusIcon, MoreHorizontal } from "lucide-react";
import { Badge } from "./ui/badge";
import { BoardViewControls } from "./BoardViewControls";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import React, { useState } from "react";
import { Ripple } from "./magicui/ripple";

interface Task {
  id: string;
  title: string;
  tags: string[];
  assignee?: {
    name: string;
    avatar: string;
  };
  dueDate?: string;
}

const columns = [
  {
    title: "TO DO",
    tasks: [
      {
        id: "1",
        title: "Prepare deck for pitch",
        tags: ["Pitches"],
        dueDate: "31 may",
      },
      {
        id: "2",
        title: "New template illustration main cover photo",
        tags: ["Design", "Templates"],
        dueDate: "Tag",
      },
    ],
  },
  {
    title: "IN PROGRESS",
    tasks: [
      {
        id: "3",
        title: "New logo for client",
        tags: ["Design"],
        assignee: {
          name: "John",
          avatar: "J",
        },
      },
      {
        id: "4",
        title: "Analysis of social media campaign",
        tags: ["Campaigns", "Social media"],
        dueDate: "1 June",
      },
    ],
  },
  {
    title: "DONE",
    tasks: [
      {
        id: "5",
        title: "Pitch deck templates",
        tags: ["Pitches", "Templates"],
        dueDate: "22 May",
      },
    ],
  },
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
        <div className="flex gap-6">
          {boardColumns.map((column, colIdx) => (
            <Droppable droppableId={column.title} key={column.title}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex-1 min-w-[300px] bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm tracking-wide">{column.title}</span>
                      <span className="text-sm text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
                        {column.tasks.length}
                      </span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {column.tasks.map((task, taskIdx) => (
                      <Draggable draggableId={task.id} index={taskIdx} key={task.id}>
                        {(provided, snapshot) => {
                          const isJustDropped = justDroppedTaskId === task.id;
                          const showRipple = rippleTaskId === task.id;
                          return (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-4 hover:shadow-md transition-shadow duration-300
                                ${snapshot.isDragging ? "bg-blue-50" : ""}
                                relative overflow-hidden
                              `}
                            >
                              {showRipple && (
                                <Ripple color="#3b82f6" duration={400} />
                              )}
                              <div className="space-y-3">
                                <h3 className="text-sm font-medium leading-snug">{task.title}</h3>
                                <div className="flex flex-wrap gap-1.5">
                                  {task.tags.map((tag) => (
                                    <Badge
                                      key={tag}
                                      variant="outline"
                                      className="rounded-full bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="flex items-center justify-between">
                                  {task.assignee && (
                                    <Avatar className="h-6 w-6">
                                      <AvatarFallback className="bg-blue-500 text-white text-xs">
                                        {task.assignee.avatar}
                                      </AvatarFallback>
                                    </Avatar>
                                  )}
                                  {task.dueDate && (
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                      <span className="bg-gray-50 px-2 py-1 rounded-full border border-gray-200">
                                        {task.dueDate}
                                      </span>
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
                  <Button
                    variant="ghost"
                    className="w-full mt-3 text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1"
                  >
                    <PlusIcon className="h-4 w-4" />
                    Create
                  </Button>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
