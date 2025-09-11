import { BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../domain/task.entity';
import { TaskRepository } from '../domain/task.repository';

export class UpdateTaskStatusUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(input: { id: string; status: TaskStatus }) {
    const task = await this.taskRepository.updateStatus(input.id, input.status);
    if (!task) {
      throw new BadRequestException('This task is deleted');
    } else {
      return task;
    }
  }
}
