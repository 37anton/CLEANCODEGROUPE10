import { Interval } from '../../domain/entities/interval.entity';

export const INTERVAL_REPOSITORY = 'INTERVAL_REPOSITORY';

export interface IntervalRepository {
  create(interval: Interval): Promise<Interval>;
  update(interval: Interval): Promise<Interval>;
  findById(id: string): Promise<Interval>;
  delete(id: string): Promise<void>;
}
