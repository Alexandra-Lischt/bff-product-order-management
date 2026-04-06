import {
  Injectable,
  Inject,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IUserRepository } from './repository/user.repository';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './dto/user-response.dto';
import { UserMapper } from './common/user.mapper';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(IUserRepository)
    private readonly repository: IUserRepository,
  ) {}

  async create(user: User): Promise<UserResponseDto> {
    const userExists = await this.repository.findByEmail(user.email);

    if (userExists) {
      throw new UnprocessableEntityException('User already exists.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const savedUser = await this.repository.create({
      ...user,
      password: hashedPassword,
    });

    return UserMapper.toResponse(savedUser);
  }
}
