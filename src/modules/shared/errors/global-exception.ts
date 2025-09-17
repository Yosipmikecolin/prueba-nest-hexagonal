import {
  Catch,
  ExceptionFilter,
  ConflictException,
  InternalServerErrorException,
  ArgumentsHost,
  NotFoundException,
} from '@nestjs/common';
import { DomainError } from 'src/modules/shared/errors/base.error';
import {
  ExistingTitleError,
  TaskNotDeleteError,
  TaskNotFoundError,
  UserNotFoundError,
} from 'src/modules/tasks/domain/errors';
import { ExistingUserError } from 'src/modules/users/domain/errors';

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    //? ERRORES DE USUARIOS
    if (exception instanceof ExistingUserError) {
      throw new ConflictException(exception.message);

      //? ERRORES DE TAREAS
    } else if (exception instanceof UserNotFoundError) {
      throw new NotFoundException(exception.message);
    } else if (exception instanceof ExistingTitleError) {
      throw new ConflictException(exception.message);
    } else if (exception instanceof TaskNotFoundError) {
      throw new NotFoundException(exception.message);
    } else if (exception instanceof TaskNotDeleteError) {
      throw new NotFoundException(exception.message);
    }

    throw new InternalServerErrorException('Unexpected domain error');
  }
}
