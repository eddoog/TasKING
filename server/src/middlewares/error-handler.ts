import { type ApiError } from '@/lib/errors'
import { HttpStatusCode } from 'axios'
import { type NextFunction, type Request, type Response } from 'express'

interface ErrorBody {
  success: false
  message: string
  rawErrors?: string[]
  stack?: string
}

const errorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const status: number = err.statusCode ?? HttpStatusCode.InternalServerError
  const errorBody: ErrorBody = {
    success: false,
    message: err.message,
    rawErrors: err.rawErrors,
  }

  res.status(status).send(errorBody)

  next()
}

export { errorHandler }
