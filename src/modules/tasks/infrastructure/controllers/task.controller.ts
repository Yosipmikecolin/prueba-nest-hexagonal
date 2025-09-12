import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskStatusDto } from '../dtos/update-task-status.dto';
import { ListTasksUseCase } from '../../application/list-tasks.usecase';
import { DeleteTaskUseCase } from '../../application/delete-task.usecase';
import { UpdateTaskStatusUseCase } from '../../application/update-task-status.usecase';
import { CreateTaskUseCase } from '../../application/create-task.usecase';
import { ListTaskDto } from '../dtos/list-task.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createTask: CreateTaskUseCase,
    private readonly updateStatus: UpdateTaskStatusUseCase,
    private readonly deleteTask: DeleteTaskUseCase,
    private readonly listTasks: ListTasksUseCase,
  ) {}

  @ApiOperation({ summary: 'Crear una nueva tarea' })
  @ApiResponse({
    status: 201,
    example: {
      title: 'Sacar al perro',
      description: 'Llevar a Firulais al parque',
      status: 'PENDING',
      dueDate: '2025-09-12',
      userId: '0ae642f7-12ad-4fdc-8837-da7eadae48ad',
      isDeleted: false,
    },
  })
  @ApiResponse({
    status: 409,
    example: {
      message: 'There is already a task with that title',
      error: 'Conflict',
      statusCode: 409,
    },
  })
  @Post()
  async create(@Body() dto: CreateTaskDto) {
    try {
      return await this.createTask.execute(dto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @ApiOperation({ summary: 'Obtener todas las tareas' })
  @ApiResponse({
    status: 200,
    example: [
      {
        id: '64556143-188e-4af8-86e3-613edc7ff645',
        title: 'Sacar al perro 1',
        description: 'Descripción 1',
        status: 'PENDING',
        dueDate: '2025-09-05',
        userId: '4efd541c-4bbc-4cc6-bb11-58e0d92fb065',
        isDeleted: false,
      },
    ],
  })
  @Get()
  async list(@Query() query: ListTaskDto) {
    const { userId, status } = query;
    return await this.listTasks.execute({ userId, status });
  }

  @ApiOperation({ summary: 'Actualizar estado de una tarea' })
  @ApiResponse({
    status: 200,
    example: {
      title: 'Sacar al perro',
      description: 'Llevarle comida',
      status: 'IN_PROGRESS',
      dueDate: '2025-09-05',
      userId: '4efd541c-4bbc-4cc6-bb11-58e0d92fb065',
      isDeleted: false,
    },
  })
  @ApiResponse({
    status: 400,
    example: {
      message: 'This task is deleted',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @Patch(':id/status')
  async update(@Param('id') id: string, @Body() dto: UpdateTaskStatusDto) {
    return await this.updateStatus.execute({ id, status: dto.status });
  }

  @ApiOperation({
    summary: 'Eliminar una tarea',
  })
  @ApiResponse({
    status: 204,
    description: 'Tarea eliminada con éxito',
  })
  @ApiResponse({
    status: 409,
    example: {
      message: 'The task is already deleted',
      error: 'Conflict',
      statusCode: 409,
    },
  })
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.deleteTask.execute(id);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
