import {
  IsUUID,
  IsDateString,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { IsFutureDate } from '../validators/future-date.validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(10)
  title: string;

  @IsString()
  @MinLength(5)
  description: string;

  @IsDateString()
  @Validate(IsFutureDate)
  dueDate: Date;

  @IsUUID()
  userId: string;
}
