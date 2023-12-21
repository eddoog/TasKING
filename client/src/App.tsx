import "./App.css"
import { Sidebar } from "./components/Sidebar"
import { Tasks } from "./components/Tasks"

function App() {
  return (
    <div className="flex md:gap-10 md:p-10 p-4 gap-4 h-screen">
      <Sidebar />
      <Tasks title={"All Tasks"} />
    </div>
  )
}

export default App
