import { Motorcycle } from '../../domain/entities/motorcycle.entity';
import { User } from '../../domain/entities/user.entity';

export const MOTORCYCLE_REPOSITORY = 'MOTORCYCLE_REPOSITORY'

export interface MotorcycleRepository {

  createMotorcycle(motorcycle: Motorcycle, user: User): Promise<Motorcycle>;
  findMotorcyclesForUser(user: User): Promise<Motorcycle[]>;
  findById(id: string): Promise<Motorcycle>;
  update(motorcycle: Motorcycle): Promise<Motorcycle>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Motorcycle[]>;
}
