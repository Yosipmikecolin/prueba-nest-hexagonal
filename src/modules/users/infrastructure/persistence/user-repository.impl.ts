import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../domain/user.entity';
import { UserRepository } from '../../domain/user.repository';
import { UserSchema } from './user.schema';
import { Repository } from 'typeorm';

export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserSchema)
    private readonly ormRepo: Repository<UserSchema>,
  ) {}

  async save(user: User): Promise<User> {
    const entity = this.ormRepo.create(user);
    const saved = await this.ormRepo.save(entity);
    return new User(saved.id, saved.email, saved.name, saved.createdAt);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.ormRepo.findOne({ where: { email } });
    return user;
  }

  async findById(idUser: string): Promise<User | null> {
    const user = await this.ormRepo.findOne({ where: { id: idUser } });
    return user;
  }
}
