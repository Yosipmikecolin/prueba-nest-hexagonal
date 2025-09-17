import { TaskStatus } from '../domain/task.entity';
import { TaskRepository } from '../domain/task.repository';
import { TaskNotDeleteError } from '../domain/errors';

export class UpdateTaskStatusUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(input: { id: string; status: TaskStatus }) {
    const task = await this.taskRepository.updateStatus(input.id, input.status);
    if (!task) {
      throw new TaskNotDeleteError();
    } else {
      return task;
    }
  }
}
