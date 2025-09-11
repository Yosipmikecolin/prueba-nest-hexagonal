import { TaskRepository } from '../domain/task.repository';

export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(id: string) {
    await this.taskRepository.softDelete(id);
  }
}
