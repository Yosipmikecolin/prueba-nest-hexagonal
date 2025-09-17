import { TaskRepository } from '../domain/task.repository';
import { TaskNotDeleteError, TaskNotFoundError } from '../domain/errors';

export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(id: string) {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new TaskNotFoundError(id);
    }

    if (task.isDeleted) {
      throw new TaskNotDeleteError();
    }

    await this.taskRepository.softDelete(id);
  }
}
