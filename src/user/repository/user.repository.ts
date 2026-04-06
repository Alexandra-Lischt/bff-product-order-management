import { User } from '../entity/user.entity';

export abstract class IUserRepository {
  abstract create(user: User): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
}
