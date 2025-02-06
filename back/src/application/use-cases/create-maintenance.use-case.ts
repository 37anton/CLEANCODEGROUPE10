import { Injectable, Inject } from '@nestjs/common';
import { Maintenance } from '../../domain/entities/maintenance.entity';
import { MaintenanceRepository } from '../../infrastructure/repositories/maintenance.repository';
import * as crypto from 'crypto';
import { MotorcycleRepository } from '../../infrastructure/repositories/motorcycle.repository';

@Injectable()
export class CreateMaintenanceUseCase {
  constructor(
    @Inject('CustomMaintenanceRepository')
    private readonly maintenanceRepository: MaintenanceRepository,
    @Inject('CustomMotorcycleRepository')
    private readonly motorcycleRepository: MotorcycleRepository,
  ) {}

  async execute(data: Partial<Maintenance>): Promise<Maintenance> {
    if (!data.vehicleId) {
      throw new Error('L\'identifiant du véhicule est requis.');
    }
    const motorcycle = await this.motorcycleRepository.findById(data.vehicleId);
    if (!motorcycle) {
      throw new Error(`Moto avec l'ID ${data.vehicleId} introuvable.`);
    }

    // On récupère le premier intervalle, s'il existe
    const intervalValue = (motorcycle.intervals && motorcycle.intervals.length > 0)
      ? motorcycle.intervals[0]
      : null;
    
    // Calcul du kilométrage prévu : s'il n'est pas fourni, on le calcule en utilisant l'intervalle.
    // On utilise "??" pour garantir qu'on a une valeur numérique (intervalValue?.km sera undefined si intervalValue est null, alors on renvoie 0)
    const computedScheduledMileage: number = data.scheduledMileage 
      ?? (motorcycle.lastMaintenanceMileage + (intervalValue?.km ?? 0));

    const maintenance = new Maintenance();
    maintenance.id = crypto.randomUUID();
    maintenance.vehicleId = data.vehicleId;
    maintenance.scheduledDate = data.scheduledDate ? new Date(data.scheduledDate) : new Date();
    maintenance.status = data.status || 'COMPLETED';
    maintenance.scheduledMileage = computedScheduledMileage;
    maintenance.replacedParts = data.replacedParts;
    maintenance.cost = data.cost;
    maintenance.technicianRecommendations = data.technicianRecommendations;
    if (motorcycle.intervals) {
        maintenance.interval = motorcycle.intervals[0];
      }

    // Création de la maintenance
    const createdMaintenance = await this.maintenanceRepository.create(maintenance);

    // Mise à jour de la moto avec les nouvelles valeurs
    motorcycle.lastMaintenanceDate = maintenance.scheduledDate;
    motorcycle.lastMaintenanceMileage = computedScheduledMileage;
    await this.motorcycleRepository.update(motorcycle);

    return createdMaintenance;
  }
}
