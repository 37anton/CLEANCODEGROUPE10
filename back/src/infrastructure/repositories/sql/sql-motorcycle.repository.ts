// src/infrastructure/repositories/sql-motorcycle.repository.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Motorcycle } from '../../../domain/entities/motorcycle.entity';

@Injectable()
export class SQLMotorcycleRepository {
  constructor(
    @InjectRepository(Motorcycle)
    private readonly motorcycleRepository: Repository<Motorcycle>,
  ) {}

  async create(motorcycle: Motorcycle): Promise<Motorcycle> {
    return this.motorcycleRepository.save(motorcycle);
  }

  async update(motorcycle: Motorcycle): Promise<Motorcycle> {
    return this.motorcycleRepository.save(motorcycle);
  }

  async findById(id: string): Promise<Motorcycle> {
    const motorcycle = await this.motorcycleRepository.findOne({ where: { id } });
    if (!motorcycle) throw new Error('Motorcycle not found');
    return motorcycle;
  }
}
