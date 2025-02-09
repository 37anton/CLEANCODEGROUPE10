import { Injectable, Inject } from '@nestjs/common';
import { UserRepository, USER_REPOSITORY } from '../../infrastructure/repositories/user.repository';

@Injectable()
export class FindUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async execute() {
    return await this.userRepository.find();
  }
}