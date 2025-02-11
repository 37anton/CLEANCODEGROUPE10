import { Injectable, Inject } from '@nestjs/common';
import { UserRepository, USER_REPOSITORY } from '../../infrastructure/repositories/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async execute(
    email: string,
    password: string,
    role: string,
    isAdmin: boolean,
    associations?: { companyId?: string; concessionId?: string; clientId?: string }
  ) {
    return await this.userRepository.createUser(email, password, role, isAdmin, associations);
  }

}
