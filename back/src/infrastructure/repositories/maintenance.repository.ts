import { Maintenance } from '../../domain/entities/maintenance.entity';

export const MAINTENANCE_REPOSITORY = 'MAINTENANCE_REPOSITORY';

export interface MaintenanceRepository {
  create(maintenance: Maintenance): Promise<Maintenance>;
  findByVehicleId(vehicleId: string): Promise<Maintenance[]>;
}
