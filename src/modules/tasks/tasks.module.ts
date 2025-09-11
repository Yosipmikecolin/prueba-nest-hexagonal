import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskSchema } from './infrastructure/persistence/task.schema';
import { TaskRepositoryImpl } from './infrastructure/persistence/task.repository.impl';
import { TaskController } from './infrastructure/controllers/task.controller';
import { CreateTaskUseCase } from './aplication/create-task.usecase';
import { UpdateTaskStatusUseCase } from './aplication/update-task-status.usecase';
import { DeleteTaskUseCase } from './aplication/delete-task.usecase';
import { ListTasksUseCase } from './aplication/list-tasks.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([TaskSchema])],
  controllers: [TaskController],
  providers: [
    TaskRepositoryImpl,
    {
      provide: CreateTaskUseCase,
      useFactory: (repo: TaskRepositoryImpl) => new CreateTaskUseCase(repo),
      inject: [TaskRepositoryImpl],
    },
    {
      provide: UpdateTaskStatusUseCase,
      useFactory: (repo: TaskRepositoryImpl) =>
        new UpdateTaskStatusUseCase(repo),
      inject: [TaskRepositoryImpl],
    },
    {
      provide: DeleteTaskUseCase,
      useFactory: (repo: TaskRepositoryImpl) => new DeleteTaskUseCase(repo),
      inject: [TaskRepositoryImpl],
    },
    {
      provide: ListTasksUseCase,
      useFactory: (repo: TaskRepositoryImpl) => new ListTasksUseCase(repo),
      inject: [TaskRepositoryImpl],
    },
  ],
})
export class TasksModule {}
