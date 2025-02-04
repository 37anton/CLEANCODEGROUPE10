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
    @Inject('CustomMotorcycleRepository')
    private readonly motorcycleRepository: {
      findById(id: string): Promise<Motorcycle>;
      update(motorcycle: Motorcycle): Promise<Motorcycle>;
    },
  ) {
    console.log('[DEBUG] PlanMaintenanceUseCase loaded');
  }

  async execute(motorcycleData: Motorcycle): Promise<Maintenance> {
    console.log('[DEBUG] Executing maintenance for motorcycle:', motorcycleData);

    const { nextDate, nextKm } = MaintenanceSchedulerService.calculateNextMaintenance(motorcycleData);

    const now = new Date();
    let status: 'SCHEDULED' | 'COMPLETED' = 'SCHEDULED';

    // Exemple de logique : si le kilométrage est inférieur au seuil ET si la date actuelle est avant la date prévue, considérer comme COMPLETED.
    if (motorcycleData.mileage < nextKm && now < nextDate) {
      status = 'COMPLETED';
    }

    const maintenance = new Maintenance();
    maintenance.id = crypto.randomUUID();
    maintenance.vehicleId = motorcycleData.id;
    maintenance.scheduledDate = nextDate;
    maintenance.status = status;
    maintenance.scheduledMileage = nextKm;

    console.log('[DEBUG] Maintenance planned:', maintenance);
    await this.maintenanceRepository.save(maintenance);

    if (status === 'COMPLETED') {
      const motorcycle = await this.motorcycleRepository.findById(motorcycleData.id);
      motorcycle.lastMaintenanceDate = nextDate;
      motorcycle.lastMaintenanceMileage = nextKm;
      await this.motorcycleRepository.update(motorcycle);
      console.log('[DEBUG] Motorcycle updated with new maintenance date and mileage.');
    }

    return maintenance;
  }
}
