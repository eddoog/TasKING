import { Router } from 'express'
import Controller from './users.controller'

const users: Router = Router()
const controller = new Controller()

users.get('/', controller.getUser)

export default users
