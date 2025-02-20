import { Injectable, Inject } from '@nestjs/common';
import { MAINTENANCE_REPOSITORY, MaintenanceRepository } from '../../infrastructure/repositories/maintenance.repository';
import { Maintenance } from '../../domain/entities/maintenance.entity';

@Injectable()
export class GetMaintenanceHistoryUseCase {
  constructor(
    @Inject(MAINTENANCE_REPOSITORY)
    private readonly maintenanceRepository: MaintenanceRepository,
  ) {}

  async execute(vehicleId: string): Promise<Maintenance[]> {
    return this.maintenanceRepository.findByVehicleId(vehicleId);
  }
}