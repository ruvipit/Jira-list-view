
import { TaskList } from "@/components/TaskList";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { 
  FolderKanban, 
  Filter,
  CheckSquare,
  MoreHorizontal,
  Plus,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function SearchWorkItems() {
  return (
    <Layout>
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">All work</h1>
          
          <div className="flex items-center space-x-2 mb-4">
            <Button variant="outline" className="bg-white border rounded-md">
              <span className="text-sm">Basic</span>
            </Button>
            <Button variant="ghost" className="text-gray-600">
              <span className="text-sm">JQL</span>
            </Button>
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                className="h-10 pl-8" 
                placeholder="Search work" 
              />
            </div>
            <Button variant="outline" className="gap-2">
              Assignee
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="gap-2 bg-blue-50 text-blue-600 border-blue-300">
              Type = Task
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="gap-2">
              Status
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="gap-2">
              More filters
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="text-blue-600">
              Clear filters
            </Button>
          </div>
        </div>
        
        <TaskList />
      </div>
    </Layout>
  );
}
