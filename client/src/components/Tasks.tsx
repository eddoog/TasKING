import { GlobalContext } from "@/context/GlobalProvider"
import { PlusIcon } from "@radix-ui/react-icons"
import { Fragment, useContext } from "react"
import Task from "./Task"
import TaskOperation from "./TaskOperation"

type Props = {
  title: string
}

export function Tasks({ title }: Props) {
  const { tasks } = useContext(GlobalContext)

  return (
    <div className="relative p-8 w-full flex-1 bg-container border-2 border-solid border-sidebar-link rounded-2xl h-full overflow-y-auto">
      <h1 className="text-clamph1 font-extrabold relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-task-underline rounded-[0.5rem]">
        {title}
      </h1>
      <TaskOperation operation="create">
        <button className="fixed md:top-[4.9rem] md:right-[5.1rem] top-12 right-14 w-12 h-12 rounded-[50%] bg-task-background border-2 border-solid border-sidebar-link shadow-task text-task-foreground text-[1.4rem] flex items-center justify-center sm:animate-none animate-pulse">
          <PlusIcon className="w-5 h-5" />
        </button>
      </TaskOperation>
      <div className="grid md:grid-cols-[repeat(auto-fill_,_minmax(300px,_1fr))] gap-6 my-8 mx-0">
        {tasks.map((task) => {
          return (
            <Fragment key={task.id}>
              <Task
                id={task.id}
                name={task.name}
                description={task.description}
                dueDate={task.dueDate}
                status={task.status}
                createdAt={task.createdAt}
                updatedAt={task.updatedAt}
              />
            </Fragment>
          )
        })}
        <TaskOperation operation="create">
          <button className="flex items-center justify-center rounded-2xl gap-2 h-[16rem] text-task-foreground border-[3px] border-task-dashed border-dashed transition-all duration-300 ease-in-out hover:bg-task-dashed hover:text-white/90">
            <PlusIcon className="w-5 h-5" />
            Add New Task
          </button>
        </TaskOperation>
      </div>
    </div>
  )
}
