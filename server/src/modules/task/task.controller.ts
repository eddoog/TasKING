import Api from '@/lib/api'
import TaskService from './task.service'
import { CustomRequest, CustomResponse } from '@/types'
import { NextFunction } from 'express'
import { Task } from '@prisma/client'
import { HttpStatusCode } from 'axios'

export default class TaskControler extends Api {
  private readonly taskService = new TaskService()

  public getTasks = async (
    req: CustomRequest,
    res: CustomResponse<Task>,
    next: NextFunction
  ) => {
    try {
      const userId = req.auth.id

      const user = await this.taskService.getAll(userId)

      this.send(res, user, HttpStatusCode.Ok, 'Task fetched successfully')
    } catch (error) {
      next(error)
    }
  }

  public getTaskByID = async (
    req: CustomRequest,
    res: CustomResponse<Task>,
    next: NextFunction
  ) => {
    try {
      const taskId = req.params.taskId

      const userId = req.auth.id

      const user = await this.taskService.get(taskId, userId)

      this.send(res, user, HttpStatusCode.Ok, 'Task fetched successfully')
    } catch (error) {
      next(error)
    }
  }

  public createTask = async (
    req: CustomRequest,
    res: CustomResponse<Task>,
    next: NextFunction
  ) => {
    try {
      const userId = req.auth.id

      const user = await this.taskService.create(req.body, userId)

      this.send(res, user, HttpStatusCode.Created, 'Task created successfully')
    } catch (error) {
      next(error)
    }
  }

  public updateTask = async (
    req: CustomRequest,
    res: CustomResponse<Task>,
    next: NextFunction
  ) => {
    try {
      const taskId = req.params.taskId

      const userId = req.auth.id

      const user = await this.taskService.update(req.body, taskId, userId)

      this.send(res, user, HttpStatusCode.Ok, 'Task updated successfully')
    } catch (error) {
      next(error)
    }
  }

  public deleteTask = async (
    req: CustomRequest,
    res: CustomResponse<Task>,
    next: NextFunction
  ) => {
    try {
      const taskId = req.params.taskId

      const userId = req.auth.id

      const user = await this.taskService.delete(taskId, userId)

      this.send(
        res,
        user,
        HttpStatusCode.NoContent,
        'Task deleted successfully'
      )
    } catch (error) {
      next(error)
    }
  }
}
