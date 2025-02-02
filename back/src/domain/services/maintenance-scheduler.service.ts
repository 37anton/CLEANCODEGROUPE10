// src/domain/services/maintenance-scheduler.service.ts
import { maintenanceIntervals } from '../config/maintenance-interval.config';
import { Motorcycle } from '../entities/motorcycle.entity';

export interface NextMaintenancePlan {
  nextDate: Date;
  nextKm: number;
}

export class MaintenanceSchedulerService {
  static calculateNextMaintenance(motorcycle: Motorcycle): NextMaintenancePlan {
    const interval = maintenanceIntervals[motorcycle.model];
    if (!interval) {
      throw new Error(`No interval defined for model ${motorcycle.model}`);
    }
    // Calculate the next maintenance date
    const nextDate = new Date(motorcycle.lastMaintenanceDate);
    nextDate.setFullYear(nextDate.getFullYear() + interval.timeInYears);

    // Calculate the next mileage threshold for maintenance
    const nextKm = motorcycle.lastMaintenanceMileage + interval.km;

    return { nextDate, nextKm };
  }
}
