import { DomainError } from 'src/modules/shared/errors/base.error';

export class TaskNotFoundError extends DomainError {
  constructor(idTask: string) {
    super(`Task with ID ${idTask} not found`);
  }
}
