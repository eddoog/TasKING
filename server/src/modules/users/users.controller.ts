import { User } from '@prisma/client'
import { type NextFunction, type Request } from 'express'
import UserService from './users.service'
import Api from '../../lib/api'
import { HttpStatusCode } from 'axios'
import { CustomRequest, CustomResponse } from '@/types'

export default class UserController extends Api {
  private readonly userService = new UserService()

  public getUser = async (
    req: CustomRequest,
    res: CustomResponse<User>,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.getUser(req.auth.id)

      return this.send(
        res,
        user,
        HttpStatusCode.Ok,
        'User fetched successfully'
      )
    } catch (error) {
      next(error)
    }
  }
}
