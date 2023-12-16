import { Router } from 'express'
import Controller from './task.controller'

const tasks: Router = Router()
const controller = new Controller()

tasks.get('/', controller.getTasks)

export default tasks
