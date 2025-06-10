import { TaskList } from "@/components/TaskList";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { 
  FolderKanban, 
  Filter,
  CheckSquare,
  MoreHorizontal,
  Plus,
  Search,
  ChevronDown,
  Table
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function SearchWorkItems() {
  return (
    <Layout>
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">All work</h1>
          <Button variant="outline" className="gap-2">
              Assignee
              <Filter className="h-4 w-4" />
            </Button>
          
          <div className="flex items-center space-x-2 mb-4">
            <Button variant="outline" className="bg-white border rounded-md">
              <span className="text-sm">AI</span>
            </Button>
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
              Project
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="gap-2">
              Assignee
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="gap-2">
              Type
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="gap-2">
              Status
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="gap-2 bg-blue-50 text-blue-600 border-blue-300">
              Created: Within the last 30 days
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="gap-2">
              More filters
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="text-blue-600">
              Clear filters
            </Button>
            <Button variant="ghost" className="text-blue-600">
              Save filter
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="gap-2">
                Apps
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="gap-2">
                Share
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="gap-2">
                Export
                <ChevronDown className="h-4 w-4" />
              </Button>
              <div className="flex items-center">
                <Button variant="outline" className="rounded-r-none">
                  <Table className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="rounded-l-none">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <TaskList />
      </div>
    </Layout>
  );
}
