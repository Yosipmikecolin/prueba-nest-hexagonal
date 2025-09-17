import {
  Catch,
  ExceptionFilter,
  ConflictException,
  InternalServerErrorException,
  ArgumentsHost,
} from '@nestjs/common';
import { DomainError } from 'src/modules/shared/errors/base.error';
import { ExistingUserError } from 'src/modules/users/domain/errors';

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    if (exception instanceof ExistingUserError) {
      throw new ConflictException(exception.message);
    }

    throw new InternalServerErrorException('Unexpected domain error');
  }
}
