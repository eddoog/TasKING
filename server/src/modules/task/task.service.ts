import { CreateTaskDTO, UpdateTaskDTO } from '@/dto'
import { HttpBadRequestError, prisma } from '@/lib'

export default class TaskService {
  public async getAll(userId: string) {
    const task = await prisma.task.findMany({
      where: {
        userId,
      },
    })

    if (!task) {
      throw new HttpBadRequestError('Task not found')
    }

    return task
  }

  public async get(taskId: string, userId: string) {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
        userId: userId,
      },
    })

    if (!task) {
      throw new HttpBadRequestError('Task not found')
    }

    return task
  }

  public async create(dto: CreateTaskDTO, userId: string) {
    const { name, description, dueDate } = dto

    this.validateDTO(dto)

    const task = await prisma.task.create({
      data: {
        name,
        description,
        ...(dto.status && { status: dto.status }),
        dueDate,
        userId,
      },
    })

    if (!task) {
      throw new HttpBadRequestError('Task not created')
    }

    return task
  }

  public async update(dto: UpdateTaskDTO, taskId: string, userId: string) {
    const { ...data } = dto

    this.validateDTO(dto)

    await this.getTask(taskId)

    const task = await prisma.task.update({
      data: {
        ...data,
      },
      where: {
        id: taskId,
        userId,
      },
    })

    if (!task) {
      throw new HttpBadRequestError('Task not updated')
    }

    return task
  }

  public async delete(taskId: string, userId: string) {
    await this.getTask(taskId)

    const task = await prisma.task.delete({
      where: {
        id: taskId,
        userId,
      },
    })

    if (!task) {
      throw new HttpBadRequestError('Task not deleted')
    }

    return task
  }

  private async getTask(taskId: string) {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    })

    if (!task) {
      throw new HttpBadRequestError('Task not found')
    }

    return
  }

  private validateDTO(dto: CreateTaskDTO | UpdateTaskDTO) {
    const { description } = dto

    if (description && description.length < 3) {
      throw new HttpBadRequestError(
        'Description must be at least 3 characters long'
      )
    }
  }
}
