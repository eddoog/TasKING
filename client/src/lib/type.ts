export type Task = {
  id: string
  name: string
  description: string
  status: TaskStatus
  dueDate: Date
  createdAt: Date
  updatedAt: Date
}

export enum TaskStatus {
  INCOMPLETE = "INCOMPLETE",
  COMPLETE = "COMPLETE",
}

export const tasks: Task[] = [
  {
    id: "1",
    name: "Update Password",
    description:
      "Update password for all accounts. Use a password manager to generate a strong password.",
    status: TaskStatus.INCOMPLETE,
    dueDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Buy Groceries",
    description:
      "Buy groceries for the week. Make sure to buy lots of fruits and vegetables.",
    status: TaskStatus.INCOMPLETE,
    dueDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Finish Homework",
    description:
      "Finish homework for all classes. Make sure to study for the upcoming test.",
    status: TaskStatus.COMPLETE,
    dueDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Go to the Gym",
    description:
      "Go to the gym and do a full body workout. Make sure to eat a protein rich meal after.",
    status: TaskStatus.COMPLETE,
    dueDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
