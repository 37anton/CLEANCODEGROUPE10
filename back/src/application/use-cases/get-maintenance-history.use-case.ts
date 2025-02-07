// src/application/use-cases/get-maintenance-history.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { MaintenanceRepository } from '../../infrastructure/repositories/maintenance.repository';
import { Maintenance } from '../../domain/entities/maintenance.entity';

@Injectable()
export class GetMaintenanceHistoryUseCase {
  constructor(
    @Inject('CustomMaintenanceRepository')
    private readonly maintenanceRepository: MaintenanceRepository,
  ) {}

  async execute(vehicleId: string): Promise<Maintenance[]> {
    return this.maintenanceRepository.findByVehicleId(vehicleId);
  }
}
