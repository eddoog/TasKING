import { useMediaQuery } from "@/hooks/useMediaQuery"
import { ReactNode, createContext, useEffect, useState } from "react"

type GlobalProviderProps = {
  children: ReactNode
}

type GlobalContextValue = {
  collapsed: boolean
  isTarget: boolean
  toggleMenu: () => void
}

export const GlobalContext = createContext({} as GlobalContextValue)

export function GlobalProvider({ children }: GlobalProviderProps) {
  const isTarget = useMediaQuery(767)

  const [collapsed, setCollapsed] = useState(false)

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

  return (
    <GlobalContext.Provider value={{ collapsed, toggleMenu, isTarget }}>
      {children}
    </GlobalContext.Provider>
  )
}
