import { DomainError } from 'src/modules/shared/errors/base.error';

export class UserNotFoundError extends DomainError {
  constructor(userId: string) {
    super(`User with ID ${userId} not found`);
  }
}
