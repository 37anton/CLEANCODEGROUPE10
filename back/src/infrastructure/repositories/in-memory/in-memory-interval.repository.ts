// src/infrastructure/repositories/in-memory/in-memory-interval.repository.ts
import { Injectable } from '@nestjs/common';
import { Interval } from '../../../domain/entities/interval.entity';

@Injectable()
export class InMemoryIntervalRepository {
  private intervals: Interval[] = [];

  async create(interval: Interval): Promise<Interval> {
    this.intervals.push(interval);
    return interval;
  }

  // ADDED: pour trouver tous les intervalles d’une moto
  async findByMotorcycleId(motorcycleId: string): Promise<Interval[]> {
    return this.intervals.filter(i => i.motorcycle.id === motorcycleId);
  }
}
