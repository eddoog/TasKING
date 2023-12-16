import { Router } from 'express'
import Controller from './task.controller'
import { RequestValidator } from '@/middlewares'
import { CreateTaskDTO, UpdateTaskDTO } from '@/dto'

const task: Router = Router()
const controller = new Controller()

task.get('/', controller.getTasks)
task.get('/:taskId', controller.getTaskByID)
task.post(
  '/create/:taskId',
  RequestValidator.validate(CreateTaskDTO),
  controller.createTask
)
task.patch(
  '/update/:taskId',
  RequestValidator.validate(UpdateTaskDTO),
  controller.updateTask
)
task.delete('/delete/:taskId', controller.deleteTask)

export default task
