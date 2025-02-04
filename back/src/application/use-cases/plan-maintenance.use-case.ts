// src/application/use-cases/plan-maintenance.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';
import { Maintenance } from '../../domain/entities/maintenance.entity';
import { MaintenanceSchedulerService } from '../../domain/services/maintenance-scheduler.service';

@Injectable()
export class PlanMaintenanceUseCase {
  constructor(
    @Inject('CustomMaintenanceRepository')
    private readonly maintenanceRepository: {
      save(maintenance: Maintenance): Promise<Maintenance>;
      findByVehicleId(vehicleId: string): Promise<Maintenance[]>;
    },
  ) {
    console.log('[DEBUG] PlanMaintenanceUseCase loaded');
  }

  async execute(motorcycle: Motorcycle): Promise<Maintenance> {
    console.log('[DEBUG] Executing with motorcycle:', motorcycle);

    // Calculate next maintenance date and mileage threshold according to configuration
    const { nextDate, nextKm } = MaintenanceSchedulerService.calculateNextMaintenance(motorcycle);

    const now = new Date();
    let status: 'SCHEDULED' | 'COMPLETED' = 'SCHEDULED';

    // If current mileage is less than the threshold and current date is before scheduled date, mark as COMPLETED
    if (motorcycle.mileage < nextKm && now < nextDate) {
      status = 'COMPLETED';
    }

    const maintenance = new Maintenance();
    maintenance.id = crypto.randomUUID();
    maintenance.vehicleId = motorcycle.id;
    maintenance.scheduledDate = nextDate;
    maintenance.status = status;
    maintenance.scheduledMileage = nextKm;

    console.log('[DEBUG] Maintenance planned:', maintenance);
    await this.maintenanceRepository.save(maintenance);

    return maintenance;
  }
}
