import { Injectable } from '@nestjs/common';
import { Motorcycle } from '../../../domain/entities/motorcycle.entity';
import { User } from '../../../domain/entities/user.entity';

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

  async findMotorcyclesForUser(user: User): Promise<Motorcycle[]> {
    // Implémentez la logique pour filtrer les motos associées à l'utilisateur
    return this.motorcycles.filter(m => true);
  }

  async findById(id: string): Promise<Motorcycle> {
    const motorcycle = this.motorcycles.find(m => m.id === id);
    if (!motorcycle) throw new Error('Motorcycle not found');
    return motorcycle;
  }

  async delete(id: string): Promise<void> {
    this.motorcycles = this.motorcycles.filter(m => m.id !== id);
  }

  async findAll(): Promise<Motorcycle[]> {
    return this.motorcycles;
  }
}
