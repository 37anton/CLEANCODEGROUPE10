import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { FindUserByEmailUseCase } from '../use-cases/find-user-by-email.use-case';
import { FindUserByIdUseCase } from '../use-cases/find-user-by-id.use-case';
import { Repository } from 'typeorm';
import { RegisterDto } from "../../../src/modules/auth/dto/register.dto";
import { User } from 'src/domain/entities/user.entity';
import { USER_REPOSITORY, UserRepository } from 'src/infrastructure/repositories/user.repository';



@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  async create(
    email: string, 
    password: string, 
    role: string, 
    isAdmin: boolean,
    associations?: { companyId?: string; concessionId?: string; clientId?: string }
  ) {
    return await this.createUserUseCase.execute(email, password, role, isAdmin, associations);
  }

  async findByEmail(email: string) {
    return await this.findUserByEmailUseCase.execute(email);
  }

  async findById(id: string, relations?: string[]) {
    return await this.findUserByIdUseCase.execute(id, relations);
  }
  
  async findAllByCompanyId(companyId: string): Promise<User[]> {
    // Vous pouvez filtrer dans le service ou dans la méthode du repository
    const users = await this.userRepository.findByEntity(companyId);
    return users.filter(user => user.company && user.company.id === companyId);
  }

  async findAllByClientId(clientId: string): Promise<User[]> {
    return this.userRepository.find({ where: { client: { id: clientId } } });
  }
}