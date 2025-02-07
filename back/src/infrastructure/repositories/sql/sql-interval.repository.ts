import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Interval } from '../../../domain/entities/interval.entity';
import { IntervalRepository } from '../interval.repository';

@Injectable()
export class SQLIntervalRepository implements IntervalRepository {
  constructor(
    @InjectRepository(Interval)
    private readonly ormRepository: Repository<Interval>,
  ) {}

  async create(interval: Interval): Promise<Interval> {
    return this.ormRepository.save(interval);
  }

  async update(interval: Interval): Promise<Interval> {
    return this.ormRepository.save(interval);
  }

  async findById(id: string): Promise<Interval> {
    const interval = await this.ormRepository.findOne({ where: { id } });
    if (!interval) throw new Error('Interval not found');
    return interval;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
