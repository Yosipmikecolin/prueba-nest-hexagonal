import { Repository } from 'typeorm';
import { TaskRepository } from '../../domain/task.repository';
import { TaskSchema } from './task.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskStatus } from '../../domain/task.entity';

export class TaskRepositoryImpl implements TaskRepository {
  constructor(
    @InjectRepository(TaskSchema)
    private readonly ormRepo: Repository<TaskSchema>,
  ) {}

  async save(task: Task): Promise<Task> {
    const entity = this.ormRepo.create(task);
    await this.ormRepo.save(entity);
    return task;
  }

  async findByUser(userId: string, status?: TaskStatus): Promise<Task[]> {
    const qb = this.ormRepo
      .createQueryBuilder('task')
      .where('task.userId = :userId', { userId });

    if (status) {
      qb.andWhere('task.status = :status', { status });
    }

    const tasks = await qb.getMany();
    return tasks.map(
      (t) =>
        new Task(
          t.title,
          t.description,
          t.status,
          t.dueDate,
          t.userId,
          t.isDelete,
        ),
    );
  }

  async updateStatus(id: string, status: TaskStatus): Promise<Task | null> {
    const task = await this.ormRepo.findOne({ where: { id, isDelete: false } });

    if (!task) {
      return null;
    } else {
      task.status = status;
      const updated = await this.ormRepo.save(task);
      return new Task(
        updated.title,
        updated.description,
        updated.status,
        updated.dueDate,
        updated.userId,
        updated.isDelete,
      );
    }
  }

  async softDelete(id: string): Promise<void> {
    await this.ormRepo.update({ id }, { isDelete: true });
  }
}
