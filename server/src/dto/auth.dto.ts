import { Transform, TransformFnParams } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

class LoginDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}

class RegisterDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => {
    return value && typeof value === 'string' && value?.trim()
  })
  name: string

  @IsNotEmpty()
  @IsString()
  password: string
}

export { LoginDTO, RegisterDTO }
