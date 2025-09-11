import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { TaskStatus } from '../../domain/task.entity';

export class ListTaskDto {
  @IsUUID()
  userId: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;
}
