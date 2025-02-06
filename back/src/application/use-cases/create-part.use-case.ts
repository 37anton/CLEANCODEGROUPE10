import { Injectable, Inject } from '@nestjs/common';
import { PartRepository, PART_REPOSITORY } from '../../infrastructure/repositories/part.repository';

@Injectable()
export class CreatePartUseCase {
  constructor(
    @Inject(PART_REPOSITORY) private readonly partRepository: PartRepository,
  ) {}

  async execute(name: string) {
    return await this.partRepository.create(name);
  }
}