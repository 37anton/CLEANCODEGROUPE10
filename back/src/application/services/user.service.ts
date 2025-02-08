import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { FindUserByEmailUseCase } from '../use-cases/find-user-by-email.use-case';
import { FindUserByIdUseCase } from '../use-cases/find-user-by-id.use-case';
import { Repository } from 'typeorm';
import { RegisterDto } from "../../../src/modules/auth/dto/register.dto";
import { User } from 'src/domain/entities/user.entity';



@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  async create(email: string, password: string, role: string, isAdmin: boolean) {
    return await this.createUserUseCase.execute(email, password, role, isAdmin);
  }

  async findByEmail(email: string) {
    return await this.findUserByEmailUseCase.execute(email);
  }

  async findById(id: string, relations?: string[]) {
    return await this.findUserByIdUseCase.execute(id, relations);
  }
  
  async findAllByCompanyId(companyId: string): Promise<User[]> {
    return this.userRepository.find({ where: { company: { id: companyId } } });
  }

  async findAllByClientId(clientId: string): Promise<User[]> {
    return this.userRepository.find({ where: { client: { id: clientId } } });
  }
}