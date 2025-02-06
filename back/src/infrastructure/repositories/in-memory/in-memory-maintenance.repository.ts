// src/infrastructure/repositories/in-memory/in-memory-maintenance.repository.ts
import { Injectable } from '@nestjs/common';
import { Maintenance } from '../../../domain/entities/maintenance.entity';
import { MaintenanceRepository } from '../maintenance.repository';

@Injectable()
export class InMemoryMaintenanceRepository implements MaintenanceRepository {
  private maintenances: Maintenance[] = [];

  async create(maintenance: Maintenance): Promise<Maintenance> {
    this.maintenances.push(maintenance);
    return maintenance;
  }

  async findByVehicleId(vehicleId: string): Promise<Maintenance[]> {
    return this.maintenances
      .filter(m => m.vehicleId === vehicleId)
      .sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime());
  }
}
