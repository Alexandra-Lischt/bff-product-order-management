import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { IUserRepository } from './repository/user.repository';
import { UserTypeOrmRepository } from './repository/user-typeorm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: IUserRepository,
      useClass: UserTypeOrmRepository,
    },
  ],
  exports: [UserService, IUserRepository],
})
export class UserModule {}
