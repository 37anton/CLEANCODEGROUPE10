import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { FindUserByEmailUseCase } from '../use-cases/find-user-by-email.use-case';
import { FindUserByIdUseCase } from '../use-cases/find-user-by-id.use-case';


@Injectable()
export class UserService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  async create(email: string, password: string, role: string) {
    return await this.createUserUseCase.execute(email, password, role);
  }

  async findByEmail(email: string) {
    return await this.findUserByEmailUseCase.execute(email);
  }

  async findById(id: string, relations?: string[]) {
    return await this.findUserByIdUseCase.execute(id, relations);
  }

}