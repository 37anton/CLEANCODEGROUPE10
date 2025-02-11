import { Warranty } from '../../domain/entities/warranty.entity';

export const WARRANTY_REPOSITORY = 'WARRANTY_REPOSITORY';

export interface WarrantyRepository {
  create(warranty: Warranty): Promise<Warranty>;
  findByMotorcycleId(motorcycleId: string): Promise<Warranty[]>;
}
