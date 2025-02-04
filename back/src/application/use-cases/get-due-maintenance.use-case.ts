// src/application/use-cases/get-due-maintenance.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { Maintenance } from '../../domain/entities/maintenance.entity';

@Injectable()
export class GetDueMaintenanceUseCase {
  constructor(
    @Inject('CustomMaintenanceRepository')
    private readonly maintenanceRepository: {
      findByVehicleId(vehicleId: string): Promise<Maintenance[]>;
    },
  ) {}

  async execute(vehicleId: string): Promise<Maintenance[]> {
    const maintenances = await this.maintenanceRepository.findByVehicleId(vehicleId);
    const now = new Date();
    return maintenances.filter(m => now >= m.scheduledDate);
  }
}
