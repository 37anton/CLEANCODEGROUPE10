import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { UserController } from '../../application/controllers/user.controller';
import { UserService } from '../../application/services/user.service';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { FindUserByEmailUseCase } from '../../application/use-cases/find-user-by-email.use-case';
import { FindUserByIdUseCase } from '../../application/use-cases/find-user-by-id.use-case';
import { UserSqlRepository } from '../repositories/sql/user.repository.sql';
import { UserInMemoryRepository } from '../repositories/in-memory/user.repository.in-memory';
import { USER_REPOSITORY } from '../repositories/user.repository';

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [
    ...(!isInMemory ? [TypeOrmModule.forFeature([User])] : []),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    CreateUserUseCase,
    FindUserByEmailUseCase,
    FindUserByIdUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: isInMemory ? UserInMemoryRepository : UserSqlRepository,
    },
  ],
  exports: [
    UserService, 
    USER_REPOSITORY,
    ...(isInMemory ? [] : [TypeOrmModule]),
  ],
})
export class UserModule {}
