// src/infrastructure/repositories/sql/sql-interval.repository.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Interval } from '../../../domain/entities/interval.entity';

@Injectable()
export class SQLIntervalRepository {
  constructor(
    @InjectRepository(Interval)
    private readonly repo: Repository<Interval>,
  ) {}

  async create(interval: Interval): Promise<Interval> {
    return this.repo.save(interval);
  }

  // ADDED: pour trouver tous les intervalles d’une moto
  async findByMotorcycleId(motorcycleId: string): Promise<Interval[]> {
    return this.repo.find({
      where: { motorcycle: { id: motorcycleId } },
    });
  }
}
