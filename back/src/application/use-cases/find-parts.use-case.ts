import { Injectable, Inject } from '@nestjs/common';
import { PartRepository, PART_REPOSITORY } from '../../infrastructure/repositories/part.repository';

@Injectable()
export class FindPartsUseCase {
  constructor(
    @Inject(PART_REPOSITORY) private readonly partRepository: PartRepository,
  ) {}

  async execute() {
    return await this.partRepository.findAll();
  }
}