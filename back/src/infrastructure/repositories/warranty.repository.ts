// src/infrastructure/repositories/warranty.repository.ts
import { Warranty } from '../../domain/entities/warranty.entity';

export interface WarrantyRepository {
  create(warranty: Warranty): Promise<Warranty>;
  findByMotorcycleId(motorcycleId: string): Promise<Warranty[]>;
}
