import { useToast } from "@/components/ui/use-toast"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { FetchRequest, GetCookieToken } from "@/lib/request"
import { ActiveTab, Task, TaskStatus, User } from "@/lib/type"
import { ReactNode, createContext, useEffect, useMemo, useState } from "react"

type GlobalProviderProps = {
  children: ReactNode
}

type GlobalContextValue = {
  collapsed: boolean
  activeTab: ActiveTab
  setActiveTab: (status: ActiveTab) => void
  isTarget: boolean
  toggleMenu: () => void
  toast: ReturnType<typeof useToast>["toast"]
  setIsAuthenticated: (value: boolean) => void
  user?: User
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  setInitial: () => void
}

export const GlobalContext = createContext({} as GlobalContextValue)

export function GlobalProvider({ children }: GlobalProviderProps) {
  const isTarget = useMediaQuery(767)

  const [collapsed, setCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.ALL_TASKS)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [user, setUser] = useState<User>()

  const { toast } = useToast()

  useEffect(() => {
    const token = GetCookieToken()
    if (!token) return

    async function fetchAll() {
      const data = await FetchRequest(toast)

      if (!data) return

      setUser(data.user)
      setTasks(data.tasks)
    }

    if (token) {
      fetchAll()
    }
  }, [toast, isAuthenticated])

  function toggleMenu() {
    setCollapsed(!collapsed)
  }

  useEffect(() => {
    if (!isTarget) {
      setCollapsed(false)
    } else {
      setCollapsed(true)
    }
  }, [isTarget])

  const tasksToDisplay = useMemo(() => {
    const sortedTasks = tasks.sort((a, b) => {
      const dateA = new Date(a.dueDate)
      const dateB = new Date(b.dueDate)

      if (
        a.status === TaskStatus.INCOMPLETE &&
        b.status === TaskStatus.INCOMPLETE &&
        dateA < dateB
      )
        return -1
      if (
        a.status === TaskStatus.INCOMPLETE &&
        b.status === TaskStatus.INCOMPLETE &&
        dateA > dateB
      )
        return 1
      if (
        a.status === TaskStatus.INCOMPLETE &&
        b.status === TaskStatus.COMPLETED
      )
        return -1
      if (
        a.status === TaskStatus.COMPLETED &&
        b.status === TaskStatus.INCOMPLETE
      )
        return 1
      return 0
    })

    if (activeTab === ActiveTab.ALL_TASKS) return sortedTasks

    return sortedTasks.filter(
      (task) =>
        task.status ===
        (ActiveTab[
          activeTab as keyof typeof ActiveTab
        ] as unknown as TaskStatus)
    )
  }, [tasks, activeTab])

  function setInitial() {
    setCollapsed(false)
    setActiveTab(ActiveTab.ALL_TASKS)
    setIsAuthenticated(false)
    setTasks([])
    setUser(undefined)
  }

  return (
    <GlobalContext.Provider
      value={{
        collapsed,
        activeTab,
        setActiveTab,
        toggleMenu,
        isTarget,
        toast,
        setIsAuthenticated,
        user,
        tasks: tasksToDisplay,
        setTasks,
        setInitial,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
