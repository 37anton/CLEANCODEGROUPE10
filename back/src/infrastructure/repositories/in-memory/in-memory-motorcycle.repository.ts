import { Injectable } from '@nestjs/common';
import { Motorcycle } from '../../../domain/entities/motorcycle.entity';

@Injectable()
export class InMemoryMotorcycleRepository {
  private motorcycles: Motorcycle[] = [];

  async create(motorcycle: Motorcycle): Promise<Motorcycle> {
    this.motorcycles.push(motorcycle);
    return motorcycle;
  }

  async update(motorcycle: Motorcycle): Promise<Motorcycle> {
    const index = this.motorcycles.findIndex(m => m.id === motorcycle.id);
    if (index > -1) {
      this.motorcycles[index] = motorcycle;
    } else {
      this.motorcycles.push(motorcycle);
    }
    return motorcycle;
  }

  async findById(id: string): Promise<Motorcycle> {
    const motorcycle = this.motorcycles.find(m => m.id === id);
    if (!motorcycle) throw new Error('Motorcycle not found');
    return motorcycle;
  }
}
