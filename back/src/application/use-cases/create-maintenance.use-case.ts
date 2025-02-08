import { Injectable, Inject } from '@nestjs/common';
import { Maintenance } from '../../domain/entities/maintenance.entity';
import { MaintenanceRepository } from '../../infrastructure/repositories/maintenance.repository';
import * as crypto from 'crypto';
import { MotorcycleRepository } from '../../infrastructure/repositories/motorcycle.repository';
import { PartStockService } from '../../application/services/part-stock.service';
import { MaintenancePart } from '../../domain/entities/maintenance-part.entity';
import { CreateMaintenanceDto } from '../dto/create-maintenance.dto';

@Injectable()
export class CreateMaintenanceUseCase {
  constructor(
    @Inject('CustomMaintenanceRepository')
    private readonly maintenanceRepository: MaintenanceRepository,
    @Inject('CustomMotorcycleRepository')
    private readonly motorcycleRepository: MotorcycleRepository,
    private readonly partStockService: PartStockService,
  ) {}

  async execute(data: CreateMaintenanceDto): Promise<Maintenance> {
    if (!data.vehicleId) {
      throw new Error('L\'identifiant du véhicule est requis.');
    }
    const motorcycle = await this.motorcycleRepository.findById(data.vehicleId);
    if (!motorcycle) {
      throw new Error(`Moto avec l'ID ${data.vehicleId} introuvable.`);
    }

    const intervalValue = (motorcycle.intervals && motorcycle.intervals.length > 0)
      ? motorcycle.intervals[0]
      : null;

    const computedScheduledMileage: number = data.scheduledMileage 
      ?? (motorcycle.lastMaintenanceMileage + (intervalValue?.km ?? 0));

    const maintenance = new Maintenance();
    maintenance.id = crypto.randomUUID();
    maintenance.vehicleId = data.vehicleId;
    maintenance.scheduledDate = data.scheduledDate ? new Date(data.scheduledDate) : new Date();
    maintenance.status = data.status || 'COMPLETED';
    maintenance.scheduledMileage = computedScheduledMileage;
    maintenance.cost = data.cost;
    maintenance.technicianRecommendations = data.technicianRecommendations;
    if (motorcycle.intervals) {
      maintenance.interval = motorcycle.intervals[0];
    }
    maintenance.maintenanceParts = [];

    for (const replaced of data.replacedParts) {
      if (replaced.quantity <= 0) {
        throw new Error(`La quantité pour la pièce ${replaced.partId} doit être supérieure à zéro.`);
      }
      const updatedPartStock = await this.partStockService.deductStock(data.userId, replaced.partId, replaced.quantity);
      const maintenancePart = new MaintenancePart();
      maintenancePart.id = crypto.randomUUID();
      maintenancePart.partStock = updatedPartStock;
      maintenancePart.quantity = replaced.quantity;
      maintenance.maintenanceParts.push(maintenancePart);
    }

    const createdMaintenance = await this.maintenanceRepository.create(maintenance);

    motorcycle.lastMaintenanceDate = maintenance.scheduledDate;
    motorcycle.lastMaintenanceMileage = computedScheduledMileage;
    motorcycle.mileage = computedScheduledMileage; 
    await this.motorcycleRepository.update(motorcycle);

    return createdMaintenance;
  }
}
