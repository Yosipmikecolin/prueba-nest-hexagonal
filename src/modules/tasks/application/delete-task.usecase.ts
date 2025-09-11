import { NotFoundException } from '@nestjs/common';
import { TaskRepository } from '../domain/task.repository';

export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(id: string) {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (task.isDeleted) {
      throw new NotFoundException('The task is already deleted');
    }

    await this.taskRepository.softDelete(id);
  }
}
