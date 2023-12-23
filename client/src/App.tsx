import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./App.css"
import { Sidebar } from "./components/Sidebar"
import { Tasks } from "./components/Tasks"
import { useToast } from "./components/ui/use-toast"
import { GetCookieToken } from "./lib/request"

function App() {
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    const token = GetCookieToken()

    if (!token) {
      navigate("/login")
    }
  }, [navigate, toast])

  return (
    <div className="flex md:gap-10 md:p-10 p-4 gap-4 h-screen">
      <Sidebar />
      <Tasks title={"All Tasks"} />
    </div>
  )
}

export default App
