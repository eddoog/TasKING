import { Router } from 'express'
import Controller from '../auth/auth.controller'
import { LoginDTO, RegisterDTO } from '../../dto'
import RequestValidator from '../../middlewares/request-validator'

const auth: Router = Router()
const controller = new Controller()

auth.post('/login', RequestValidator.validate(LoginDTO), controller.login)
auth.post(
  '/register',
  RequestValidator.validate(RegisterDTO),
  controller.register
)

export default auth
