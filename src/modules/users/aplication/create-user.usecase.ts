import { User } from '../domain/user.entity';
import { UserRepository } from '../domain/user.repository';
import { v4 as uuid } from 'uuid';

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: { email: string; name: string }): Promise<User> {
    const existing = await this.userRepository.findByEmail(input.email);
    if (existing) {
      throw new Error('User with this email already exists');
    } else {
      const user = new User(uuid(), input.email, input.name);
      return await this.userRepository.save(user);
    }
  }
}
