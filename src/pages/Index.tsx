
import { TopNav } from "@/components/TopNav"
import { Sidebar } from "@/components/Sidebar"
import { ProjectHeader } from "@/components/ProjectHeader"
import { TaskList } from "@/components/TaskList"

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <div className="sticky top-0 bg-white z-10">
            <ProjectHeader />
          </div>
          <TaskList />
        </main>
      </div>
    </div>
  )
}
