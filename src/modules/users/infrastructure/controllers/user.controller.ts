import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../aplication/create-user.usecase';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly createUser: CreateUserUseCase) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.createUser.execute(dto);
  }
}
