import { IsNotEmpty, IsUUID, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsDateString()
  dueDate: Date;

  @IsUUID()
  userId: string;
}
