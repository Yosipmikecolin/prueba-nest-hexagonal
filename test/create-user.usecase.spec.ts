// test/create-user.usecase.spec.ts
import { CreateUserUseCase } from 'src/modules/users/application/create-user.usecase';
import { UserRepository } from 'src/modules/users/domain/user.repository';
import { User } from 'src/modules/users/domain/user.entity';

//? AGRUPAMOS TODOS LOS TEST BAJO EL NOMBRE DE "CreateUserUseCase"
describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let userRepo: jest.Mocked<UserRepository>;

  //? ESTE BLOQUE SE EJECUTA ANTES DE CADA PRUEBA
  beforeEach(() => {
    userRepo = {
      findByEmail: jest.fn(),
      save: jest.fn(),
    } as any;

    useCase = new CreateUserUseCase(userRepo);
  });

  //? PRUEBA 1: VALIDA SI YA EXISTE EL EMAIL
  it('should throw error if email already exists', async () => {
    userRepo.findByEmail.mockResolvedValue(new User('test@test.com', 'Test'));

    await expect(
      useCase.execute({ email: 'test@test.com', name: 'Test' }),
    ).rejects.toThrow('User with this email already exists');
  });

  //? PRUEBA 2: VALIDA LA CREACIÓN EXITOSA DEL USUARIO
  it('should create user successfully', async () => {
    userRepo.findByEmail.mockResolvedValue(null);

    const newUser = new User('test@test.com', 'Test');
    userRepo.save.mockResolvedValue(newUser);

    const result = await useCase.execute({
      email: 'test@test.com',
      name: 'Test',
    });

    expect(result).toEqual(newUser);
    expect(userRepo.save).toHaveBeenCalledWith(expect.any(User));
  });
});
