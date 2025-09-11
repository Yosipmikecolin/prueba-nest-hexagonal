import { ConflictException, Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/create-user.usecase';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly createUser: CreateUserUseCase) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    try {
      return await this.createUser.execute(dto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
