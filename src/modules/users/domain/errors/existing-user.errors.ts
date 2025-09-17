import { DomainError } from 'src/modules/shared/errors/base.error';

export class ExistingUserError extends DomainError {
  constructor(userId: string) {
    super(`User with ${userId} existing`);
  }
}
