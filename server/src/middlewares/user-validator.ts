import { prisma } from '@/lib'
import { CustomRequest } from '@/types'
import { NextFunction, Response } from 'express'
import { unless } from 'express-unless'

const userValidator = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.auth || !req.auth.id) {
    res.status(401).send('Unauthorized').end()
    return
  }

  const user = await prisma.user.findUnique({
    where: {
      id: req.auth.id,
    },
  })

  if (!user) {
    res.status(401).send('Unauthorized, user not found.').end()

    return
  }

  return next()
}

userValidator.unless = unless

export { userValidator }
