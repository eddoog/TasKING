import React from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"

export default function TaskDelete({
  children,
  onClick,
}: React.PropsWithChildren<{
  children: React.ReactNode
  onClick?: () => void
}>) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center">
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your task
            and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-task-background border-2 border-solid border-sidebar-link">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onClick}
            className="bg-destructive border-2 border-solid border-sidebar-link"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
