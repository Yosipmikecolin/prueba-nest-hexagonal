import { TaskStatus } from '../../domain/task.entity';

export class ListTaskDto {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: Date;
  userId: string;
}
