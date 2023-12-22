import { TaskStatus, Task as Type } from "@/lib/type"
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons"
import TaskOperation from "./TaskOperation"
import TaskDelete from "./TaskDelete"

export default function Task(props: React.PropsWithChildren<Type>) {
  const { id, name, description, dueDate, status } = props

  function onDelete() {
    console.log("Delete " + id)
  }

  return (
    <div className="py-[1.2rem] px-4 rounded-2xl bg-sidebar-link shadow-item border-2 border-solid border-sidebar-link md:h-[16rem] flex flex-col gap-2">
      <h1 className="text-2xl font-semibold">{name}</h1>
      <p>{description}</p>
      <p className="mt-auto">{dueDate.toDateString()}</p>
      <div className="flex items-center gap-5">
        {status === TaskStatus.COMPLETE ? (
          <button className="border-none outline-none cursor-pointer inline-block py-2 px-4 bg-sidebar-active rounded-[30px]">
            Complete
          </button>
        ) : (
          <button className="border-none outline-none cursor-pointer inline-block py-2 px-4 bg-destructive rounded-[30px]">
            Incomplete
          </button>
        )}
        <TaskOperation
          operation="update"
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
          <button className="border-none outline-none cursor-pointer text-[1.4rem] text-task-foreground">
            <TrashIcon className="w-5 h-5" />
          </button>
        </TaskDelete>
      </div>
    </div>
  )
}
