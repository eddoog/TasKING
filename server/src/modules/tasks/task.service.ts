import { HttpBadRequestError, prisma } from '@/lib'

export default class TaskService {
  public async get(userId: string) {
    const task = await prisma.task.findMany({
      where: {
        id: userId,
      },
    })

    if (!task) {
      throw new HttpBadRequestError('Task not found')
    }

    return task
  }
}
