import { GlobalContext } from "@/context/GlobalProvider"
import { Task, TaskStatus } from "@/lib/type"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"

export default function TaskOperation(
  props: React.PropsWithChildren<{
    children: React.ReactNode
    operation: "create" | "update"
    name?: string
    description?: string
    status?: TaskStatus
    dueDate?: Date
  }>
) {
  const { isTarget } = useContext(GlobalContext)
  const { children, operation, name, description, status, dueDate } = props

  const {
    register,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Task>({
    defaultValues: {
      name: name,
      description: description,
      status: status,
      dueDate: dueDate,
    },
  })

  console.log(watch())

  function onSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const { name, description, status, dueDate } = watch()
    if (!name) {
      setError("name", {
        type: "manual",
        message: "Please enter a title",
      })
    }

    if (!description) {
      setError("description", {
        type: "manual",
        message: "Please enter a description",
      })
    }

    if (!status) {
      setError("status", {
        type: "manual",
        message: "Please enter a status",
      })
    }

    if (!dueDate) {
      setError("dueDate", {
        type: "manual",
        message: "Please enter a due date",
      })
    }

    if (
      Object.keys(errors).length > 0 ||
      !(name && description && status && dueDate)
    ) {
      event.preventDefault()
      return
    }

    if (operation === "create") {
      console.log("create")
    } else {
      console.log("update")
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={isTarget ? "bottom" : "left"}>
        <SheetHeader>
          <SheetTitle>
            {operation == "create" ? "Create" : "Edit"} Task
          </SheetTitle>
          <SheetDescription>
            {operation == "create"
              ? "With this UI, you can add your task"
              : "Make changes to your task here"}
            . Click {operation} when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              className="col-span-3"
              {...register("name", {
                required: {
                  value: true,
                  message: "Please enter a title",
                },
                onChange: () => {
                  clearErrors("name")
                },
              })}
            />
            {errors.name && (
              <span className="md:text-base text-sm text-destructive">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              className="col-span-3"
              {...register("description", {
                required: {
                  value: true,
                  message: "Please enter a description",
                },
                onChange: () => {
                  clearErrors("description")
                },
              })}
            />
            {errors.name && (
              <span className="md:text-base text-sm text-destructive">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label htmlFor="status">Status</Label>
            <Select
              value={watch("status")}
              onValueChange={(value) => {
                setValue("status", TaskStatus[value as keyof typeof TaskStatus])
                clearErrors("status")
              }}
            >
              <SelectTrigger className="w-full col-span-3" id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-container">
                <SelectItem value="INCOMPLETE">Incomplete</SelectItem>
                <SelectItem value="COMPLETE">Complete</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <span className="md:text-base text-sm text-destructive">
                {errors.status.message}
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label htmlFor="status">Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full col-span-3 justify-start text-left font-normal",
                    !watch("dueDate") && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {watch("dueDate") ? (
                    format(watch("dueDate"), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col space-y-2 p-2 bg-container">
                <Select
                  onValueChange={(value) =>
                    setValue("dueDate", addDays(new Date(), parseInt(value)))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="bg-container">
                    <SelectItem value="0">Today</SelectItem>
                    <SelectItem value="1">Tomorrow</SelectItem>
                    <SelectItem value="3">In 3 days</SelectItem>
                    <SelectItem value="7">In a week</SelectItem>
                  </SelectContent>
                </Select>
                <div className="rounded-md">
                  <Calendar
                    mode="single"
                    selected={watch("dueDate")}
                    className="bg-container"
                    onSelect={(date) => {
                      if (!date) return
                      setValue("dueDate", date)
                      clearErrors("dueDate")
                    }}
                    //   onSelect={setDate}
                  />
                </div>
              </PopoverContent>
            </Popover>
            {errors.dueDate && (
              <span className="md:text-base text-sm text-destructive">
                {errors.dueDate.message}
              </span>
            )}
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={(e) => onSubmit(e)}>
              {operation === "create" ? "Create" : "Edit"}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
