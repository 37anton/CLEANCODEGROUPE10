// src/domain/services/maintenance-scheduler.service.ts
import { Injectable } from '@nestjs/common';
import { Interval } from '../entities/interval.entity';
import { Motorcycle } from '../entities/motorcycle.entity';

export interface NextMaintenancePlan {
  nextDate: Date;
  nextKm: number;
}

@Injectable()
export class MaintenanceSchedulerService {
  // Vous pouvez injecter ici le repository Interval si nécessaire pour récupérer les données dynamiquement
  static calculateNextMaintenance(motorcycle: Motorcycle): NextMaintenancePlan {
    // Pour simplifier, nous utilisons une configuration statique ici.
    const intervals: Record<string, { km: number; timeInYears: number }> = {
      'Street Triple': { km: 10000, timeInYears: 1 },
      'Tiger Sport 660': { km: 16000, timeInYears: 1 },
    };

    const interval = intervals[motorcycle.model];
    if (!interval) {
      throw new Error(`No interval defined for model ${motorcycle.model}`);
    }
    const nextDate = new Date(motorcycle.lastMaintenanceDate);
    nextDate.setFullYear(nextDate.getFullYear() + interval.timeInYears);
    const nextKm = motorcycle.lastMaintenanceMileage + interval.km;
    return { nextDate, nextKm };
  }
}
