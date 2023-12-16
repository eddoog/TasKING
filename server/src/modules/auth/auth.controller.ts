import { CustomResponse } from '@/types/common.type'
import { User } from '@prisma/client'
import { HttpStatusCode } from 'axios'
import { type NextFunction, type Request } from 'express'
import Api from '../../lib/api'
import AuthService from './auth.service'

export default class AuthController extends Api {
  private readonly authService = new AuthService()

  public login = async (
    req: Request,
    res: CustomResponse<User>,
    next: NextFunction
  ) => {
    try {
      const user = await this.authService.login(req.body)

      this.send(
        res,
        user,
        HttpStatusCode.Ok,
        'You have been logged in successfully'
      )
    } catch (error) {
      next(error)
    }
  }

  public register = async (
    req: Request,
    res: CustomResponse<User>,
    next: NextFunction
  ) => {
    try {
      const user = await this.authService.register(req.body)

      this.send(
        res,
        user,
        HttpStatusCode.Created,
        'User has been created successfully'
      )
    } catch (error) {
      next(error)
    }
  }
}
