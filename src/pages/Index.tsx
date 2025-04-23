
import { ProjectHeader } from "@/components/ProjectHeader";
import { TaskList } from "@/components/TaskList";
import { Layout } from "@/components/Layout";

export default function Index() {
  return (
    <Layout>
      <div className="sticky top-0 bg-white z-10">
        <ProjectHeader />
      </div>
      <TaskList />
    </Layout>
  );
}
