import { ExistingUserError } from '../domain/errors/existing-user.errors';
import { User } from '../domain/user.entity';
import { UserRepository } from '../domain/user.repository';

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: { email: string; name: string }): Promise<User> {
    const existing = await this.userRepository.findByEmail(input.email);
    if (existing) {
      throw new ExistingUserError(existing.email);
    } else {
      const user = new User(input.email, input.name);
      return await this.userRepository.save(user);
    }
  }
}
