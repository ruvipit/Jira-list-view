import { useMemo, useState, useRef, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronRight, ChevronDown, MoreHorizontal, Zap, Plus, X, Ellipsis, Maximize2, Mic, User, Calendar, Clock, Flag, Tag } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Task = {
  key: string;
  type: string;
  summary: string;
  status: string;
  category: string;
  icon: string;
}

type TaskListTableProps = {
  filteredTasks: Task[];
}

export function TaskListTable({ filteredTasks }: TaskListTableProps) {
  // Local optimistic additions
  const [addedTasks, setAddedTasks] = useState<Task[]>([])
  const [newSummary, setNewSummary] = useState("")
  const [editingNew, setEditingNew] = useState(false)
  const [panelCollapsed, setPanelCollapsed] = useState(false)
  const [collapsedPos, setCollapsedPos] = useState<{ x: number; y: number } | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const [recentKey, setRecentKey] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null) // deprecated inline input
  const panelSummaryRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (recentKey) {
      const timeout = setTimeout(() => setRecentKey(null), 1800)
      return () => clearTimeout(timeout)
    }
  }, [recentKey])

  // Combine external + added tasks for grouping logic
  const allTasks = useMemo(() => [...filteredTasks, ...addedTasks], [filteredTasks, addedTasks])

  // Build group structures: each Epic acts as a collapsible group header with following tasks until next Epic.
  type Group = { epic: Task | null; tasks: Task[] }

  const groups = useMemo(() => {
    const result: Group[] = []
    let current: Group | null = null
    for (const t of allTasks) {
      if (t.type === 'Epic') {
        current = { epic: t, tasks: [] }
        result.push(current)
      } else {
        if (!current) {
          current = { epic: null, tasks: [] }
          result.push(current)
        }
        current.tasks.push(t)
      }
    }
    return result
  }, [allTasks])

  // Expansion state keyed by epic key (null group always expanded)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  // Ensure newly appearing epics default to expanded
  useMemo(() => {
    const next: Record<string, boolean> = { ...expanded }
    groups.forEach(g => {
      if (g.epic && next[g.epic.key] === undefined) next[g.epic.key] = true
    })
    if (Object.keys(next).length !== Object.keys(expanded).length) {
      setExpanded(next)
    }
  }, [groups, expanded])

  const toggle = (epicKey: string) => setExpanded(prev => ({ ...prev, [epicKey]: !prev[epicKey] }))

  // Generate next key (assumes pattern PREFIX-N where prefix taken from first existing key or ML)
  const nextKey = () => {
    const keys = allTasks.map(t => t.key)
    const prefix = keys[0]?.split('-')[0] || 'ML'
    const maxNum = keys.reduce((acc, k) => {
      const num = parseInt(k.split('-')[1], 10)
      return isNaN(num) ? acc : Math.max(acc, num)
    }, 0)
    return `${prefix}-${maxNum + 1}`
  }

  const emitPanel = (open: boolean) => {
    window.dispatchEvent(new CustomEvent('create-panel-toggle', { detail: { open } }))
  }

  // Emit layout shift only when fully open (not when collapsed mini modal)
  useEffect(() => { emitPanel(editingNew && !panelCollapsed) }, [editingNew, panelCollapsed])

  // When collapsing, initialize position to bottom-right with margin if not set
  useEffect(() => {
  if (panelCollapsed) {
      requestAnimationFrame(() => {
        if (!panelRef.current) return
        const margin = 24
    const w = panelRef.current.offsetWidth || 450
    const h = panelRef.current.offsetHeight || 400
        const x = window.innerWidth - w - margin
        const y = window.innerHeight - h - margin
        setCollapsedPos(prev => prev ?? { x: Math.max(0, x), y: Math.max(0, y) })
      })
    }
  }, [panelCollapsed])

  // Keep collapsed modal within viewport on resize
  useEffect(() => {
    const onResize = () => {
      setCollapsedPos(pos => {
        if (!pos) return pos
        if (!panelRef.current) return pos
  const w = panelRef.current.offsetWidth || 450
  const h = panelRef.current.offsetHeight || 400
        return {
          x: Math.min(Math.max(0, pos.x), window.innerWidth - w),
          y: Math.min(Math.max(0, pos.y), window.innerHeight - h)
        }
      })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Drag handling for collapsed modal (only moves after small threshold; no movement on mere hover/click)
  const dragState = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const endDrag = () => {
  dragState.current = null
  setIsDragging(false)
    window.removeEventListener('pointermove', handleWindowPointerMove)
    window.removeEventListener('pointerup', handleWindowPointerUp)
  }

  const handleWindowPointerMove = (e: PointerEvent) => {
  if (!dragState.current) return
  const dx = e.clientX - dragState.current.startX
  const dy = e.clientY - dragState.current.startY
  if (!isDragging) setIsDragging(true)
    const newX = dragState.current.origX + dx
    const newY = dragState.current.origY + dy
    if (panelRef.current) {
      const w = panelRef.current.offsetWidth || 450
      const h = panelRef.current.offsetHeight || 400
      setCollapsedPos({
        x: Math.min(Math.max(0, newX), window.innerWidth - w),
        y: Math.min(Math.max(0, newY), window.innerHeight - h)
      })
    } else {
      setCollapsedPos({ x: newX, y: newY })
    }
  }

  const handleWindowPointerUp = () => {
    endDrag()
  }

  const onHeaderPointerDown = (e: React.PointerEvent) => {
    if (!panelCollapsed) return
    const target = e.target as HTMLElement
    if (target.closest('button')) return
  dragState.current = { startX: e.clientX, startY: e.clientY, origX: collapsedPos?.x || 0, origY: collapsedPos?.y || 0 }
    window.addEventListener('pointermove', handleWindowPointerMove)
    window.addEventListener('pointerup', handleWindowPointerUp)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => endDrag()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // (Removed legacy drag logic block)

  const commitCreate = () => {
    const summary = newSummary.trim()
    if (!summary) return
    const key = nextKey()
    const newTask: Task = {
      key,
      type: 'Task',
      summary,
      status: 'TO DO',
      category: 'Uncategorised',
      icon: 'Task (16px).svg'
    }
  setAddedTasks(prev => [...prev, newTask])
  setRecentKey(key)
  setNewSummary("")
  setEditingNew(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      commitCreate()
    } else if (e.key === 'Escape') {
      setEditingNew(false)
    }
  }

  useEffect(() => {
    if (editingNew) {
      requestAnimationFrame(() => panelSummaryRef.current?.focus())
    }
  }, [editingNew])

  useEffect(() => {
    if (!editingNew) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setEditingNew(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [editingNew])

  return (
    <div className="bg-white rounded-md border shadow-soft">
      <Table className="text-[13px]">
        <TableHeader className="sticky top-0 z-10 bg-white shadow-sm">
          <TableRow className="hover:bg-transparent">
            <TableHead style={{ paddingLeft: '2rem' }} className="p-2 w-8">
              <Checkbox />
            </TableHead>
            <TableHead className="p-2 w-6" />
            <TableHead className="font-medium text-gray-600">Type</TableHead>
            <TableHead className="font-medium text-gray-600">Key</TableHead>
            <TableHead className="font-medium text-gray-600">Summary</TableHead>
            <TableHead className="font-medium text-gray-600">Status</TableHead>
            <TableHead className="font-medium text-gray-600">Category</TableHead>
            <TableHead className="p-2 w-8" />
          </TableRow>
        </TableHeader>
  <TableBody>
          {groups.map((group, gIdx) => {
            const epic = group.epic
            const isExpanded = epic ? expanded[epic.key] !== false : true
            const childTasks = group.tasks
            return (
              <>
                {epic && (
                  <TableRow
                    key={epic.key}
                    className={cn(
          "group bg-white hover:bg-blue-50/40 transition-colors border-t first:border-t-0"
                    )}
                  >
                    <TableCell style={{ paddingLeft: '2rem' }} className="p-2 align-top pt-3">
                      <Checkbox />
                    </TableCell>
                    <TableCell className="p-2 align-top pt-3">
                      <button
                        type="button"
                        onClick={() => toggle(epic.key)}
                        className="h-4 w-4 flex items-center justify-center text-gray-600"
                        aria-label={isExpanded ? 'Collapse epic' : 'Expand epic'}
                      >
                        {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </button>
                    </TableCell>
                    <TableCell className="p-2 pr-0 align-top pt-3">
                      {epic.icon === 'Zap' ? (
                        <Zap className="h-4 w-4 text-purple-500" />
                      ) : epic.icon === 'Task (16px).svg' ? (
                        <img src="/Task (16px).svg" alt="Task Icon" className="h-4 w-4" />
                      ) : (
                        <img src={`/${epic.icon}`} alt="Task Icon" className="h-4 w-4" />
                      )}
                    </TableCell>
                    <TableCell className="p-2 text-blue-600 font-medium align-top pt-3">{epic.key}</TableCell>
                    <TableCell className="p-2 align-top pt-3">
                      <span className="inline-flex items-center gap-2 pr-6 font-medium group-hover:underline cursor-pointer">
                        {epic.summary}
                        {childTasks.length > 0 && (
                          <span className="inline-flex items-center h-5 px-1.5 rounded-sm text-[11px] font-medium bg-white border border-neutral-200 text-neutral-600">
                            {childTasks.length}
                          </span>
                        )}
                      </span>
                    </TableCell>
                    <TableCell className="p-2 align-top pt-2">
                      <span className={cn(
                        'inline-flex items-center h-5 px-2 rounded-sm text-[11px] font-medium border',
                        epic.status === 'TO DO' && 'bg-gray-50 text-gray-700 border-gray-200',
                        epic.status === 'IN PROGRESS' && 'bg-blue-50 text-blue-700 border-blue-200',
                        epic.status === 'DONE' && 'bg-green-50 text-green-700 border-green-200'
                      )}>{epic.status}</span>
                    </TableCell>
                    <TableCell className="p-2 align-top pt-2">
                      <span className="inline-flex items-center h-5 px-2 rounded-sm text-[11px] font-medium bg-neutral-50 text-neutral-700 border border-neutral-200">{epic.category}</span>
                    </TableCell>
                    <TableCell className="p-2 align-top pt-1">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4 text-gray-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
                {epic && !isExpanded && (
                  <TableRow className="bg-white">
                    <TableCell colSpan={8} className="p-0" />
                  </TableRow>
                )}
                {(!epic || isExpanded) && childTasks.map((task) => (
                  <TableRow
                    key={task.key}
                    className={cn(
          "group bg-white hover:bg-blue-50/40 focus-within:bg-blue-50/60 transition-colors",
          recentKey === task.key && 'animate-pulse ring-1 ring-blue-300/60',
                    )}
                  >
                    <TableCell style={{ paddingLeft: '2rem' }} className="p-2 align-top pt-3">
                      <Checkbox />
                    </TableCell>
                    <TableCell className="p-2 align-top pt-3">
                      <div className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="p-2 pr-0 align-top pt-3">
                      {task.icon === 'Zap' ? (
                        <Zap className="h-4 w-4 text-purple-500" />
                      ) : task.icon === 'Task (16px).svg' ? (
                        <img src="/Task (16px).svg" alt="Task Icon" className="h-4 w-4" />
                      ) : (
                        <img src={`/${task.icon}`} alt="Task Icon" className="h-4 w-4" />
                      )}
                    </TableCell>
                    <TableCell className="p-2 text-blue-600 font-medium align-top pt-3">{task.key}</TableCell>
                    <TableCell className="p-2 align-top pt-3">
                      <span className="inline-block pr-6 group-hover:underline cursor-pointer">{task.summary}</span>
                    </TableCell>
                    <TableCell className="p-2 align-top pt-2">
                      <span className={cn(
                        'inline-flex items-center h-5 px-2 rounded-sm text-[11px] font-medium border',
                        task.status === 'TO DO' && 'bg-gray-50 text-gray-700 border-gray-200',
                        task.status === 'IN PROGRESS' && 'bg-blue-50 text-blue-700 border-blue-200',
                        task.status === 'DONE' && 'bg-green-50 text-green-700 border-green-200'
                      )}>{task.status}</span>
                    </TableCell>
                    <TableCell className="p-2 align-top pt-2">
                      <span className="inline-flex items-center h-5 px-2 rounded-sm text-[11px] font-medium bg-neutral-50 text-neutral-700 border border-neutral-200">{task.category}</span>
                    </TableCell>
                    <TableCell className="p-2 align-top pt-1">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4 text-gray-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )
          })}
          {/* Minimal create row at bottom */}
          <TableRow
            className="cursor-pointer border-t hover:bg-blue-50/40 transition-colors"
            onClick={() => setEditingNew(true)}
          >
            <TableCell colSpan={8} className="p-2" style={{ paddingLeft: '2rem' }}>
              <div className="flex items-center gap-2 text-[13px] text-gray-600">
                <Plus className="h-4 w-4" />
                <span className="font-medium">Create</span>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* Slide-in side panel */}
      {/* Overlay only when expanded */}
      {editingNew && !panelCollapsed && (
        <div
          className={cn(
            'fixed inset-0 bg-transparent transition-opacity duration-300 z-40',
            editingNew ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          )}
          onClick={() => setEditingNew(false)}
          aria-hidden={!editingNew}
        />
      )}
      {/* Side panel / Collapsed modal: only render while creating OR collapsed */}
      {(editingNew || panelCollapsed) && (
        <div
          className={cn(
            panelCollapsed
              ? cn("fixed bg-white rounded-2xl shadow-floating border flex flex-col transition-all duration-300 z-50 select-none",
                  isDragging ? 'cursor-grabbing' : 'cursor-grab')
              : "fixed right-4 bottom-4 w-[440px] max-w-[calc(90vw-1rem)] bg-white shadow-floating flex flex-col transition-transform duration-300 z-50 border rounded-xl " +
                (editingNew ? 'translate-x-0' : 'translate-x-full') +
                ' top-[var(--create-panel-offset,var(--top-nav-offset,0px))] h-[calc(100vh-var(--create-panel-offset,var(--top-nav-offset,0px))-1rem)] ',
            !editingNew && !panelCollapsed && '!pointer-events-none'
          )}
          role="dialog"
          aria-modal={editingNew && !panelCollapsed}
          aria-label="Create new task"
          ref={panelRef}
          style={panelCollapsed && collapsedPos ? { top: collapsedPos.y, left: collapsedPos.x, width: 450, height: 400 } : undefined}
        >
        {/* Header */}
        <div
          className={cn("flex items-center justify-between px-3 border-b select-none", panelCollapsed ? 'h-12 rounded-t-2xl' : 'h-12 rounded-t-xl') }
          onPointerDown={onHeaderPointerDown}
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPanelCollapsed(c => !c)}
              className="h-7 w-7 flex items-center justify-center rounded-sm hover:bg-neutral-100 text-gray-600"
              aria-label={panelCollapsed ? 'Expand panel' : 'Collapse panel'}
            >
              {panelCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            <img src="/Task (16px).svg" alt="Task icon" className="h-4 w-4 translate-y-[1px]" />
            <span className="text-[13px] font-medium text-gray-700">New task</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" aria-label="More"><Ellipsis className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" aria-label="Expand"><Maximize2 className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" aria-label="Close" onClick={() => { setEditingNew(false); setPanelCollapsed(false) }}><X className="h-4 w-4" /></Button>
          </div>
  </div>
  {/* Scrollable Content */}
  <div className={cn("flex-1 overflow-y-auto px-10 pb-40", panelCollapsed ? 'pt-6' : 'pt-10')}>
          {/* Hero state (only when expanded & empty) */}
          {!panelCollapsed && (newSummary.trim().length === 0) && (
            <div className="text-center mb-10 select-none">
              <div className="mx-auto mb-6 flex items-center justify-center">
                <div className="relative h-14 w-14">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-blue-500 to-blue-300 flex items-center justify-center text-white shadow-soft">
                    <Checkbox disabled className="opacity-90 scale-110" />
                  </div>
                  <div className="absolute -right-3 -bottom-2 h-11 w-11 rounded-xl bg-gradient-to-tr from-violet-500 to-fuchsia-400 flex items-center justify-center shadow-soft border-4 border-white">
                    <Plus className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
              <h1 className="text-[26px] font-semibold tracking-tight text-neutral-900">What will you create today?</h1>
            </div>
          )}
          {/* Summary input */}
          <div className="space-y-4 max-w-full">
            <input
              ref={panelSummaryRef}
              value={newSummary}
              onChange={e => setNewSummary(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe the task you want to create..."
              className="w-full text-[15px] font-medium bg-transparent focus:outline-none border-none ring-0 placeholder:text-neutral-400"
            />
          </div>
          {/* Required fields */}
          <div className="mt-10">
            <p className="text-[11px] uppercase font-semibold text-neutral-600 mb-3 tracking-wide">Required fields</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Assignee', icon: User },
                { label: 'Due date', icon: Calendar },
                { label: 'Estimate', icon: Clock },
                { label: 'Priority', icon: Flag },
                { label: 'Reporter', icon: User },
                { label: 'Label', icon: Tag }
              ].map(f => (
                <button
                  key={f.label+f.icon.name}
                  type="button"
                  className="h-8 px-3 rounded-md border border-neutral-300 bg-white text-[12px] font-medium text-neutral-700 hover:bg-neutral-50 flex items-center gap-1.5 shadow-sm"
                >
                  <f.icon className="h-3.5 w-3.5 text-neutral-500" />
                  {f.label}
                </button>
              ))}
            </div>
          </div>
  </div>
  {/* Footer */}
  <div className={cn("absolute left-0 right-0 border-t bg-white flex items-center justify-between", panelCollapsed ? 'px-5 py-3 bottom-0 rounded-b-2xl' : 'px-5 py-3 bottom-0 rounded-b-xl') }>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label="Add"><Plus className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label="Voice"><Mic className="h-4 w-4" /></Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 px-3 text-[12px]" onClick={() => { setEditingNew(false); setPanelCollapsed(false) }}>Cancel</Button>
            <Button size="sm" onClick={commitCreate} disabled={!newSummary.trim()} className="h-8 px-5 text-[13px] font-medium">Create</Button>
          </div>
        </div>
        </div>
      )}
    </div>
  )
}
