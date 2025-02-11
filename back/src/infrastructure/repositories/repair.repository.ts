import { Repair } from '../../domain/entities/repair.entity';

export const REPAIR_REPOSITORY = 'REPAIR_REPOSITORY';

export interface RepairRepository {
  create(repair: Repair): Promise<Repair>;
  findByIncidentId(incidentId: string): Promise<Repair[]>;
  findByVehicleId(vehicleId: string): Promise<Repair[]>;
}
