
import { ProjectHeader } from "@/components/ProjectHeader";
import { BoardView } from "@/components/BoardView";
import { Layout } from "@/components/Layout";

export default function Board() {
  return (
    <Layout>
      <div className="sticky top-0 bg-white z-10">
        <ProjectHeader />
      </div>
      <BoardView />
    </Layout>
  );
}
