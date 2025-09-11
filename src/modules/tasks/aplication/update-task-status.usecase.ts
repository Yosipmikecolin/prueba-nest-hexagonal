import { TaskStatus } from '../domain/task.entity';
import { TaskRepository } from '../domain/task.repository';




export class UpdateTaskStatusUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(input: { id: string; status: TaskStatus }) {
    return await this.taskRepository.updateStatus(input.id, input.status);
  }
}
