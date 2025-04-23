
import { TopNav } from "@/components/TopNav";
import { Sidebar } from "@/components/Sidebar";
import { ProjectHeader } from "@/components/ProjectHeader";
import { BoardView } from "@/components/BoardView";

export default function Board() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <div className="sticky top-0 bg-white z-10">
            <ProjectHeader />
          </div>
          <BoardView />
        </main>
      </div>
    </div>
  );
}
