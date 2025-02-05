import { Injectable, Inject } from '@nestjs/common';
import { MotorcycleRepository } from '../../infrastructure/repositories/motorcycle.repository';
import { MaintenancePlan } from '../../domain/models/maintenance-plan.model';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';

@Injectable()
export class GetMaintenancePlanUseCase {
  constructor(
    @Inject('CustomMotorcycleRepository')
    private readonly motorcycleRepository: MotorcycleRepository,
  ) {}

  async execute(motorcycleId: string): Promise<MaintenancePlan> {
    // Récupérer la moto et s'assurer qu'un intervalle est défini
    const motorcycle: Motorcycle = await this.motorcycleRepository.findById(motorcycleId);
    if (!motorcycle.intervals || motorcycle.intervals.length === 0) {
      throw new Error("Aucun intervalle d'entretien défini pour cette moto.");
    }
    // Pour ce calcul, nous utilisons le premier intervalle défini
    const interval = motorcycle.intervals[0];

    const nextMaintenanceMileage = motorcycle.lastMaintenanceMileage + interval.km;
    const nextMaintenanceDate = new Date(motorcycle.lastMaintenanceDate);
    nextMaintenanceDate.setFullYear(nextMaintenanceDate.getFullYear() + interval.timeInYears);

    return {
      nextMaintenanceMileage,
      nextMaintenanceDate,
    };
  }
}
