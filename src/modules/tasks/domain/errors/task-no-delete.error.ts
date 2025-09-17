import { DomainError } from 'src/modules/shared/errors/base.error';

export class TaskNotDeleteError extends DomainError {
  constructor() {
    super('The task is already deleted');
  }
}
