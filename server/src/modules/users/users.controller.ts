import { CustomResponse } from '@/types/common.type'
import { User } from '@prisma/client'
import { type NextFunction, type Request } from 'express'
import UserService from './users.service'
import Api from '../../lib/api'
import { HttpStatusCode } from 'axios'

export default class UserController extends Api {
  private readonly userService = new UserService()

  public createUser = async (
    req: Request,
    res: CustomResponse<User>,
    next: NextFunction
  ) => {
    try {
      const user = this.userService.createUser(req.body)

      return this.send(
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
