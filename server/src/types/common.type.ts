import { type Response, type Request } from 'express'

type Send<ResBody = any, T = Response<ResBody>> = (body?: {
  message: string
  data: ResBody
}) => T

export interface CustomResponse<T> extends Response {
  json: Send<T, this>
}

export interface CustomRequest extends Request {
  auth: {
    id: string
    iat: number
    exp: number
  }
}
