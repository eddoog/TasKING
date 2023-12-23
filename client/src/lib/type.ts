export type User = {
  id: string
  email: string
  name: string
}

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
  COMPLETED = "COMPLETED",
}

export enum ActiveTab {
  ALL_TASKS = "All Tasks",
  INCOMPLETE = TaskStatus.INCOMPLETE,
  COMPLETED = TaskStatus.COMPLETED,
}
