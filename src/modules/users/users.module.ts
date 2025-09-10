import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './infrastructure/persistence/user.schema';
import { UserController } from './infrastructure/controllers/user.controller';
import { UserRepositoryImpl } from './infrastructure/persistence/user-repository.impl';
import { CreateUserUseCase } from './aplication/create-user.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [UserController],
  providers: [
    UserRepositoryImpl,
    {
      provide: CreateUserUseCase,
      useFactory: (repo: UserRepositoryImpl) => new CreateUserUseCase(repo),
      inject: [UserRepositoryImpl],
    },
  ],
})
export class UsersModule {}
