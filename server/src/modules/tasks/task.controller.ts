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

      const user = await this.taskService.get(userId)

      this.send(res, user, HttpStatusCode.Ok, 'Task fetched successfully')
    } catch (error) {
      next(error)
    }
  }
}
