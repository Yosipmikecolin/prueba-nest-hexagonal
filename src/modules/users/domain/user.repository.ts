import { User } from './user.entity';

export interface UserRepository {
  save(user: User): Promise<User>;
  findById(idUser: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
