// src/infrastructure/repositories/in-memory-incident.repository.ts
import { Injectable } from '@nestjs/common';
import { Incident } from '../../../domain/entities/incident.entity';

@Injectable()
export class InMemoryIncidentRepository {
  private incidents: Incident[] = [];

  async save(incident: Incident): Promise<Incident> {
    this.incidents.push(incident);
    return incident;
  }

  async findByVehicleId(vehicleId: string): Promise<Incident[]> {
    return this.incidents.filter(i => i.motorcycle.id === vehicleId);
  }

  async findRepairById(id: string): Promise<any> {
    return null;
  }

  async updateRepair(repair: any): Promise<any> {
    return repair;
  }
}
