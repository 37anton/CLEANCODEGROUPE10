import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';
import { MOTORCYCLE_REPOSITORY } from 'src/infrastructure/repositories/motorcycle.repository';

@Injectable()
export class DeleteMotorcycleUseCase {
  constructor(
    @Inject(MOTORCYCLE_REPOSITORY)
    private readonly motorcycleRepository: {
      findById(id: string): Promise<Motorcycle>;
      delete(id: string): Promise<void>;
    },
  ) {}

  async execute(id: string, user: any): Promise<void> {
    const motorcycle = await this.motorcycleRepository.findById(id);
    if (!motorcycle) {
      throw new NotFoundException('Motorcycle not found');
    }
    
    await this.motorcycleRepository.delete(id);
  }
}
