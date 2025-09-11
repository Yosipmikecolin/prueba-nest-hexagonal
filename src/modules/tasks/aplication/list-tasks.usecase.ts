import { TaskStatus } from '../domain/task.entity';
import { TaskRepository } from '../domain/task.repository';

export class ListTasksUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(input: { userId: string; status?: TaskStatus }) {
    return await this.taskRepository.findByUser(input.userId, input.status);
  }
}
