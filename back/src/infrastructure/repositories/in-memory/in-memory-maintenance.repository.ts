// src/infrastructure/repositories/in-memory-maintenance.repository.ts
import { Injectable } from '@nestjs/common';
import { Maintenance } from '../../../domain/entities/maintenance.entity';

@Injectable()
export class InMemoryMaintenanceRepository {
  private maintenances: Maintenance[] = [];

  async save(maintenance: Maintenance): Promise<Maintenance> {
    console.log('[DEBUG] Saving in memory:', maintenance);
    this.maintenances.push(maintenance);
    return maintenance;
  }

  async findByVehicleId(vehicleId: string): Promise<Maintenance[]> {
    console.log('[DEBUG] Searching in memory for vehicleId:', vehicleId);
    return this.maintenances.filter(maintenance => maintenance.vehicleId === vehicleId);
  }
}
