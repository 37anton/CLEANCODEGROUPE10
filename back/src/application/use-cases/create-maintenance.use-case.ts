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
    // Récupère la moto à partir de l'identifiant fourni dans data.vehicleId
    if (!data.vehicleId) {
      throw new Error('L\'identifiant du véhicule est requis.');
    }
    const motorcycle = await this.motorcycleRepository.findById(data.vehicleId);
    if (!motorcycle) {
      throw new Error(`Moto avec l'ID ${data.vehicleId} introuvable.`);
    }

    const maintenance = new Maintenance();
    maintenance.id = crypto.randomUUID();
    maintenance.vehicleId = data.vehicleId;
    maintenance.scheduledDate = data.scheduledDate ? new Date(data.scheduledDate) : new Date();
    maintenance.status = data.status || 'COMPLETED';
    maintenance.scheduledMileage = data.scheduledMileage;
    maintenance.replacedParts = data.replacedParts;
    maintenance.cost = data.cost;
    maintenance.technicianRecommendations = data.technicianRecommendations;
    // Affecte l'intervalle actuel de la moto à la maintenance
    if (motorcycle.intervals) {
      maintenance.interval = motorcycle.intervals[0];
    } 
    return this.maintenanceRepository.create(maintenance);
  }
}
