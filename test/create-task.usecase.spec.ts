// test/create-task.usecase.spec.ts
import { TaskRepository } from '../src/modules/tasks/domain/task.repository';
import { UserRepository } from '../src/modules/users/domain/user.repository';
import { Task, TaskStatus } from '../src/modules/tasks/domain/task.entity';
import { User } from '../src/modules/users/domain/user.entity';
import { CreateTaskUseCase } from 'src/modules/tasks/application/create-task.usecase';

//? AGRUPAMOS TODOS LOS TEST BAJO EL NOMBRE DE "CreateTaskUseCase"
describe('CreateTaskUseCase', () => {
  let useCase: CreateTaskUseCase;
  let taskRepo: jest.Mocked<TaskRepository>;
  let userRepo: jest.Mocked<UserRepository>;

  //? ESTE BLOQUE SE EJECUTA ANTES DE CADA PRUEBA
  beforeEach(() => {
    taskRepo = {
      findTitle: jest.fn(),
      save: jest.fn(),
      findByUser: jest.fn(),
    } as any;

    userRepo = {
      findById: jest.fn(),
    } as any;

    useCase = new CreateTaskUseCase(taskRepo, userRepo);
  });

  //? PRUEBA 1: VALIDA SI EL USUARIO NO EXISTE
  it('should throw error if user does not exist', async () => {
    userRepo.findById.mockResolvedValue(null);

    await expect(
      useCase.execute({
        title: 'Nueva tarea',
        description: 'desc',
        dueDate: new Date(),
        userId: 'fake-user',
      }),
    ).rejects.toThrow('User with ID fake-user not found');
  });

  //? PRUEBA 2: VALIDA EL TÍTULO DUPLICADO
  it('should throw error if task title already exists for user', async () => {
    userRepo.findById.mockResolvedValue(new User('test@test.com', 'Test'));
    taskRepo.findTitle.mockResolvedValue(
      new Task('Nueva tarea', 'desc', TaskStatus.PENDING, new Date(), '1'),
    );

    await expect(
      useCase.execute({
        title: 'Nueva tarea',
        description: 'desc',
        dueDate: new Date(),
        userId: '1',
      }),
    ).rejects.toThrow('There is already a task with that title');
  });

  //? PRUEBA 3: VALIDA LA CREACIÓN EXITOSA DE LA TAREA
  it('should create task successfully', async () => {
    userRepo.findById.mockResolvedValue(new User('test@test.com', 'Test'));
    taskRepo.findTitle.mockResolvedValue(null);

    const mockTask = new Task(
      'Nueva tarea',
      'desc',
      TaskStatus.PENDING,
      new Date(),
      '1',
    );
    taskRepo.save.mockResolvedValue(mockTask);

    const result = await useCase.execute({
      title: 'Nueva tarea',
      description: 'desc',
      dueDate: new Date(),
      userId: '1',
    });

    expect(result).toEqual(mockTask);
    expect(taskRepo.save).toHaveBeenCalled();
  });
});
