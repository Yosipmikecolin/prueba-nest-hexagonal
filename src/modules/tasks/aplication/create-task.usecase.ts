import { Task, TaskStatus } from '../domain/task.entity';
import { TaskRepository } from '../domain/task.repository';

interface Input {
  title: string;
  description: string;
  dueDate: Date;
  userId: string;
}

export class CreateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(input: Input) {
    const task = new Task(
      input.title,
      input.description,
      TaskStatus.PENDING,
      input.dueDate,
      input.userId,
    );

    return await this.taskRepository.save(task);
  }
}
