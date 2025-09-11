import { UserRepository } from 'src/modules/users/domain/user.repository';
import { Task, TaskStatus } from '../domain/task.entity';
import { TaskRepository } from '../domain/task.repository';
import { NotFoundException } from '@nestjs/common';

interface Input {
  title: string;
  description: string;
  dueDate: Date;
  userId: string;
}

export class CreateTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: Input) {
    const user = await this.userRepository.findById(input.userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${input.userId} not found`);
    }

    const existing = await this.taskRepository.findTitle(
      input.title,
      input.userId,
    );
    if (existing) {
      throw new Error('There is already a task with that title');
    }

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
