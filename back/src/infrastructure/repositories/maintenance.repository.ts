// src/infrastructure/repositories/maintenance.repository.ts
import { Maintenance } from '../../domain/entities/maintenance.entity';

export interface MaintenanceRepository {
  create(maintenance: Maintenance): Promise<Maintenance>;
  findByVehicleId(vehicleId: string): Promise<Maintenance[]>;
}
