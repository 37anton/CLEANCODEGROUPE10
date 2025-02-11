import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';
import { MOTORCYCLE_REPOSITORY } from 'src/infrastructure/repositories/motorcycle.repository';

@Injectable()
export class UpdateMotorcycleUseCase {
  constructor(
    @Inject(MOTORCYCLE_REPOSITORY)
    private readonly motorcycleRepository: {
      findById(id: string): Promise<Motorcycle>;
      update(motorcycle: Motorcycle): Promise<Motorcycle>;
    },
  ) {}

  async execute(id: string, updateData: Partial<Omit<Motorcycle, 'id'>>, user: any): Promise<Motorcycle> {
    const motorcycle = await this.motorcycleRepository.findById(id);
    if (!motorcycle) {
      throw new NotFoundException('Motorcycle not found');
    }
    
    Object.assign(motorcycle, updateData);
    const updated = await this.motorcycleRepository.update(motorcycle);
    return updated;
  }
}
