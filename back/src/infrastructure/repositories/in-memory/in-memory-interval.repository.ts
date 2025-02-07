import { Injectable } from '@nestjs/common';
import { Interval } from '../../../domain/entities/interval.entity';
import { IntervalRepository } from '../interval.repository';

@Injectable()
export class InMemoryIntervalRepository implements IntervalRepository {
  private intervals: Interval[] = [];

  async create(interval: Interval): Promise<Interval> {
    this.intervals.push(interval);
    return interval;
  }

  async update(interval: Interval): Promise<Interval> {
    const index = this.intervals.findIndex(i => i.id === interval.id);
    if (index > -1) {
      this.intervals[index] = interval;
    } else {
      this.intervals.push(interval);
    }
    return interval;
  }

  async findById(id: string): Promise<Interval> {
    const interval = this.intervals.find(i => i.id === id);
    if (!interval) throw new Error('Interval not found');
    return interval;
  }

  async delete(id: string): Promise<void> {
    this.intervals = this.intervals.filter(i => i.id !== id);
  }
}
