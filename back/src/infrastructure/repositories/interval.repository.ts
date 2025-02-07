import { Interval } from '../../domain/entities/interval.entity';

export interface IntervalRepository {
  create(interval: Interval): Promise<Interval>;
  update(interval: Interval): Promise<Interval>;
  findById(id: string): Promise<Interval>;
  delete(id: string): Promise<void>;
}
