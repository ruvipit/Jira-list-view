import { ReactNode } from "react";
import { TopNav } from "@/components/TopNav";
import { Sidebar } from "@/components/Sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen h-screen overflow-hidden">
      <TopNav />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle className="w-0 transition-all hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0" />
        <ResizablePanel defaultSize={80}>
          <main className="flex-1">{children}</main>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
