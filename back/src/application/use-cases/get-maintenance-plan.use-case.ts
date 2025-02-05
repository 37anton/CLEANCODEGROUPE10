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
    // Récupération de la moto avec ses intervalles chargés
    const motorcycle: Motorcycle = await this.motorcycleRepository.findById(motorcycleId);
    if (!motorcycle.intervals || motorcycle.intervals.length === 0) {
      throw new Error("Aucun intervalle d'entretien défini pour cette moto.");
    }
    // On suppose qu'il y a un seul intervalle par moto
    const interval = motorcycle.intervals[0];

    // Vérifier que la date du dernier entretien est valide
    const lastMaintenance = new Date(motorcycle.lastMaintenanceDate);
    if (isNaN(lastMaintenance.getTime())) {
      // Si la date n'est pas valide, nous considérons qu'on doit réaliser la maintenance ASAP.
      return {
        nextMaintenanceMileage: "ASAP",
        nextMaintenanceDate: "ASAP",
      };
    }

    // Calcul des seuils
    const computedNextMileage = motorcycle.lastMaintenanceMileage + interval.km;
    const computedNextDate = new Date(lastMaintenance);
    computedNextDate.setFullYear(lastMaintenance.getFullYear() + interval.timeInYears);

    const now = new Date();

    // Si l'un des deux critères est dépassé, on retourne ASAP dans les deux champs
    if (
      motorcycle.mileage >= computedNextMileage ||
      now >= computedNextDate
    ) {
      return {
        nextMaintenanceMileage: "ASAP",
        nextMaintenanceDate: "ASAP",
      };
    } else {
      return {
        nextMaintenanceMileage: computedNextMileage.toString(),
        nextMaintenanceDate: computedNextDate.toLocaleDateString(),
      };
    }
  }
}
