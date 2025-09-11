import { Task, TaskStatus } from './task.entity';

export interface TaskRepository {
  save(task: Task): Promise<Task>;
  findByUser(userId: string, status?: TaskStatus): Promise<Task[]>;
  updateStatus(id: string, status: TaskStatus): Promise<Task | null>;
  findTitle(id: string, userId: string): Promise<Task | null>;
  findById(id: string): Promise<Task | null>;
  softDelete(id: string): Promise<void>;
}
