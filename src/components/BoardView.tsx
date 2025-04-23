import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Avatar } from "./ui/avatar";
import { PlusIcon } from "lucide-react";
import { BoardViewControls } from "./BoardViewControls";

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
  return (
    <div className="p-6">
      <BoardViewControls />
      <div className="flex gap-6">
        {columns.map((column) => (
          <div key={column.title} className="flex-1 min-w-[300px]">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{column.title}</span>
                <span className="text-sm text-gray-500">{column.tasks.length}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              {column.tasks.map((task) => (
                <Card key={task.id} className="p-4">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">{task.title}</h3>
                    <div className="flex flex-wrap gap-1">
                      {task.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-gray-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      {task.assignee && (
                        <Avatar>
                          <div className="flex h-full w-full items-center justify-center bg-blue-500 text-white">
                            {task.assignee.avatar}
                          </div>
                        </Avatar>
                      )}
                      {task.dueDate && (
                        <span className="text-xs text-gray-500">
                          {task.dueDate}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
