import { HttpBadRequestError, prisma } from '@/lib'
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
      id: 'blablabla',
    },
  })

  if (!user) {
    const err = new HttpBadRequestError('Unauthorized, user not found')

    next(err)
  }

  return next()
}

userValidator.unless = unless

export { userValidator }
