import { secret } from '@/config'
import { LoginDTO, RegisterDTO } from '@/dto'
import { compare, prisma, hash, HttpBadRequestError } from '@/lib'
import jwt from 'jsonwebtoken'

export default class AuthService {
  public async login(dto: LoginDTO) {
    const { email, password } = dto

    const user = await this.userExists(email)

    if (!user) {
      throw new HttpBadRequestError('User not found')
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new HttpBadRequestError('Invalid password')
    }

    return this.generateToken(user.id)
  }

  public async register(dto: RegisterDTO) {
    const { email, name, password } = dto

    const userExists = await this.userExists(email)

    if (userExists) {
      throw new HttpBadRequestError('User already exists')
    }

    const hashedPassword = await hash(password)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    })

    if (!user) {
      throw new HttpBadRequestError('Failed to create user')
    }

    return this.generateToken(user.id)
  }

  private async userExists(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  private async generateToken(userId: string) {
    const token = jwt.sign({ id: userId }, secret(), {
      expiresIn: '60m',
    })

    return token
  }
}
