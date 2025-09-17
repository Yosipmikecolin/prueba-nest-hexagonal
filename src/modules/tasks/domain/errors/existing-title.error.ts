import { DomainError } from 'src/modules/shared/errors/base.error';

export class ExistingTitleError extends DomainError {
  constructor() {
    super('There is already a task with that title');
  }
}
