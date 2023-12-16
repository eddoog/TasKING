import { secret } from '@/config'
import { expressjwt } from 'express-jwt'

function jwt() {
  return expressjwt({ secret: secret(), algorithms: ['HS256'] }).unless({
    path: [
      // public routes that don't require authentication
      '/auth/login',
      '/auth/register',
    ],
  })
}

export { jwt }
