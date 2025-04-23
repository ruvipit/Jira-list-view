
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { PlusIcon, MoreHorizontal } from "lucide-react";
import { Badge } from "./ui/badge";
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
          <div key={column.title} className="flex-1 min-w-[300px] bg-white rounded-lg p-4">
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
              {column.tasks.map((task) => (
                <Card key={task.id} className="p-4 hover:shadow-md transition-shadow">
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
              ))}
            </div>
            <Button
              variant="ghost"
              className="w-full mt-3 text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1"
            >
              <PlusIcon className="h-4 w-4" />
              Create
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
