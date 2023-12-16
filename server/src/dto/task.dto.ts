import { Transform, TransformFnParams } from 'class-transformer'
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator'

class CreateTaskDTO {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => {
    return value && typeof value === 'string' && value?.trim()
  })
  name: string

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => {
    return value && typeof value === 'string' && value?.trim()
  })
  description: string

  @IsNotEmpty()
  @IsDateString()
  dueDate: Date
}

class UpdateTaskDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => {
    return value && typeof value === 'string' && value?.trim()
  })
  name?: string

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => {
    return value && typeof value === 'string' && value?.trim()
  })
  description?: string

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  dueDate?: Date
}

export { CreateTaskDTO, UpdateTaskDTO }
