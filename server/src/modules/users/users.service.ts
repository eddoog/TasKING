import { prisma } from '../../lib'

export default class UserService {
  public async getUser(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }
}
