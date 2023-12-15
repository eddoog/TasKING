import { type User } from '@prisma/client'
import prisma from '../../lib/prisma'

export default class UserService {
  public async createUser(data: User) {
    const user = await prisma.user.create({ data })
    return user
  }
}
