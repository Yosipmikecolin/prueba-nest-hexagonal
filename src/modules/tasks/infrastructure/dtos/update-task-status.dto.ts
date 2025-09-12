import { IsEnum } from 'class-validator';
import { TaskStatus } from '../../domain/task.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskStatusDto {
  @ApiProperty({
    enum: TaskStatus,
    example: TaskStatus.IN_PROGRESS,
    description: 'Estado actual de la tarea',
    required: true,
  })
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
