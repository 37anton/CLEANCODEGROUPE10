import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Motorcycle } from '../../../domain/entities/motorcycle.entity';

@Injectable()
export class SQLMotorcycleRepository {
  constructor(
    @InjectRepository(Motorcycle)
    private readonly ormRepository: Repository<Motorcycle>,
  ) {}

  async create(motorcycle: Motorcycle): Promise<Motorcycle> {
    return this.ormRepository.save(motorcycle);
  }

  async update(motorcycle: Motorcycle): Promise<Motorcycle> {
    return this.ormRepository.save(motorcycle);
  }

  async findById(id: string): Promise<Motorcycle> {
    const motorcycle = await this.ormRepository.findOne({ 
      where: { id },
      relations: ['intervals', 'companyMotorcycles', 'clientMotorcycles', 'concession', 'clientMotorcycles.client', 'companyMotorcycles.company']  // Chargement des relations nécessaires
    });
    if (!motorcycle) throw new Error('Motorcycle not found');
    return motorcycle;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async findAll(): Promise<Motorcycle[]> {
    return this.ormRepository.find({
      relations: ['intervals', 'companyMotorcycles', 'clientMotorcycles', 'concession'],
    });
  }
}
