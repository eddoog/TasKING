import { Transform, TransformFnParams } from 'class-transformer'
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

enum TaskStatus {
  INCOMPLETE = 'INCOMPLETE',
  COMPLETED = 'COMPLETED',
}

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

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status?: TaskStatus
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

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status?: TaskStatus
}

export { CreateTaskDTO, UpdateTaskDTO }
