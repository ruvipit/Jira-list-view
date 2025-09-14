
import { useState, useEffect, useRef } from 'react'
import { ProjectHeader } from "@/components/ProjectHeader";
import { TaskList } from "@/components/TaskList";
import { Layout } from "@/components/Layout";

// Listen for custom event from TaskListTable when panel open/close to shift layout
declare global {
  interface WindowEventMap {
    'create-panel-toggle': CustomEvent<{ open: boolean }>;
  }
}

export default function Index() {
  const [panelOpen, setPanelOpen] = useState(false)
  const headerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handler = (e: CustomEvent<{ open: boolean }>) => setPanelOpen(e.detail.open)
    window.addEventListener('create-panel-toggle', handler as EventListener)
    return () => window.removeEventListener('create-panel-toggle', handler as EventListener)
  }, [])

  useEffect(() => {
    const measure = () => {
  const headerEl = headerRef.current
  if (!headerEl) return
  const total = headerEl.offsetHeight || 0
  const navRow = headerEl.querySelector('.project-nav-row') as HTMLElement | null
  const navHeight = navRow?.offsetHeight || 0
  const createPanelOffset = total - navHeight // height of first (top) row only
  document.documentElement.style.setProperty('--top-nav-offset', `${total}px`)
  document.documentElement.style.setProperty('--create-panel-offset', `${createPanelOffset}px`)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <Layout>
  <div ref={headerRef} className="sticky top-0 bg-white z-10">
        <ProjectHeader panelOpen={panelOpen} />
      </div>
      <div className={panelOpen ? 'pr-[460px] transition-[padding] duration-300 ease-out' : 'pr-0 transition-[padding] duration-300 ease-out'}>
        <TaskList />
      </div>
    </Layout>
  )
}
