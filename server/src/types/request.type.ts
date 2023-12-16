export interface RequestJwtPayload extends Request {
  auth: {
    id: string
    iat: number
    exp: number
  }
}
