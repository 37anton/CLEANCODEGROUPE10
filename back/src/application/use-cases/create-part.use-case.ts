import { Injectable, Inject } from '@nestjs/common';
import { PartRepository, PART_REPOSITORY } from '../../infrastructure/repositories/part.repository';
import { Part } from 'src/domain/entities/part.entity';

@Injectable()
export class CreatePartUseCase {
  constructor(
    @Inject(PART_REPOSITORY) private readonly partRepository: PartRepository,
  ) {}

  async execute(name: string): Promise<Part> {
    return await this.partRepository.create(name);
  }
}