// src/application/use-cases/get-maintenance-history.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { Maintenance } from '../../domain/entities/maintenance.entity';

@Injectable()
export class GetMaintenanceHistoryUseCase {
  constructor(
    @Inject('CustomMaintenanceRepository')
    private readonly maintenanceRepository: {
      findByVehicleId(vehicleId: string): Promise<Maintenance[]>;
    },
  ) {}

  async execute(vehicleId: string): Promise<Maintenance[]> {
    const maintenances = await this.maintenanceRepository.findByVehicleId(vehicleId);
    return maintenances.filter(maintenance => maintenance.status === 'COMPLETED');
  }
}
