import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
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

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createTask: CreateTaskUseCase,
    private readonly updateStatus: UpdateTaskStatusUseCase,
    private readonly deleteTask: DeleteTaskUseCase,
    private readonly listTasks: ListTasksUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateTaskDto) {
    try {
      return await this.createTask.execute(dto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Get()
  async list(@Query() query: ListTaskDto) {
    const { userId, status } = query;
    return await this.listTasks.execute({ userId, status });
  }

  @Patch(':id/status')
  async update(@Param('id') id: string, @Body() dto: UpdateTaskStatusDto) {
    return await this.updateStatus.execute({ id, status: dto.status });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deleteTask.execute(id);
  }
}
