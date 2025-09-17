import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/create-user.usecase';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly createUser: CreateUserUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({
    status: 201,
    example: {
      email: 'john@example.com',
      name: 'John Doe',
      createdAt: '2025-09-12T15:40:02.993Z',
    },
  })
  @ApiResponse({
    status: 409,
    example: {
      message: 'User with this email already exists',
      error: 'Conflict',
      statusCode: 409,
    },
  })
  async create(@Body() dto: CreateUserDto) {
    return await this.createUser.execute(dto);
  }
}
