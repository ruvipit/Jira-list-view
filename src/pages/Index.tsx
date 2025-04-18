
import { TopNav } from "@/components/TopNav"
import { Sidebar } from "@/components/Sidebar"
import { ProjectHeader } from "@/components/ProjectHeader"
import { TaskList } from "@/components/TaskList"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <div className="sticky top-0 bg-white z-10">
            <div className="flex items-center justify-between px-6 py-2 border-b">
              <div className="flex items-center gap-4">
                <Button variant="default" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create
                </Button>
              </div>
            </div>
            <ProjectHeader />
          </div>
          <TaskList />
        </main>
      </div>
    </div>
  )
}
