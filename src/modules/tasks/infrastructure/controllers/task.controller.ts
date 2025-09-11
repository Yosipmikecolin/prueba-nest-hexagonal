import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { TaskStatus } from '../../domain/task.entity';
import { UpdateTaskStatusDto } from '../dtos/update-task-status.dto';
import { ListTasksUseCase } from '../../aplication/list-tasks.usecase';
import { DeleteTaskUseCase } from '../../aplication/delete-task.usecase';
import { UpdateTaskStatusUseCase } from '../../aplication/update-task-status.usecase';
import { CreateTaskUseCase } from '../../aplication/create-task.usecase';

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
    return await this.createTask.execute(dto);
  }

  @Get()
  async list(
    @Query('userId') userId: string,
    @Query('status') status?: TaskStatus,
  ) {
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
