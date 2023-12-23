import { TaskStatus, Task as Type } from "@/lib/type"
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons"
import TaskOperation from "./TaskOperation"
import TaskDelete from "./TaskDelete"
import { AuthenticatedFetch } from "@/lib/request"
import { useToast } from "./ui/use-toast"
import { GlobalContext } from "@/context/GlobalProvider"
import { useContext } from "react"

export default function Task(props: React.PropsWithChildren<Type>) {
  const { id, name, description, dueDate, status } = props
  const { toast } = useToast()
  const { setTasks } = useContext(GlobalContext)

  async function onDelete() {
    try {
      await AuthenticatedFetch(`task/delete/${id}`, {
        method: "DELETE",
      })

      toast({
        title: "Success",
        description: "Task deleted successfully.",
        duration: 5000,
      })
      setTasks((prev) => prev.filter((task) => task.id !== id))
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        duration: 5000,
      })
    }
  }

  return (
    <div className="py-[1.2rem] px-4 rounded-2xl bg-sidebar-link shadow-item border-2 border-solid border-sidebar-link md:h-[16rem] flex flex-col gap-2">
      <h1 className="text-2xl font-semibold">{name}</h1>
      <p>{description}</p>
      <p className="mt-auto">{new Date(dueDate).toDateString()}</p>
      <div className="flex items-center gap-5">
        {status === TaskStatus.COMPLETED ? (
          <button className="border-none outline-none cursor-pointer inline-block py-2 px-4 bg-sidebar-active rounded-[30px]">
            Completed
          </button>
        ) : (
          <button className="border-none outline-none cursor-pointer inline-block py-2 px-4 bg-destructive rounded-[30px]">
            Incomplete
          </button>
        )}
        <TaskOperation
          operation="update"
          id={id}
          name={name}
          description={description}
          dueDate={dueDate}
          status={status}
        >
          <button className="border-none outline-none cursor-pointer text-[1.4rem] text-task-foreground ml-auto">
            <Pencil2Icon className="w-5 h-5" />
          </button>
        </TaskOperation>
        <TaskDelete onClick={onDelete}>
          <div className="border-none outline-none cursor-pointer text-[1.4rem] text-task-foreground">
            <TrashIcon className="w-5 h-5" />
          </div>
        </TaskDelete>
      </div>
    </div>
  )
}
