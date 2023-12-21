import { useContext } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
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
import { GlobalContext } from "@/context/GlobalProvider"

export default function PesananOperation(
  props: React.PropsWithChildren<{
    children: React.ReactNode
    operation: "create" | "update"
  }>
) {
  const { isTarget } = useContext(GlobalContext)
  const { children, operation } = props

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={isTarget ? "bottom" : "left"}>
        <SheetHeader>
          <SheetTitle>
            {operation == "create" ? "Create" : "Edit"} Pesanan
          </SheetTitle>
          <SheetDescription>
            {operation == "create"
              ? "With this UI, you can add your task"
              : "Make changes to your task here"}
            . Click {operation} when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" value="Task A" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input id="description" value="My Task A" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">
              {operation === "create" ? "Create" : "Edit"}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
